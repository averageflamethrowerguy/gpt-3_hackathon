import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../partials/Link'

import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'

import './Login.css'

const FormInput = posed.input({
  default: { borderBottom: '2px solid #ffffff' },
  entering: { borderBottom: '2px solid #ff6400' },
  valid: { borderBottom: '2px solid #00ba00' }
})

export default class Login extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      email: '',
      emailStatus: 'default',
      password: '',
      passwordStatus: 'default',
      errorMessage: '',
      authenticating: false
    }
  }

  componentDidMount() {
    this.refs.emailInput.focus()
  }

  handleChangeEmail = (e) => {
    let email = e.target.value.trim().toLowerCase()
    let status = 'default'
    let emailStatus = email.length == 0 ? 'default' : (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email)) ? 'valid' : 'entering' // regex to validate email

    this.setState({ email: email, emailStatus: emailStatus })
  }

  handleChangePassword = (e) => {
    let password = e.target.value.trim()
    let passwordStatus = password.length == 0 ? 'default' : password.length < 8 ? 'entering' : 'valid'
    this.setState({ password: password, passwordStatus: passwordStatus })
  }

  handleLogin = (e) => {
    e.preventDefault()
    let emailInput = this.refs.emailInput,
        email = emailInput.value.trim().toLowerCase(),
        passwordInput = this.refs.passwordInput,
        password = passwordInput.value

    if (!email || this.state.emailStatus == 'entering') {
      return emailInput.focus()
    }
    if (!password || this.state.passwordStatus == 'entering') {
      return passwordInput.focus()
    }

    this.setState({ authenticating: true })

    this.context.getActions('AuthActions').signIn(email, password)
    .then(() => this.context.getActions('NavigationActions').navigate('/'))
    .catch(() => this.setState({ errorMessage: 'Incorrect email or password', authenticating: false }))
  }

  render() {
    return (
      <div className="login">
        <div className="login-form">
          <img className="logo" src={logo} alt="qbraid logo"/>
          <div className="logo-text">Sign in to qBraid</div>
          <form autoComplete="off" spellCheck="false">
            <FormInput
              className="login-field"
              ref="emailInput"
              name="email"
              type="text"
              placeholder="Email"
              pose={this.state.emailStatus}
              onChange={this.handleChangeEmail}
            />
            <FormInput
              className="login-field"
              ref="passwordInput"
              name="password"
              type="password"
              placeholder="Password"
              pose={this.state.passwordStatus}
              onChange={this.handleChangePassword}
            />
            <Link href="/forgot-password"><p className="forgot-password-link">Forgot</p></Link>
            <input
              className="login-submit"
              type="submit"
              value={this.state.authenticating ? 'Logging in...' : 'Log in'}
              onClick={this.handleLogin}
            />
          </form>
          {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}
          <p className="sign-up-link">
            <span>New to qBraid? </span>
            <Link href="/join"><span className="sign-up-link-text">Create an account</span></Link>
          </p>
        </div>
      </div>
    )
  }
}
