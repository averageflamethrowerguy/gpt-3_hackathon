import React from 'react'
import Link from '../partials/Link'
import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'
import './TopBar.css'
import AccountInformation from './AccountInformation'
// END IMPORT SECTION

export default class TopBar extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
    // BEGIN STATE VARIABLES
    accountInfoVisible: false,
    // END STATE VARIABLES
    }
  }

  componentDidMount() {

  }

  // BEGIN ONCHANGE HANDLERS
  handleChangeAccountInfoVisible = () => {
    this.setState({accountInfoVisible: !this.state.accountInfoVisible})
  }

  handleSignOut = async () => {
    await this.context.getActions('AuthActions').signOut()
    this.setState({email: null})

    window.location.reload()
  }

  handleToggleAccountInfo = () => this.setState({accountInfoVisible: !this.state.accountInfoVisible})
  // END ONCHANGE HANDLERS

  // BEGIN RENDER METHODS

  // END RENDER METHODS

  render() {
    if (this.context.getStore('AuthStore').getState().user) {
      let username = this.context.getStore('AuthStore').getState().user.attributes.email
      return (
        <div className='navBar'>
          <div className="navigation-container">
            <Link href='/'>
              <div className='logoContainer'>
                <img src={logo} className='logo-small' />
                <h1 className='companyName'>qBraid</h1>
              </div>
            </Link>
            {
              username &&
              <div className='user-icon-container'>
                <div className='user-icon' title={username} onMouseEnter={this.handleChangeAccountInfoVisible}>
                  {username.slice(0, 1).toUpperCase()}
                </div>

                {this.state.accountInfoVisible &&
                  <AccountInformation reloadIfLoggedOut={false} handleToggleAccountInfo={this.handleToggleAccountInfo} logOutCallback={this.handleSignOut} />
                }
              </div>
            }
          </div>
        </div>
      )
    }
    else {
      return <div></div>
    }
  }
}
