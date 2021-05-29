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

import planCosts from '../../PlanCosts'

let splitURL = window.location.href.split('/')
let mode = 'individual'
if (splitURL[0] == 'localhost:3000') {
  mode = splitURL[1].split('-')[0]
}
else {
  mode = splitURL[3].split('-')[0]
}

class IndividualCheckoutForm extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    const planType = context.getStore('NavigationStore').getState().params.stuff;
    let {user} = context.getStore('AuthStore').getState()
    let preexistingEmail = user && user.attributes ? user.attributes.email : ''
    this.state = {
      fullPay: false,     //If fullPay is true, bills them for the entire cost
      organization: '',
      cost: 0,
      academicDiscount: 0,
      discountedCost: 0,
      planType: planType,
      buyer: 'industry',
      product: 'individual-subscription',
      email: preexistingEmail,
      errorMessage: '',
      billingStreet: '',
      billingStreetLine2: '',
      billingCity: '',
      billingState: 'AL',
      billingZip: '',
      passwordInvalid: false,
      purchaseInProgress: false,
      numberUsers: 1,
      organization: '',
      changeBilling: false,
      changeStripe: false,

      mode: mode,                        // can be individual or organization
    }
  }

  componentDidMount() {
    this.handleInitialCost()
    setTimeout(this.getExistingBilling, 1)
  }

  getExistingBilling = () => {
    this.context.getActions("AuthActions").getUser(true)
    .then((user) => {

      if (user) {
        this.context.getActions("ApiActions").query().get(`/search-user-billing/` + user.attributes.email)   //Does lookup to find ID of the user with this email, then finds org with an owner of that ID (if any)
         .end((err, res) => {
           if (err) {
             console.log(err)
             this.setState({errorMessage: "Problem finding your user details"})
             return
           } else {
             var isStripeId = false
             var isBilling = false
             isStripeId = (res.body.stripeId ? true : false)
             isBilling = (res.body.billingStreet ? true : false)
             this.setState({isStripeId, isBilling, billingStreet: res.body.billingStreet})

             return
          }
        })
      }
    })
  }

  handleChangeStripe = (e) => this.setState({changeStripe: true})

  handleChangeBilling = (e) => this.setState({changeBilling: true})

  handleChangeOrganization = (e) => this.setState({ organization: e.target.value.trim() })

  handleChangeNumberUsers = (e) => this.setState({ numberUsers: e.target.value.trim() })

  handleChangeBillingStreet = (e) => this.setState({ billingStreet: e.target.value.trim() })

  handleChangeBillingStreetLine2 = (e) => this.setState({ billingStreetLine2: e.target.value.trim() })

  handleChangeBillingCity = (e) => this.setState({ billingCity: e.target.value.trim() })

  handleChangeBillingState = (e) => this.setState({ billingState: e.target.value.trim() })

  handleChangeBillingZip = (e) => this.setState({ billingZip: e.target.value.trim() })

  handleChangeEmail = (e) => this.setState({ email: e.target.value.trim() })

  handleInitialCost = (e) => {
    var cost = 0
    var academicDiscount = 0
    if (this.state.planType == 'QuBes') {
      cost = planCosts.qubes.cost
      academicDiscount = planCosts.qubes.discount
    }
    else if (this.state.planType == 'QuInt') {
      cost = planCosts.quint.cost
      academicDiscount = planCosts.quint.discount
    }
    else if (this.state.planType == 'Research') {
      cost =  planCosts.research.cost
      academicDiscount = planCosts.research.discount
    }
    else if (this.state.planType == 'UIUC') {
      cost = planCosts.uiuc.cost
      academicDiscount = planCosts.uiuc.discount
    }

    this.setState({cost, academicDiscount, discountedCost: cost})
  }

  handleChangePayer = (payer) => {
    if (payer == 'academic') {
      this.setState({buyer: 'academic', discountedCost: this.state.cost * (1 - this.state.academicDiscount)})
      return
    }
    this.setState({buyer: 'industry', discountedCost: this.state.cost})
  }

  handleSubmit = async event => {
    event.preventDefault();

    let {
      billingStreet,
      billingStreetLine2,
      billingCity,
      billingState,
      billingZip,
      email,
      organization,
    } = this.state

    if (!billingStreet) return this._billingStreetInput.focus()
    if (!billingCity) return this._billingCityInput.focus()
    if (!billingZip) return this._billingZipInput.focus()
    if (!organization && this.state.mode == 'organization') return this._organizationInput.focus()
    if (!this.state.numberUsers && this.state.mode == 'organization') return this._numberUsersInput.focus()

    if ((this.state.numberUsers % 1) != 0) {
      this.setState({errorMessage: 'Number of users must be an integer'})
      return this._numberUsersInput.focus()
    }

    if (this.state.numberUsers < 0) {
      this.setState({errorMessage: 'Number of users must be positive'})
      return this._numberUsersInput.focus()
    }

    const { stripe, elements} = this.props;
    if (!stripe || !elements) {
      return;
    }

    this.setState({ purchaseInProgress: true })
    var result = ''
    if (!this.state.isStripeId || this.state.changeStripe) {
      const card = elements.getElement(CardElement);
      if (card) {
        result = await stripe.createToken(card);
      }

    }

    if (result.error) {
      console.log(result.error.message);
      this.setState({errorMessage: result.error.message, purchaseInProgress: false })
    } else {
      console.log(result.token);
      const order = await this.context.getActions('ApiActions').query().post("/stripe").send({
      // const order = await axios.post("http://localhost:3001/api/stripe/organization", {
        amount: this.state.discountedCost,
        buyer: this.state.buyer,
        source: (result ? result.token.id : ''),
        receipt_email: this.state.email,
        organization_name: (this.state.mode == 'organization') && this.state.organization,
        plan_type: this.state.planType,
        product: this.state.product,
        number_users: (this.state.mode == 'organization') ? this.state.numberUsers : 1,
        billingStreet: billingStreet,
        billingStreetLine2: billingStreetLine2,
        billingCity: billingCity,
        billingState: billingState,
        billingZip: billingZip
      })

      this.context.getActions('NavigationActions').navigate('/organization-management')
    }
  };

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
          <h3 className="product-title">qBraid {this.state.mode.substring(0, 1).toUpperCase() + this.state.mode.substring(1)} Account: <span style={{color: '#E60B74'}}>{this.state.planType}</span></h3>
          <hr />
          <p className="select-payment-prompt">Payment options</p>
          <div className="exec-payment-buttons">
            <button onClick={() => this.handleChangePayer('non-academic')} className="exec-payment-button" style={this.state.buyer == 'industry' ? null : {borderColor: '#bdbdbd'}}>
              <div>
                <p style={{fontSize: 16}}>Non-Academic</p>
                <p>Cost Per Month: ${this.state.cost}</p>
              </div>
            </button>
            <button onClick={() => this.handleChangePayer('academic')} className="exec-payment-button" style={this.state.buyer == 'academic' ? null : {borderColor: '#bdbdbd'}}>
              <div>
                <p style={{fontSize: 16}}>Academic</p>
                <p>Cost Per Month: ${this.state.cost * (1-this.state.academicDiscount)}</p>
              </div>
            </button>
          </div>
        </div>
        <div style={{width: 'fit-content', margin: '0 auto', textAlign: 'center'}}>
          <div className="exec-payment-form-section">
            {  this.state.mode == 'organization' && <div>
              <p className="form-header">Name of User Group</p>
              <input type="text" ref={(input) => this._organizationInput = input} onChange={this.handleChangeOrganization} placeholder="Group Name" style={{border: 'none', outline: 'none', fontSize: 16}}/>
              <p className="form-header">Number of Users</p>
              <input type="number" ref={(input) => this._numberUsersInput = input} onChange={this.handleChangeNumberUsers} placeholder="Number of Users" style={{border: 'none', outline: 'none', fontSize: 16}}/>
            </div> }
            <p className="form-header">Billing address</p>
            {(this.state.isBilling && !this.state.changeBilling) ?
              <div>
                <p>Your billing address is set up at {this.state.billingStreet}. <span onClick={this.handleChangeBilling} style={{textDecoration: 'underline', cursor: 'pointer'}}>Change</span></p>
              </div>
                 :
              <div>
                <input type="text" ref={(input) => this._billingStreetInput = input} onChange={this.handleChangeBillingStreet} placeholder="Street Address" style={{border: 'none', outline: 'none', fontSize: 16}}/>
                <input type="text" ref={(input) => this._billingStreetLine2Input = input} onChange={this.handleChangeBillingStreetLine2} placeholder="Apt. # or P.O. Box" style={{border: 'none', outline: 'none', fontSize: 16}}/>
                <input type="text" ref={(input) => this._billingCityInput = input} onChange={this.handleChangeBillingCity} placeholder="City" style={{border: 'none', outline: 'none', fontSize: 16}}/>
                <div style={{dispay: 'flex', flexDirection: 'row'}} onSelect={this.handleChangeBillingState}>
                  {this.renderStateDropdown()}
                  <input type="text" ref={(input) => this._billingZipInput = input} onChange={this.handleChangeBillingZip} placeholder="Zip code" style={{border: 'none', outline: 'none', fontSize: 16, width: 110, marginLeft: 20}}/>
                </div>
              </div>
            }
          </div>
          <br></br>
          {(this.state.isStripeId && !this.state.changeStripe) ? <p>You already have a card registered with qBraid. <span onClick={this.handleChangeStripe} style={{textDecoration: 'underline', cursor: 'pointer'}}>Change It</span></p> :
          <CardSection /> }
          <p style={{margin: 20}}>Note: Your subscription to qBraid products will be auto-renewed unless you cancel it.</p>
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
        <IndividualCheckoutForm stripe={stripe} elements={elements}/>
      )}
    </ElementsConsumer>
  );
}
