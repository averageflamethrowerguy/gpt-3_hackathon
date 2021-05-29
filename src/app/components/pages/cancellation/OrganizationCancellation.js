import React from 'react'
import posed, { PoseGroup } from 'react-pose'
import Link from '../../partials/Link'
import contextTypes from '../../../contextTypes'
import logo from '../../../../assets/img/logo.png'
import './OrganizationCancellation.css'
// END IMPORT SECTION

export default class OrganizationCancellation extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
    // BEGIN STATE VARIABLES
    successMessage: '',
    failureMessage: ''
    // END STATE VARIABLES
    }
  }

  componentDidMount() {

  }

  // BEGIN ONCHANGE HANDLERS
  handleCloseOverlay = () => {
    this.context.getActions('OverlayActions')._close()
  }

  handleDeleteOrganization = () => {
    this.setState({successMessage: '', failureMessage: ''})
    this.context.getActions('ApiActions').query().post('/cancel-organization-payplan')
    .send({organizationId: this.props.organization._id, email: this.context.getStore('AuthStore').getState().user.attributes.email})
    .end((err, res) => {
      if (err) {
        console.log(err)
        this.setState({successMessage: '', failureMessage: `Could not cancel your organization's billing plan`})
      }
      else {
        this.setState({successMessage: 'Successfully cancelled billing', failureMessage: ''})
        setTimeout(this.handleCloseOverlay, 2000)
      }
    })
  }
  // END ONCHANGE HANDLERS

  // BEGIN RENDER METHODS

  // END RENDER METHODS

  render() {
    return (
      <div className='organization-deletion'>
        <p className='delete-organization-title'>Stop billing your organization?</p>
        <p>If you halt your organization's billing, all your users will lose access to any additional resources or tutorials they were able to access from this organization.</p>
        <div className='buttons-container'>
          <span className='delete-btn' onClick={this.handleDeleteOrganization}>Stop Billing</span>
          <span className='cancel-btn' onClick={this.handleCloseOverlay}>Cancel</span>
        </div>
        {this.state.successMessage && <p className='success-message'>{this.state.successMessage}</p>}
        {this.state.failureMessage && <p className='failure-message'>{this.state.failureMessage}</p>}
      </div>
    )
  }
}
