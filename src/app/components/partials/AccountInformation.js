import React from 'react'
import Link from '../partials/Link'
import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'
import './AccountInformation.css'
// END IMPORT SECTION

export default class AccountInformation extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
    // BEGIN STATE VARIABLES

    // END STATE VARIABLES
    }
  }


  render() {
    let email = ''
    if (this.context.getStore('AuthStore').getState().user) {
      email = this.context.getStore('AuthStore').getState().user.attributes.email
    }
    return (
      <div className='account-information-bridge' onMouseLeave={this.props.handleToggleAccountInfo}>
        <div className='account-information-popup'>
          <div className='account-icon'>
            <div className='account-icon-letter'>
              {email && email.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className='account-email'>{email}</div>
          <Link href='/management'>
            <div className='account-profile-link'>My Profile</div>
          </Link>
          <div className='account-navigation-links'>
            <a className='account-navigation-link' href='https://qbook.qbraid.com'>qBook</a>
            <a className='account-navigation-link' href='https://learn.qbraid.com'>Learn</a>
          </div>
          <div className='account-information-sign-out' onClick={() => {
            console.log('SIGNING OUT')
            this.context.getActions('AuthActions').signOut()
            this.props.logOutCallback && this.props.logOutCallback()
            this.props.reloadIfLoggedOut && window.location.reload(true)
          }}>Sign Out</div>
        </div>
      </div>
    )
  }
}
