import React from 'react';
import PaymentButton from './OrganizationPaymentButton'

import contextTypes from '../../../../contextTypes'

var discountCode = window.location.href.split('?')[1]

export default class OrganizationPayment extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      paymentAmount: this.props.features.cost,
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
        <div style={{textAlign: 'left', margin: '0 20px', fontSize: 14, color: '#652d5e'}}>
          <div style={{marginBottom: 40, height: 80, textAlign: 'center'}}>
            <p>QuBes course</p>
            {this.props.planType != 'QuBes' ? <p>QuInts Course</p> : ''}
            {//(this.props.planType == 'QuPro') || (this.props.planType == 'Research') ? <p>QuPro Course</p> : ''
            }
            {this.props.planType == 'Research' ? <p>Access to qBraid Research</p> : ''}
          </div>
          <div style={{textAlign: 'center', height: 100}}>
            {this.props.planType == 'QuBes' ? <p>QuBes is our beginner tutorial set. It is designed to teach a student the basics of quantum computing over the course of 2-3 weeks.</p> : ''}
            {this.props.planType == 'QuInt' ? <p>QuInt is designed for students with a strong math background, or for students that have already completed QuBes.
                                                  It teaches more advanced subjects over the course of 3-4 months.</p> : ''}
            {this.props.planType == 'Research' ? <p>qBraid Research is a set of tools designed for scholars or business professionals already at the forefront of quantum computing.</p> : ''}
          </div>
        </div>
        <p>Cost: ${this.state.paymentAmount} per user per month</p>
        <p>{this.props.features.academicDiscount} academic discount</p>
      </div>
    )
  }

  render() {
    return (
      <div className="box">
        <div>
          <h2 id="plan-heading" style={{color: '#333'}}>{this.props.planType}</h2>
          <dl id="plan-description">{this.renderPlanDescription()}</dl>
        </div>
        <PaymentButton planType={this.props.planType} features={this.props.features}
        />
      </div>
    )
  }
}
