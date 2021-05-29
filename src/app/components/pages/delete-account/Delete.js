import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../../partials/Link'

import contextTypes from '../../../contextTypes'
import logo from '../../../../assets/img/logo.png'

import './Delete.css'

export default class Delete extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      successMessage: '',
      failureMessage: '',
    }
  }

  handleCloseOverlay = (e) => {
    e.preventDefault()
    this.context.getActions('OverlayActions')._close()
  }

  handleDeleteAccount = async event => {
    event.preventDefault()
    this.context.getActions('ApiActions').query().post("/stripe/individual-cancel").send({         // delete any recurring payment the user may have
      email: this.props.email
    }).end((err, res) => {          // if we fail, we fail silently (because not all users may have active billing)
      this.context.getActions("ApiActions").query().post(`/user/delete`)
      .send({ email: this.props.email, accessToken: this.context.getStore('AuthStore').getState().user.signInUserSession.accessToken.jwtToken })
      .end((err, res) => {
        if (err) {
          console.log(err)
          this.setState({successMessage: '', failureMessage: 'Failed to delete your account'})
        }
        else {
          this.setState({successMessage: 'Your account has been successfully deleted', failureMessage: ''})
          setTimeout(() => {
            this.context.getActions('OverlayActions')._close()
            this.context.getActions('NavigationActions').navigate('/')                                         // navigates to the '/' route, which will log out the user
          }, 3000)
        }
      })
    })
  }

  render() {
    return (
      <div style={{zIndex: 999}} className="terms-conditions-container">
        <p style={{textAlign: 'center'}}>Are you sure you want to delete your account?</p>
        <p>We will delete or anonymize all personal information associated with your account. You are free to create another account, but this one will be
        unrecoverable. Please note that any and all information stored within your personal filesystem on our platform will remain, and will be recoverable
        using an account with the same email address unless you make special arrangements with us for its deletion.</p>
        <p>We will also delete any organizations that you own.</p>

        <p className='toc-btn' onClick={this.handleDeleteAccount}>Yes, delete my account</p>
        {<p className='success-message' style={{textAlign: 'center'}}>{this.state.successMessage}</p>}
        {<p className='failure-message' style={{textAlign: 'center'}}>{this.state.failureMessage}</p>}
        <p className="toc-btn" onClick={this.handleCloseOverlay}>Return to Main Page</p>
      </div>
    );
  }
}
