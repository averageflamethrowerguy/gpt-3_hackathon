import React from 'react';

import '../PaymentButton.css';
import Link from '../../../partials/Link'
import contextTypes from '../../../../contextTypes'

export default class PaymentButton extends React.Component {
  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      url: "",
    }
  }

  handleURL = () => {
    let url = ""
    url = "/executive-checkout/" + this.props.cost + "&" + "1" + "&" + this.props.planType + "&" + "exec" + "&" + this.props.product + "&" + this.props.eventualCost + "&" + this.props.discountCode
    this.setState({url: url})
  }

  render() {
    return (
      <div>
        <Link href={this.state.url}
       onClick={this.handleURL} style={{textDecoration: 'none', textAlign: 'center'}}><p className="button">Select</p></Link>
      </div>
    )
  }
}
