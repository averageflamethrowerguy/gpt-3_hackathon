import React from "react";
import "./ExecCheckoutPage.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ExecPayupForm from "./ExecPayupForm";
import stripePromise from './keys.js'

class ExecPayupPage extends React.Component {
  // req.query


  render () {
    return (
      <div>
        <div className="App">
          <div className="product">
            <div>
              <Elements stripe={stripePromise}>
                <ExecPayupForm/>
              </Elements>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ExecPayupPage
