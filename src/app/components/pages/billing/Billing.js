import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../../partials/Link'

import contextTypes from '../../../contextTypes'
import logo from '../../../../assets/img/logo.png'

import './Billing.css'

export default class Billing extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      purchaseType: 'tutorials',
      buyer: 'industry'
    }
  }

  signOut = () => this.context.getActions('AuthActions').signOut()

  render() {
    return (
      <div className="billing">
        <div className="billing-form">
          <img className="logo" src={logo} alt="qbraid logo"/>
          <div className="logo-text">qBraid Billing</div>
          {// <Link href="/tutorial-subscription" style={{textDecoration: 'none'}}><p className="login-link" style={{marginTop: 30}}>Access Tutorials</p></Link>
          // <Link href="/research-subscription" style={{textDecoration: 'none'}}><p className="login-link" style={{marginTop: 30}}>Unlock Research Account</p></Link>
        }
          <Link href="/executive-workshop" style={{textDecoration: 'none'}}><p className="login-link" style={{marginTop: 30}}>Sign up for our Executive Workshop</p></Link>
           {// <Link href="/individual-subscription" style={{textDecoration: 'none'}}><p className="login-link" style={{marginTop: 30}}>Create an individual qBraid Subscription</p></Link>
          // <Link href="/organization-subscription" style={{textDecoration: 'none'}}><p className="login-link" style={{marginTop: 30}}>Create a multi-user qBraid subscription</p></Link>
        }
          <p className="login-link" style={{width: 130, backgroundColor: '#6d6d6d', color: 'white', fontWeight: 500}} onClick={this.signOut}>Logout</p>
        </div>
      </div>
    )
  }
}
