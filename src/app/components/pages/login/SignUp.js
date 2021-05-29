import React from 'react';
import posed, { PoseGroup } from 'react-pose';

import Link from '../../partials/Link'

import './SignUp.css'
import contextTypes from '../../../contextTypes';
import logo from '../../../../assets/img/logo.png';

import TermsConditionsPrivacyPolicyWebsite from '../terms-conditions/TermsConditionsPrivacyPolicyWebsite.js'
import CookiePolicy from '../terms-conditions/CookiePolicy.js'


let input = window.location.href.split('?')
let initialKey = ''
let link = "/"
if (input[1] && (input[1].includes('localhost') || input[1].includes('qbook'))) {
  link = input[1]
}
console.log("LINK IS : " + link)
let keyStatus = "default"


export default class SignUp extends React.Component {

  static contextTypes = contextTypes;

  constructor(props, context) {
    super(props, context);
    this.state = {
      status: 'default',

      email: '',
      emailStatus: 'default',

      password: '',
      passwordStatus: 'default',
      passwordMessage: '8-characters: 1 number and 1 special character',

      passwordConfirmed: false,
      passwordConfirmStatus: 'default',

      key: '',
      keyStatus: keyStatus,

      confirmKey: '',
      confirmKeyStatus: 'default',

      errorMessage: '',

      accessKeyEnabled: false,

      style: {
        opacity: 0,
        transition: 'all 0.25s ease-in',
        height: '100vh',
        background: 'linear-gradient(120deg, #470871 10%, #d70380 100%)',
        zIndex: 0,
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        left: 0,
        top: 0,
      },

      link: '',
      initialKey: '',

      legalAgree: false,
      creating: false,
    }
  }

  findLinks = () => {
    if (input[1] == 'exec') {
      initialKey = 'exec-workshop-2020'
      link = "/executive-checkout/" + input[2]
    }
    if (input[1]  == 'existing-key') {
      initialKey = input[2]
    }
    this.setState({link, initialKey})
  }

  handleLegalAgree = () => {
    let agree = (this.state.legalAgree == false ? true : false)
    this.setState({legalAgree: agree})
  }

  handleAddKey = () => {
    let accessKeyEnabled = (this.state.accessKeyEnabled == false ? true : false)
    this.setState({accessKeyEnabled})
  }

  navigate = (email) => {
    let newLink = '/'
    if (this.state.link != '/') {
      newLink = this.state.link + '&' + email
    }
    newLink = newLink.replaceAll('--', '/')
    if (newLink.includes('http')) {
      window.location.href = newLink
    }
    else {
      this.context.getActions("NavigationActions").navigate(newLink)
      .catch((err) => console.log(err))
    }
  }

  navigateIfAuthenticated = () => {
    this.context.getActions("AuthActions").getUser(true)
    .then((user) => {
      if (user) {
        this.navigate(user.attributes.email)
      }
    })
  }

  componentDidMount() {
    let style = Object.assign({}, this.state.style)
    style.opacity = 1
    this.setState({ style })
    this.findLinks()
    this.navigateIfAuthenticated()
    this.refs.emailInput.focus();
  }

