import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../../../partials/Link'

import contextTypes from '../../../../contextTypes'
import logo from '../../../../../assets/img/logo.png'

import '../Billing.css'
import './CustomResearchSubscription.css'

const FormInput = posed.input({
  default: { borderBottom: '2px solid #ffffff' },
  entering: { borderBottom: '2px solid #ff6400' },
  valid: { borderBottom: '2px solid #00ba00' }
})

const industry_base = 100;    //cost for a single industry user paying month-to-month
const education_base = 24;

export default class CustomResearchSubscription extends React.Component {
  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      buyer: 'Industry',
      otherBuyer: 'Education',
      cost: 100,
      cost_of_discounts: 0,
      users_upfront: 1,    //can vary from 1 to 100 users
      users_discount: 0,   //can vary from 0 to 0.30
      months_upfront: 1,   //can vary from 1 to 12 months
      cost_without_discounts: 0,   //the total cost without discounts
      cost_per_user: 100,    //cost per user without any bulk discounts
      cost_per_user_discounts: 100, //cost per user with discounts
      cost_pre_paid_discounts: 100,  //cost per prepaid user with discounts
      error_message: '',
      users_additional: 0,
      users_total: 1,
      total_cost: 100,

      months_optimizer: 1,         //optimizer takes months, users, volatility and outputs users_upfront, discount, months and runs through cost fn
      users_optimizer: 1,
      volatility_optimizer: 0
    }
  }

  handleChangeBuyer = (buyer) => {
    if (buyer == 'Industry') {  //the buyer that we want to update to
      this.setState({
        otherBuyer: 'Education', //the buyer not currently selected
        buyer: 'Industry',
        cost_per_user: 100,
        cost_per_user_discounts: 100, //cost per user with discounts
        cost_pre_paid_discounts: 100
      })
      this.calculateCost(100, this.state.months_upfront, this.state.users_upfront, this.state.users_discount, this.state.users_additonal)
    }
    else if (buyer == 'Education') {
      this.setState({
        otherBuyer: 'Industry',
        buyer: 'Education',
        cost_per_user: 25,
        cost_per_user_discounts: 25, //cost per user with discounts
        cost_pre_paid_discounts: 25
      })
      this.calculateCost(25, this.state.months_upfront, this.state.users_upfront, this.state.users_discount, this.state.users_additional)
    }
  }

  calculateCost = (cost_per_user, months_upfront, users_upfront, users_discount, users_additional) => {

    // users_upfront: 1,    //can vary from 1 to 100 users
    // users_discount: 0,   //can vary from 0 to 30%
    // months_upfront: 1,   //can vary from 1 to 12 months
    // cost_without_discounts: 0,   //the total cost without discounts
    // cost_per_user: 100,    //cost per user without any bulk discounts
    // cost_per_user_discounts: 100, //cost per user with discounts
    // cost_pre_paid_discounts: 100,

    if (users_discount > 30 || users_discount < 0) {
      this.setState({errorMessage: "Per user discount must be less than 30"})
    }
    else if (users_upfront > 100 || users_upfront < 1) {
      this.setState({errorMessage: "1-100 users may be included in the plan"})
    }
    else if (months_upfront > 12 || months_upfront < 1) {
      this.setState({errorMessage: "1-12 months may be included in the plan"})
    }
    else {
      var cost_per_user_discounts = cost_per_user*(1-users_discount/100)           //cost for additional users
      var exp_scaler = Math.pow((users_upfront-1)/100,0.35)/10
      cost_per_user_discounts = cost_per_user_discounts*Math.pow(10, -exp_scaler)
      var exp_scaler_2 = Math.pow((months_upfront-1)/12,0.35)/10
      var cost_pre_paid_discounts = cost_per_user_discounts*Math.pow(10,-exp_scaler_2) //cost for pre-paid users
      var cost_of_discounts = cost_per_user*Math.pow(users_discount/12, 2.5)
      var upfront_cost = users_upfront*cost_pre_paid_discounts*months_upfront + cost_of_discounts*months_upfront
      var additional_cost = users_additional*months_upfront*cost_per_user_discounts
      var total_cost = upfront_cost + additional_cost

      this.setState({errorMessage: '',
        cost_per_user_discounts: cost_per_user_discounts,
        cost_pre_paid_discounts: cost_pre_paid_discounts,
        cost: upfront_cost,
        cost_of_discounts: cost_of_discounts,
        total_cost: total_cost
      })
      return total_cost
    }
  }

  handleMonthsUpfront = (e) => {
    let months_upfront = e.target.value.trim()
    if (months_upfront < 1) {
      months_upfront = 1
    }
    this.setState({months_upfront: months_upfront})
    this.calculateCost(this.state.cost_per_user, months_upfront, this.state.users_upfront, this.state.users_discount, this.state.users_additional)
  }

  handleUsersDiscount = (e) => {
    let users_discount = e.target.value.trim()
    if (users_discount < 0) {
      users_discount = 0
    }
    this.setState({users_discount: users_discount})
    this.calculateCost(this.state.cost_per_user, this.state.months_upfront, this.state.users_upfront, users_discount, this.state.users_additional)
  }

  handleUsersUpfront = (e) => {
    let users_upfront = e.target.value.trim()
    if (users_upfront < 1) {
      users_upfront = 1
    }
    let users_total = parseInt(this.state.users_additional) + parseInt(users_upfront)
    this.setState({users_upfront: parseInt(users_upfront), users_total: users_total})
    this.calculateCost(this.state.cost_per_user, this.state.months_upfront, users_upfront, this.state.users_discount, this.state.users_additional)
  }

  handleUsersTotal = (e) => {
    let users_additional = e.target.value.trim()
    if (users_additional < 0) {
      users_additional = 0
    }
    let users_total = parseInt(users_additional) + parseInt(this.state.users_upfront)
    this.setState({users_additional: parseInt(users_additional), users_total: users_total})
    this.calculateCost(this.state.cost_per_user, this.state.months_upfront, this.state.users_upfront, this.state.users_discount, users_additional)
  }

  handleMonthsOptimizer = (e) => {
    let months_optimizer = e.target.value.trim()
    if (months_optimizer < 1) {
      months_optimizer = 1
    }
    this.setState({months_optimizer: months_optimizer})
    this.optimize(this.state.cost_per_user, months_optimizer, this.state.users_optimizer, this.state.volatility_optimizer)
  }

  handleUsersOptimizer = (e) => {
    let users_optimizer = e.target.value.trim()
    if (users_optimizer < 1) {
      users_optimizer = 1
    }
    this.setState({users_optimizer: users_optimizer})
    this.optimize(this.state.cost_per_user, this.state.months_optimizer, users_optimizer, this.state.volatility_optimizer)
  }

  handleVolatilityOptimizer = (e) => {
    let volatility_optimizer = e.target.value.trim()
    if (volatility_optimizer < 0) {
      volatility_optimizer = 0
    }
    this.setState({volatility_optimizer: volatility_optimizer})
    this.optimize(this.state.cost_per_user, this.state.months_optimizer, this.state.users_optimizer, volatility_optimizer)
  }

  optimize = (cost_per_user, months_optimizer, users_optimizer, volatility_optimizer) => {
    let months = months_optimizer
    let users_upfront = 1
    let users_discount = 0
    let users_additional = users_optimizer - users_upfront
    let last_cost = 1000000
    for (users_upfront = 1; users_upfront < users_optimizer; users_upfront++) {
      let calc_cost = this.calculateCost(cost_per_user, months, users_upfront, users_discount, users_additional)
      if (calc_cost < last_cost) {
        last_cost = calc_cost
        users_additional = users_optimizer - users_upfront -1
      }
      else {
        users_upfront--
        break
      }
    }
    last_cost = 1000000
    for (users_discount = 0; users_discount < 31; users_discount++) {
      let calc_cost = this.calculateCost(cost_per_user, months, users_upfront, users_discount, users_additional)
      if (calc_cost < last_cost) {
        last_cost = calc_cost
      }
      else {
        users_discount--
        break
      }
    }
    this.setState({users_upfront: users_upfront, users_discount: users_discount, users_additional: users_additional, months_upfront: months, users_total: users_optimizer})
  }

  render() {
    return (

      <div className="login-form">
        <div style={{float: 'left'}}>
          <h3>{this.state.buyer} Plan</h3>
          <p
            style={{cursor: 'pointer'}}
            onClick={() => this.handleChangeBuyer(this.state.otherBuyer)}>
            Switch to {this.state.otherBuyer} Plan
          </p>
          <form autoComplete="off" spellCheck="false">
            <FormInput
              className="login-field"
              ref="numberMonthsInput"
              name="numberMonths"
              type="number"
              placeholder="Number of Months Upfront"
              onChange={this.handleMonthsUpfront}
            />
            <FormInput
              className="login-field"
              ref="percentageDiscountInput"
              name="percentageDiscount"
              type="number"
              placeholder="Percentage Discount per User (Max: 0.3)"
              onChange={this.handleUsersDiscount}
            />
            <FormInput
              className="login-field"
              ref="usersUpfrontInput"
              name="usersUpfront"
              type="number"
              placeholder="Include Users in Payment (Max: 100)"
              onChange={this.handleUsersUpfront}
            />
            <FormInput
              className="login-field"
              ref="usersTotalInput"
              name="usersTotal"
              type="number"
              placeholder="Additional Users (Estimation purposes only)"
              onChange={this.handleUsersTotal}
            />
          </form>
          <p>{this.state.errorMessage}</p>
          <p>Base Cost for single user is ${this.state.cost_per_user} per user</p>

          <h3>Your Plan</h3>
          <p>Total Cost is: ${this.state.total_cost}</p>
          <p>Total Savings ${this.state.cost_per_user*this.state.users_total*this.state.months_upfront - this.state.total_cost} ({100*(1-(this.state.total_cost/(this.state.cost_per_user*this.state.users_total*this.state.months_upfront)))}%)</p>
          <p>Upfront Cost is: ${this.state.cost}</p>
          <p>Cost of purchasing discounts (included in upfront cost) is ${this.state.cost_of_discounts*this.state.months_upfront}</p>
          <p>Upfront Savings ${this.state.cost_per_user*this.state.users_upfront*this.state.months_upfront - this.state.cost} ({100*(1-(this.state.cost/(this.state.cost_per_user*this.state.users_upfront*this.state.months_upfront)))}%)</p>
          <p>Plan is for {this.state.months_upfront} month(s)</p>
          <p>Cost per pre-paid user is ${this.state.cost_pre_paid_discounts}</p>
          <p>You save ${this.state.cost_per_user - this.state.cost_pre_paid_discounts} ({(1 - this.state.cost_pre_paid_discounts/this.state.cost_per_user)*100}%) per pre-paid user</p>
          <p>Plan includes {this.state.users_upfront} users at no additional cost</p>
          <p>Cost per additional user is ${this.state.cost_per_user_discounts} per month</p>
          <p>You save ${this.state.cost_per_user - this.state.cost_per_user_discounts} ({(1-this.state.cost_per_user_discounts/this.state.cost_per_user)*100}%) per additional user</p>
        </div>
        <div style={{float: 'right'}}>
          <h3>Cost Optimizer</h3>
          <form autoComplete="off" spellCheck="false">
            <FormInput
              className="login-field"
              ref="numberMonthsOptimizerInput"
              name="numberMonthsOptimizer"
              type="number"
              placeholder="Number of Months"
              onChange={this.handleMonthsOptimizer}
            />
            <FormInput
              className="login-field"
              ref="numberUserOptimizerInput"
              name="numberUserOptimizer"
              type="number"
              placeholder="Average Number of Users per Month"
              onChange={this.handleUsersOptimizer}
            />
            <FormInput
              className="login-field"
              ref="volatilityOptimizerInput"
              name="volatilityOptimizer"
              type="number"
              placeholder="Average number of Users in addition to / subtracted from average"
              onChange={this.handleVolatilityOptimizer}
            />
          </form>
          <p>{this.state.users_upfront} users upfront, {this.state.users_discount}%, {this.state.users_additional} additional users </p>
        </div>
      </div>
    )
  }
}
