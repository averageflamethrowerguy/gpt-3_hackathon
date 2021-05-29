import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import {injectStripe} from 'react-stripe-elements';

import AuthStore from '../../../../stores/AuthStore'
import Auth from '@aws-amplify/auth'


import contextTypes from '../../../../contextTypes'
import CardSection from "./CardSection";
import axios from 'axios'
import "./ExecCheckoutForm.css"

class ExecPayupForm extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    const input = document.location.href.split('?')
    this.state = {
      fullPay: false,     //If fullPay is true, bills them for the entire cost
      // recieptEmail: this.context.getStore('AuthStore').getState().user.attributes.email,             //make a fn to get email address (from cognito?)\
      email: input[1],
      errorMessage: ""
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { stripe, elements} = this.props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
      this.setState({errorMessage: result.error.message})
    } else {
      console.log(result.token);
      const order = await this.context.getActions('ApiActions').query().post("/stripe/payup").send({
      // const order = await axios.post("http://localhost:3001/api/stripe/charge", {
        amount: this.state.cost,
        source: result.token.id,
        receipt_email: this.state.email,
      })

      this.context.getActions('NavigationActions').navigate('/')
    }
  };

  render() {
    return (
      <div>
        <div className="product-info">
          <h3 className="product-title">qBraid Executive Workshop: {this.state.planType}</h3>
          <div className="exec-payment-buttons">
            <div className="exec-payment-button" style={{textAlign: 'center'}}>
              <div>
                <p style={{fontSize: 16}}>Secure Your Seat</p>
                <p style={{fontSize: 22}}>{this.state.cost}</p>
              </div>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <CardSection />
            <button disabled={!this.props.stripe} className="btn-pay" style={{borderRadius: 2}}>
              Buy Now
            </button>
          </form>
        </div>
        <p style={{marginBottom: 30, color: 'red'}}>{this.state.errorMessage}</p>
      </div>
    );
  }
}


export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer >
      {({ stripe, elements }) => (
        <ExecPayupForm stripe={stripe} elements={elements}/>
      )}
    </ElementsConsumer>
  );
}
