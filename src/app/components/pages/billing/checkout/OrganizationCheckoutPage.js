import React from "react";
import "./OrganizationCheckoutPage.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrganizationCheckoutForm from "./OrganizationCheckoutForm";
import stripePromise from './keys.js'

class OrganizationCheckoutPage extends React.Component {
  // req.query

  constructor(props, context) {
    super(props, context)
    this.state = {
      cost: 0,
      academicDiscount: 0,
      discount: 0,
      discountedCost: 0,
      subscriptionLength: 1,
      payer: 'industry'   //industry or academic
    }
  }


  render () {
    return (
      <div>
        <div className="App">
          <div className="product">
            <div>
              <Elements stripe={stripePromise}>
                <OrganizationCheckoutForm/>
              </Elements>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default OrganizationCheckoutPage
