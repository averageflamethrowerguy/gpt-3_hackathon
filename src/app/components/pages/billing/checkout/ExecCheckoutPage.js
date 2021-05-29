import React from "react";
import "./ExecCheckoutPage.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ExecCheckoutForm from "./ExecCheckoutForm";

import stripePromise from './keys.js'

let input = document.location.href.split('?')  //input[1] is cost, input[2] is product
let cost = input[1]
let product = input[2]

class ExecCheckoutPage extends React.Component {
  // req.query


  render () {
    return (
      <div>
        <div className="App">
          <div className="product">
            <div>
              <Elements stripe={stripePromise} cost={cost} product={product}>
                <ExecCheckoutForm cost={cost} product={product}/>
              </Elements>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ExecCheckoutPage
