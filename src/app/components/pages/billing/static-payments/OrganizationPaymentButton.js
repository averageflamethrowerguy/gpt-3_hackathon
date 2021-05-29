import React from 'react';

import './IndividualPaymentButton.css';
import Link from '../../../partials/Link'
import contextTypes from '../../../../contextTypes'

export default class OrganizationPaymentButton extends React.Component {
  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      url: "",
    }
  }

  handleURL = () => {
    let url = ""
    url = "/organization-checkout/" + this.props.planType
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
