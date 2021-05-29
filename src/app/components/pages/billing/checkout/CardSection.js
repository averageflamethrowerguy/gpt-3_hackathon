import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#303238",
      fontSize: "16px",
      fontFamily: "sans-serif",
      fontSmoothing: "antialiased",
      borderBottom: "1px solid #bdbdbd",
      ":focus": {
        borderColor: '#E60B74 !important'
      },
      "::placeholder": {
        color: "#adadad"
      }
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
  }
};

function CardSection() {
  return (
    <div style={{width: 300, margin: '10px auto'}}>
      <p style={{textAlign: 'center', fontWeight: 'bold', color: 'gray', marginTop: 20, marginBottom: '-10px'}}>Card details</p>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
    </div>
  );
}

export default CardSection;