  handleCreate = (e) => {
    e.preventDefault();
    let emailInput = this.refs.emailInput,
        email = emailInput.value.trim().toLowerCase(),
        passwordInput = this.refs.passwordInput,
        password = passwordInput.value,
        passwordConfirmInput = this.refs.passwordConfirmInput,
        keyInput = this.refs.keyInput;
    let key = this.state.key;

    if (key == '') {
      key = this.state.initialKey
    }

    if (key != 'exec-workshop-2020' && this.state.accessKeyEnabled == 'true') {
      key = keyInput.value.trim()
    }

    if (!email || this.state.emailStatus == 'entering') {
      return emailInput.focus();
    }
    else if (!password || this.state.passwordStatus == 'entering') {
      return passwordInput.focus();
    }
    else if (this.state.passwordConfirmStatus == 'default' || this.state.passwordConfirmStatus == 'entering') {
      return passwordConfirmInput.focus();
    }

    else if (this.state.legalAgree == false) {
      this.setState({errorMessage: 'You must agree to the qBraid Terms and Conditions and Privacy Policy'})
      return
    }

    if (key != '') {

      this.context.getActions('UserActions').searchAccessKeys(key)
      .then(([cognitoKeyVal, errorMessage]) => {
        if (errorMessage) {
          this.setState({errorMessage: errorMessage})
          return keyInput.focus
        }
        else {
          this.setState({creating: true})
          this.context.getActions("AuthActions").signUp(email, password, {'custom:accessKey': cognitoKeyVal})
          .then(() => {
            this.navigate(this.context.getStore('AuthStore').getState().user.attributes.email)
          })
          .catch((err) => this.setState({errorMessage: err.message}))
        }
      })
    } else {
      this.context.getActions("AuthActions").signUp(email, password)
      .then(() => this.context.getActions('NavigationActions').navigate('/'))
      .catch((err) => this.setState({errorMessage: err.message}))
    }
  }

  handleEmail = (e) => {
    var email = e.target.value.trim().toLowerCase();
    var status = 'default';
    var emailStatus = email.length == 0 ? 'default' : (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email)) ? 'valid' : 'entering'; // regex to validate email

