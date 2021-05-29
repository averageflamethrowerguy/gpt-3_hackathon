import React, { Fragment } from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../partials/Link'

import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'

import './login/Login.css'

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
      stage: 'email', // 'email' or 'reset'
      email: '',
      emailStatus: 'default',
      code: '',
      codeStatus: '',
      password: '',
      passwordStatus: '',
      successMessage: '',
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

  handleChangeCode = (e) => {
    let code = e.target.value.trim()
    let codeStatus = code.length == 0 ? 'default' : code.length < 6 ? 'entering' : 'valid'
    this.setState({ code: code, codeStatus: codeStatus })
  }

  handleChangePassword = (e) => {
    let password = e.target.value.trim();
    let requiredCharacters = ["@","_","!","%","$","^","&","*","~","-","+","="];
    let requiredNumbers = ["1","2","3","4","5","6","7","8","9","0"];
    let validForCharacters = false;
    let validForNumbers = false;
    let validForCaps = false;
    let passwordMessage = ''
    if (requiredCharacters.some(v => password.includes(v))) {
    // There's at least one
      validForCharacters = true
    }
    if (requiredNumbers.some(v => password.includes(v))) {
    // There's at least one
      validForNumbers = true
    }
    if (password.toLowerCase() != password) {
      validForCaps = true
    }
    if (password && password.length < 8) {
      passwordMessage = 'Password must contain at least 8 characters'
    } else if (password && !validForCharacters) {
      passwordMessage = 'Password must include a special character'
    } else if (password && !validForNumbers) {
      passwordMessage = 'Password must include a number'
    } else if (password && !validForCaps) {
      passwordMessage = 'Password must include an upper-case letter'
    }
    let passwordStatus = password.length == 0 ? 'default' : (password.length < 8 || !validForCharacters || !validForNumbers || !validForCaps) ? 'entering' : 'valid';

    this.setState({ password, passwordStatus, passwordMessage })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.stage == 'email') {
      let emailInput = this.refs.emailInput,
          email = emailInput.value.trim().toLowerCase()

      if (!email || this.state.emailStatus == 'entering') {
        return emailInput.focus()
      }

      this.setState({ authenticating: true })

      this.context.getActions('AuthActions').forgotPassword(email)
      .then(data => {
        this.setState({
          successMessage: '',
          errorMessage: '',
          authenticating: false,
          stage: 'reset'
        })
        this._cachedEmail = email
        // this.context.getActions('NavigationActions').navigate('/reset-password')
      })
      .catch(err => {
        this.setState({
          successMessage: '',
          errorMessage: err.message || 'Unable to reset password at this time',
          authenticating: false
        })
      })
    } else if (this.state.stage = 'reset') {
      let codeInput = this.refs.codeInput,
          code = codeInput.value.trim(),
          passwordInput = this.refs.passwordInput,
          password = passwordInput.value

      if (!code || this.state.codeStatus == 'entering') {
        return codeInput.focus()
      }
      if (!password || this.state.passwordStatus == 'entering') {
        return passwordInput.focus()
      }

      this.setState({ authenticating: true })

      this.context.getActions('AuthActions').resetPassword(this._cachedEmail, code, password)
      .then(() => {
        this.setState({
          successMessage: 'Your password has been reset. Redirecting to login...',
          errorMessage: '',
          authenticating: false
        })
        setTimeout(() => this.context.getActions('NavigationActions').navigate('/'), 2000)
      })
      .catch(() => this.setState({
        successMessage: '',
        errorMessage: 'Unable to reset your password at this time',
        authenticating: false
      }))
    }
  }

  render() {
    return (
      <div className="login">
        <div className="login-form">
          <img className="logo" src={logo} alt="qbraid logo"/>
          <div className="logo-text">Reset your password</div>
          <p>{this.state.stage == 'email' ? 'Enter the email address you signed up with' : this.state.stage == 'reset' ? 'Check your email for a code, and enter it along with your new password below' : ''}</p>
          <form autoComplete="off" spellCheck="false">
            {this.state.stage == 'email' && <FormInput
              className="login-field"
              ref="emailInput"
              name="email"
              type="text"
              placeholder="Email"
              pose={this.state.emailStatus}
              onChange={this.handleChangeEmail}
            />}
            {this.state.stage == 'reset' && <Fragment>
              <FormInput
                className="login-field"
                ref="codeInput"
                name="code"
                type="text"
                placeholder="Verification code"
                pose={this.state.codeStatus}
                onChange={this.handleChangeCode}
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
              <p className="password-invalid" style={{position: 'absolute', marginTop: -10, width: '100%', textAlign: 'center', fontSize: 13}}>{this.state.passwordMessage}</p>
            </Fragment>}
            <input
              className="login-submit"
              type="submit"
              value={this.state.authenticating ? 'Submitting...' : 'Submit'}
              onClick={this.handleSubmit}
            />
          </form>
          {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}
          {this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}
        </div>
      </div>
    )
  }
}
