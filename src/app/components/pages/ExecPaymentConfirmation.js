import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../partials/Link'

import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'

import './login/Login.css'

export default class ExecHomePage extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    const input = this.context.getStore('NavigationStore').getState().params.order.split("&");

    this.state = {
      researchEnabled: input[0],
      numberResearchUsers: input[1],
      numberLearnUsers: input[2],
      researchAccessKey: input[3],
      learnAccessKey: input[4],
    }
  }

  renderResearchEnabled = () => {
    if (this.state.researchEnabled == "false") {
      return(<div></div>)
    }
    else {
      return (<div>A research access key has been activated on this account. <a href="https://research.qbraid.com">Access Research Platform</a></div> )
    }
  }

  renderAccessKeys = () => {
    var researchMessage = ""
    if (parseInt(this.state.numberResearchUsers) > 0) {
      researchMessage = "Your research access key is " + this.state.researchAccessKey + ". It has " + this.state.numberResearchUsers + " user(s) remaining."
    }
    return (<div>Your learn access key is {this.state.learnAccessKey}. It has {this.state.numberLearnUsers} user(s) remaining. {researchMessage} </div>)
  }

  renderResearchLink = () => {
    var researchLink = ""
    if (parseInt(this.state.numberResearchUsers) > 0) {
      researchLink = "Signup for a research account can be done from this link: https://account/qbraid.com/join?existing-key?" + this.state.researchAccessKey
    }
    return researchLink
  }


  signOut = () => this.context.getActions('AuthActions').signOut()

  render() {
    return (
      <div className="login">
        <p>Thank you for signing up for our executive workshop!</p>
        {this.renderResearchEnabled()}
        {this.renderAccessKeys()}
        <p>The workshop is from Oct 19-23 Monday, Wednesday and Friday. Times TBD</p>
        <p>Other people should sign up for learn accounts at qBraid using this link: {"https://account.qbraid.com/join?existing-key?" + this.state.learnAccessKey}</p>
        <p>{this.renderResearchLink()}</p>
        <Link href="https://learn.qbraid.com" className="login-link">Explore qBraid Platform</Link>
      </div>
    )
  }
}