    this.setState({email: email, emailStatus: emailStatus, status: status})
  }

  handlePassword = (e) => {
    var password = e.target.value.trim();
    var status = 'default';
    var requiredCharacters = ["@","_","!","%","$","^","&","*","~","-","+","="];
    var requiredNumbers = ["1","2","3","4","5","6","7","8","9","0"];
    var validForCharacters = false;
    var validForNumbers = false;
    var validForCaps = false;
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
    if (password && !validForCharacters) {
      this.state.passwordMessage = "Include one special character (@,_,!,%,$,^,&,*,~,-,+,=)"
    }
    else if (password && !validForNumbers) {
      this.state.passwordMessage = "Include one number"
    }
    else if (password && password.length < 8) {
      this.state.passwordMessage = "Password must include at least eight characters"
    }
    else if (password && !validForCaps) {
      this.state.passwordMessage = "Password must contain an upper-case letter"
    }
    else if (password) {
      this.state.passwordMessage = "Password is valid"
    }
    else {
      this.state.passwordMessage = "8-characters: 1 number, 1 special character, 1 upper-case letter"
    }
    var passwordStatus = password.length == 0 ? 'default' : (password.length < 8 || !validForCharacters || !validForNumbers || !validForCaps) ? 'entering' : 'valid';

    this.setState({password: password, passwordStatus: passwordStatus, status: status})
  }

  handleConfirmPassword = (e) => {
    var confirmPassword = e.target.value.trim();
    var status = 'default';
    var passwordConfirmed = confirmPassword == this.state.password ? true : false;
    var passwordConfirmStatus = confirmPassword.length == 0 ? 'default' :  (confirmPassword.length > 0 && passwordConfirmed == true) ? 'valid' : 'entering';

    this.setState({passwordConfirmed: passwordConfirmed, passwordConfirmStatus: passwordConfirmStatus})
  }

  handleKey = (e) => {
    var key = e.target.value.trim();
    var status = 'default';
    var keyStatus = key.length == 0 ? 'default' : key.length < 4 ? 'entering' : 'valid';

    this.setState({key: key, keyStatus: keyStatus, status: status})
  }

  activateTermsOfService = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderTermsOfServicePopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  activatePrivacyPolicy = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderPrivacyPolicyPopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  activateCookiePolicy = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderCookiePolicyPopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  renderTermsOfServicePopup = () => {
    return (
      <div>
        <TermsConditionsPrivacyPolicyWebsite selectedWindow='terms-conditions' />
      </div>
    )
  }

  renderPrivacyPolicyPopup = () => {
    return (
      <div>
        <TermsConditionsPrivacyPolicyWebsite selectedWindow='privacy-policy' />
      </div>
    )
  }

  renderCookiePolicyPopup = () => {
    return (
      <div>
        <CookiePolicy />
      </div>
    )
  }

  render() {
      return (
        <div>
          <div style={this.state.style}>
          </div>
          <div className="spacer"></div>
          <LoginBox pose={this.state.status} className='createPortal'>
            <img className='logo' src={logo} alt="qbraid logo"/>
            <div className='logoText'>
              <h1>Create your qBraid account</h1>
            </div>
            <form className='loginForm' autoComplete="off" spellCheck="false">
              <InputBox pose={this.state.emailStatus} className='loginField' onChange={this.handleEmail} ref="emailInput" name="email" type="text" placeholder="Email"/>
              <p className={this.state.passwordStatus != 'valid' ? 'passwordMessageInvalid' : 'passwordMessageValid'}>{this.state.passwordMessage}</p>
              <InputBox pose={this.state.passwordStatus} className='loginField' onChange={this.handlePassword} ref="passwordInput" name="password" type="password" placeholder="Password"/>
              <InputBox pose={this.state.passwordConfirmStatus} className='loginField' onChange={this.handleConfirmPassword} ref="passwordConfirmInput" name="confirm-password" type="password" placeholder="Confirm Password"/>
              <div style={{margin: 20, fontSize: 14}}>
                <input type="checkbox" className='toc-checkbox' onClick={this.handleAddKey} />
                <span className="toc-text">I want to add an access key</span>
              </div>
              {this.state.accessKeyEnabled == true ? <InputBox pose={this.state.keyStatus} className='loginField' onChange={this.handleKey} ref="keyInput" name="key" type="key" placeholder="Access Key (blank for exec)"/> : <p></p>}
              <div style={{margin: 10, fontSize: 14}}>
                <input type="checkbox"  className='toc-checkbox'onClick={this.handleLegalAgree} />
                <span className="toc-text">I have read and agree to qBraid's <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={this.activateTermsOfService}>Terms and Conditions</span>, <span style={{textDecoration: 'underline', cursor: 'pointer'}}
                onClick={this.activatePrivacyPolicy}>Privacy Policy</span> and <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={this.activateCookiePolicy}>Cookie Policy</span></span>
              </div>
              <p className={this.state.errorMessage == "Valid Access Key" ? 'successMessage' : 'errorMessage'}>{this.state.errorMessage}</p>
              {this.state.creating ? <span className='createSubmit' style={{marginBottom: 50}}>Creating</span> : <input className='createSubmit' style={{marginBottom: 20}} type="submit" value="Create Account" onClick={this.handleCreate}/>}
              {this.state.initialKey != 'exec-workshop-2020' &&
              <div>
                <p style={{fontSize: 14, marginBottom: 10}}>Already signed up?</p>
                <Link href={link}><input className='createSubmit' style={{margin: '0 auto 20px auto'}} type="submit" value="Log in" onClick={(e) => e.preventDefault()} /></Link>
              </div>}
            </form>
          </LoginBox>
        </div>
      );
  }
}

const LoginBox = posed.div({
  // default: {backgroundColor: '#341548'},
  default: {backgroundColor: '#320852'},
  error: {
    backgroundColor: '#BF0A30',
    applyAtEnd: { x: 0 },
    applyAtStart: { x: 10 },
    x: 0,
    transition: {
      x: {
        type: "spring",
        stiffness: 1000,
        damping: 10,
      }
    }
  },
});

const InputBox = posed.input({
  default: {
    borderBottom: '2px solid #ffffff',
  },
  entering: {
    borderBottom: '2px solid #ff6400',
  },
  valid: {
    borderBottom: '2px solid #00ba00',
  },
});
