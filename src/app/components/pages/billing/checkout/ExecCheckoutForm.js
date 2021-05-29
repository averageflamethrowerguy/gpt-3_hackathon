import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import {injectStripe} from 'react-stripe-elements';

import AuthStore from '../../../../stores/AuthStore'
import Auth from '@aws-amplify/auth'
import TermsConditionsPrivacyPolicy from '../../terms-conditions/TermsConditionsPrivacyPolicy.js'

import contextTypes from '../../../../contextTypes'
import CardSection from "./CardSection";
import axios from 'axios'
import "./ExecCheckoutForm.css"

// let input = this.context.getStore('NavigationStore').getState().params.stuff.split('&')  //input[1] is cost, input[2] is product
// let cost = input[0]
// let duration = input[1]
// let planType = input[2]
// let buyer = input[3]
// let product = input[4]
// let eventualCost = input[5]

class ExecCheckoutForm extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    const input = context.getStore('NavigationStore').getState().params.stuff.split('&');
    let {user} = context.getStore('AuthStore').getState()
    let preexistingEmail = user && user.attributes ? user.attributes.email : ''
    this.state = {
      fullPay: false,     //If fullPay is true, bills them for the entire cost
      organization: '',
      // recieptEmail: 'ree',
      // recieptEmail: this.context.getStore('AuthStore').getState().user.attributes.email,             //make a fn to get email address (from cognito?)
      input: this.context.getStore('NavigationStore').getState().params.stuff.split('&'),
      cost: input[0],
      reservationCost: input[0],
      duration: input[1],
      planType: input[2],
      buyer: input[3],
      product: input[4],
      eventualCost: input[5],
      discountCode: input[6],
      preexistingEmail: preexistingEmail,
      email: preexistingEmail,
      errorMessage: '',
      billingStreet: '',
      billingStreetLine2: '',
      billingCity: '',
      billingState: 'AL',
      billingZip: '',
      passwordInvalid: false,
      purchaseInProgress: false,
      legalAgree: false,
    }
  }

  componentDidMount() {
    this.context.getActions('AuthActions').getUser(true).then((user) => {
      if (user && user.attributes && user.attributes.email) {
        this.setState({ preexistingEmail: user.attributes.email, email: user.attributes.email })
      }
    })
  }

  handleChangeBillingStreet = (e) => this.setState({ billingStreet: e.target.value.trim() })

  handleChangeBillingStreetLine2 = (e) => this.setState({ billingStreetLine2: e.target.value.trim() })

  handleChangeBillingCity = (e) => this.setState({ billingCity: e.target.value.trim() })

  handleChangeBillingState = (e) => this.setState({ billingState: e.target.value.trim() })

  handleChangeBillingZip = (e) => this.setState({ billingZip: e.target.value.trim() })

  handleChangeEmail = (e) => this.setState({ email: e.target.value.trim() })

  handleLegalAgree = (e) => {
    if (this.state.legalAgree == false) {
      this.setState({legalAgree: true})
    }
    else {
      this.setState({legalAgree: false})
    }
  }

  handleChangeFullPay = (switcher) => {
    this.setState({fullPay: switcher})
    if (switcher == true) {
      this.setState({cost: this.state.eventualCost})
    }
    else if (switcher == false) {
      this.setState({cost: this.state.reservationCost})
    }
  }

  activateTermsOfService = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderTermsOfServicePopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  activatePrivacyPolicy = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderPrivacyPolicyPopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  renderTermsOfServicePopup = () => {
    return (
      <div>
        <TermsConditionsPrivacyPolicy selectedWindow='terms-conditions' />
      </div>
    )
  }

  renderPrivacyPolicyPopup = () => {
    return (
      <div>
        <TermsConditionsPrivacyPolicy selectedWindow='privacy-policy' />
      </div>
    )
  }

  handleSubmit = async event => {
    event.preventDefault();

    let {
      billingStreet,
      billingStreetLine2,
      billingCity,
      billingState,
      billingZip,
      organization,
      email,
      legalAgree
    } = this.state

    if (!billingStreet) return this._billingStreetInput.focus()
    if (!billingCity) return this._billingCityInput.focus()
    if (!billingZip) return this._billingZipInput.focus()
    if (!organization) return this._organizationInput.focus()
    if (!email) return this._emailInput.focus()

    if (legalAgree == false) {
      this.setState({errorMessage: "You must read and agree to our Terms and Conditions and Privacy Policy"})
      return
    }

    if (this._passwordInput) {
      let password = this._passwordInput.value
      if (password) {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
          this.setState({ passwordInvalid: false, purchaseInProgress: true })
          this.context.getActions('AuthActions').signUp(email, password) // fire and forget
          await this.timeout(2000) // give cognito lambda time to create API user
        } else {
          return this.setState({ passwordInvalid: true })
        }
      } else { // user has opted to defer signup
        try {
          this.setState({ purchaseInProgress: true })
          // await this.context.getActions('ApiActions').query().post('http://localhost:3001/api/user').send({ jupyterUsername: email, email: email })
          await this.context.getActions('ApiActions').query().post('/user-simple').send({ jupyterUsername: email, email: email })
        } catch (err) {
          this.setState({ purchaseInProgress: false })
          return alert('Unable to sign up: email address may already be in use')
        }
      }
    }

    const { stripe, elements} = this.props;
    if (!stripe || !elements) {
      return;
    }

    let number_learn_users = 0
    let number_research_users = 0
    let months_active_learn = 12
    let months_active_research = 12

    let planType = this.state.planType

    if (this.state.planType == 'Basic') {
      number_learn_users = 10
    }
    else if (this.state.planType == 'Pro') {
      number_learn_users = 10
      number_research_users = 2
      planType = 'Full'
    }
    else if (this.state.planType == 'Ultimate') {
      number_learn_users = 10
      number_research_users = 5
    }

    this.setState({ purchaseInProgress: true })
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
      this.setState({errorMessage: result.error.message, purchaseInProgress: false })
    } else {
      console.log(result.token);
      const order = await this.context.getActions('ApiActions').query().post("/stripe/charge").send({
      // const order = await axios.post("http://localhost:3001/api/stripe/charge", {
        amount: this.state.cost,
        source: result.token.id,
        receipt_email: this.state.email,
        organization_name: this.state.organization,
        plan_type: planType,
        product: this.state.product,
        full_pay: this.state.fullPay,
        number_learn_users,
        number_research_users,
        months_active_learn,
        months_active_research,
        discount_code: this.state.discountCode,
        billingStreet: billingStreet,
        billingStreetLine2: billingStreetLine2,
        billingCity: billingCity,
        billingState: billingState,
        billingZip: billingZip
      })

      console.log(order)

      let renderData = order.body.renderData
      let response = renderData.research_enabled + "&" + renderData.number_research_users + "&" + renderData.number_learn_users + "&" + renderData.research_access_key + "&" + renderData.learn_access_key
      this.setState({ purchaseInProgress: false })
      this.context.getActions('NavigationActions').navigate('/executive-home/' + response)
    }
  };

  handleChangeOrganization = (e) => {
    this.setState({organization: e.target.value.trim()})
  }

  timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  renderStateDropdown = () => (
    <select onSelect={this.handleChangeBillingState} style={{paddingBottom: 1, border: 'none', borderBottom: '1px solid #adadad', outline: 'none', width: 40, color: '#333'}}>
      <option value="AL">AL</option>
      <option value="AK">AK</option>
      <option value="AR">AR</option>
      <option value="AZ">AZ</option>
      <option value="CA">CA</option>
      <option value="CO">CO</option>
      <option value="CT">CT</option>
      <option value="DC">DC</option>
      <option value="DE">DE</option>
      <option value="FL">FL</option>
      <option value="GA">GA</option>
      <option value="HI">HI</option>
      <option value="IA">IA</option>
      <option value="ID">ID</option>
      <option value="IL">IL</option>
      <option value="IN">IN</option>
      <option value="KS">KS</option>
      <option value="KY">KY</option>
      <option value="LA">LA</option>
      <option value="MA">MA</option>
      <option value="MD">MD</option>
      <option value="ME">ME</option>
      <option value="MI">MI</option>
      <option value="MN">MN</option>
      <option value="MO">MO</option>
      <option value="MS">MS</option>
      <option value="MT">MT</option>
      <option value="NC">NC</option>
      <option value="NE">NE</option>
      <option value="NH">NH</option>
      <option value="NJ">NJ</option>
      <option value="NM">NM</option>
      <option value="NV">NV</option>
      <option value="NY">NY</option>
      <option value="ND">ND</option>
      <option value="OH">OH</option>
      <option value="OK">OK</option>
      <option value="OR">OR</option>
      <option value="PA">PA</option>
      <option value="RI">RI</option>
      <option value="SC">SC</option>
      <option value="SD">SD</option>
      <option value="TN">TN</option>
      <option value="TX">TX</option>
      <option value="UT">UT</option>
      <option value="VT">VT</option>
      <option value="VA">VA</option>
      <option value="WA">WA</option>
      <option value="WI">WI</option>
      <option value="WV">WV</option>
      <option value="WY">WY</option>
    </select>
  )

  render() {
    return (
      <div>
        <div className="product-info">
          <h3 className="product-title">qBraid Executive Workshop: <span style={{color: '#E60B74'}}>{this.state.planType}</span></h3>
          <hr />
          <p className="select-payment-prompt">Payment options</p>
          <div className="exec-payment-buttons">
            <button onClick={() => this.handleChangeFullPay(false)} className="exec-payment-button" style={this.state.fullPay == false ? null : {borderColor: '#bdbdbd'}}>
              <div>
                <p style={{fontSize: 16}}>Reserve a seat</p>
                <p style={{fontSize: 12, color: 'gray'}}>(non-refundable)</p>
                <p style={{fontSize: 22}}>$300*</p>
                <p style={{fontSize: 12, color: 'gray'}}>*Purchase your seat later for ${this.state.eventualCost - this.state.reservationCost}</p>
              </div>
            </button>
            <button onClick={() => this.handleChangeFullPay(true)} className="exec-payment-button" style={this.state.fullPay == true ? null : {borderColor: '#bdbdbd'}}>
              <div>
                <p style={{fontSize: 16}}>Purchase a seat</p>
                <p style={{fontSize: 12, color: 'gray'}}>(refundable)</p>
                <p style={{fontSize: 22}}>${this.state.eventualCost}</p>
                <p style={{color: 'transparent'}}>.</p>
              </div>
            </button>
          </div>
        </div>
        <div style={{width: 'fit-content', margin: '0 auto', textAlign: 'center'}}>
          <div className="exec-payment-form-section">
            <p className="form-header">Billing address</p>
            <input type="text" ref={(input) => this._billingStreetInput = input} onChange={this.handleChangeBillingStreet} placeholder="Street Address" style={{border: 'none', outline: 'none', fontSize: 16}}/>
            <input type="text" ref={(input) => this._billingStreetLine2Input = input} onChange={this.handleChangeBillingStreetLine2} placeholder="Apt. # or P.O. Box" style={{border: 'none', outline: 'none', fontSize: 16}}/>
            <input type="text" ref={(input) => this._billingCityInput = input} onChange={this.handleChangeBillingCity} placeholder="City" style={{border: 'none', outline: 'none', fontSize: 16}}/>
            <div style={{dispay: 'flex', flexDirection: 'row'}} onSelect={this.handleChangeBillingState}>
              {this.renderStateDropdown()}
              <input type="text" ref={(input) => this._billingZipInput = input} onChange={this.handleChangeBillingZip} placeholder="Zip code" style={{border: 'none', outline: 'none', fontSize: 16, width: 110, marginLeft: 20}}/>
            </div>
          </div>
          <div className="exec-payment-form-section">
            <p className="form-header">Your profile</p>
            <input type="text" ref={(input) => this._organizationInput = input} onChange={this.handleChangeOrganization} placeholder="Organization Name" style={{border: 'none', outline: 'none', fontSize: 16}}/>
            {this.state.preexistingEmail ?
            <input type="text" value={this.state.preexistingEmail} disabled={true} placeholder="Email Address" style={{border: 'none', outline: 'none', fontSize: 16}}/> :
            <input type="text" ref={(input) => this._emailInput = input} onChange={this.handleChangeEmail} placeholder="Email Address" style={{border: 'none', outline: 'none', fontSize: 16}}/>}
            {!this.state.preexistingEmail && <div>
              <input type="password" ref={(input) => this._passwordInput = input} placeholder="Password (optional*)" style={{border: 'none', outline: 'none', fontSize: 16}} />
              <p style={{width: 200, margin: '0 0 0 35px', textAlign: 'left', color: this.state.passwordInvalid ? 'red' : 'gray', fontSize: 12}}>{this.state.passwordInvalid ? 'Password must be at least 8 characters, including an uppercase letter, number, and special character' : '*You\'ll need a qBraid account to access the full workshop content. You can create your account later.'}</p>
            </div>}
          </div>
          <br></br>
          <CardSection />
          <div style={{margin: 20}}>
            <input type="checkbox" onClick={this.handleLegalAgree} />
            <span style={{margin: 10}}>I have read and agree to qBraid's <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={this.activateTermsOfService}>Terms and Conditions</span> and <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={this.activatePrivacyPolicy}>Privacy Policy</span></span>
          </div>
          <button disabled={!this.props.stripe} className="btn-pay no-select" onClick={this.handleSubmit}>
            {this.state.purchaseInProgress ? 'Purchasing...' : 'Purchase'}
          </button>
        </div>
        <p style={{textAlign: 'center'}}>Have a problem? Reach out to us at <a href="mailto:contact@qbraid.com" target="_blank" rel="noopener noreferrer" style={{color: 'blue', textDecoration: 'underline'}}>contact@qbraid.com</a></p>
        <p style={{marginBottom: 30, color: 'red', textAlign: 'center'}}>{this.state.errorMessage}</p>
      </div>
    );
  }
}


export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer >
      {({ stripe, elements }) => (
        <ExecCheckoutForm stripe={stripe} elements={elements}/>
      )}
    </ElementsConsumer>
  );
}
