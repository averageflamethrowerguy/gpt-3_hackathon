import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../../partials/Link'

import contextTypes from '../../../contextTypes'
import logo from '../../../../assets/img/logo.png'
import axios from 'axios'

import './Cancellation.css'

export default class TermsConditionsPrivacyPolicy extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      errorMessage: '',
    }
  }

  handleCancel = async event => {
    event.preventDefault()

    var email = this.props.email

    try {
      const cancellation = await this.context.getActions('ApiActions').query().post("/stripe/individual-cancel").send({
        email
      })
      this.handleCloseOverlay()
    }
    catch (err) {
      console.log(err.response.data.err)
      this.setState({errorMessage: err.response.data.err})
    }

  }

  handleCloseOverlay = (e) => {
    e.preventDefault()
    this.context.getActions('OverlayActions')._close()
  }

  renderCurrentFormPage = () => {
    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <p>Are you sure you wish to cancel your qBraid subscription?</p>
          <p>We would be very sad to see you go!</p>

          <p>
            <span className="toc-btn" style={{margin: 20}} onClick={this.handleCancel}>Cancel Subscription</span>
            <span className="toc-btn" style={{margin: 20}} onClick={this.handleCloseOverlay}>Return to Main Page</span>
          </p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div style={{zIndex: 999}} className="terms-conditions-container">
        {this.renderCurrentFormPage()}
        {<p style={{color: 'red', textAlign: 'center'}}>{this.state.errorMessage}</p>}
      </div>
    );
  }

}
