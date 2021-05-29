import React from 'react';
import PaymentButton from './ExecPaymentButton'

import contextTypes from '../../../../contextTypes'

var discountCode = window.location.href.split('?')[1]

export default class ExecPayment extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      paymentAmount: this.props.eventualCost,
    }
  }

  handleDiscountAmounts = () => {
    let paymentAmount = this.props.eventualCost
    if (discountCode) {
      this.context.getActions("ApiActions").query().get(`/discount-code?code=${discountCode}`)   // Finds the object for the discount key
        .end((err, res) => {
          if (err) {
            console.log(err)
          } else {
            let discounts = res.body[0].discounts

            for (let i=0; i < discounts.length; i++) {
              if (this.props.planType == "Basic" && discounts[i].productName == 'executive?basic') {
                paymentAmount = (1 - discounts[i].productDiscount) * paymentAmount
              }
              else if (this.props.planType == "Pro" && discounts[i].productName == 'executive?full') {
                paymentAmount = (1 - discounts[i].productDiscount) * paymentAmount
              }
              else if (this.props.planType == "Ultimate" && discounts[i].productName == 'executive?ultimate') {
                paymentAmount = (1 - discounts[i].productDiscount) * paymentAmount
              }
            }
            this.setState({paymentAmount})
          }
      })
    }
  }

  componentDidMount() {
    this.handleDiscountAmounts()
  }

  renderNonDiscountedPrice = () => {
    if (this.state.paymentAmount != this.props.eventualCost) {
      return (<span style={{"text-decoration": "line-through"}}>${this.props.eventualCost} </span>)
    }
    else {
      return
    }
  }

  renderPlanDescription = () => {
    let consultationHours = this.props.features.number_consultation_hrs
    let researchUsers = this.props.features.number_research_users
    var consultationText = ''
    if (consultationHours > 0 ) {
      consultationText = consultationHours + (consultationHours == 1 ? ' hour' : ' hours') + ' of consultation with quantum computing experts'
    }

    return(
      <div>
        <p>Full access to the workshop, plus:</p>
        <div style={{textAlign: 'left', margin: '0 20px', fontSize: 14, color: '#652d5e'}}>
          <div style={{marginBottom: 40, height: 120}}>
            <p>• {this.props.features.number_learn_users} <a href="https://qbraid.com/platform.html">qBraid Learn accounts</a></p>
            {consultationHours > 0 && <p>• {consultationText}</p>}
            {this.props.features.number_research_users > 0 && <p>• {researchUsers} <a href="https://qbraid.com/platform.html">qBraid Research {(researchUsers == 1 ? 'account' : 'accounts')}</a></p>}
            {this.props.planType == 'Ultimate' && <p style={{marginBottom: 30}}>• 3 hours of employee training</p>}
          </div>
        </div>
        <p>Cost: {this.renderNonDiscountedPrice()}${this.state.paymentAmount}</p>
        <p>Cost to Reserve Seat: ${this.props.reserveCost}</p>
      </div>
    )
  }

  render() {
    return (
      <div class="box">
        <div>
          <h2 id="plan-heading" style={{color: '#333'}}>{this.props.planType}</h2>
          <dl id="plan-description">{this.renderPlanDescription()}</dl>
        </div>
        <PaymentButton planType={this.props.planType} cost={this.props.reserveCost}
        product={this.props.product} eventualCost={this.state.paymentAmount} discountCode={discountCode}
        />
      </div>
    )
  }
}
