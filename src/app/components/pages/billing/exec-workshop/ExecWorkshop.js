import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../../../partials/Link'

import contextTypes from '../../../../contextTypes'
import logo from '../../../../../assets/img/logo.png'

import './ExecWorkshop.css'
import ExecPayment from './ExecPayment';

import NotificationPopup from './NotificationPopup'

const basicFeatures = { number_learn_users: 10, number_research_users: 0, number_consultation_hrs: 0 }
const fullFeatures = { number_learn_users: 10, number_research_users: 2, number_consultation_hrs: 1 }
const ultimateFeatures = { number_learn_users: 10, number_research_users: 5, number_consultation_hrs: 3}

export default class ExecWorkshop extends React.Component {

  static contextTypes = contextTypes


  signOut = () => this.context.getActions('AuthActions').signOut()

  activateNotificationPopup = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderNotificationPopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  renderNotificationPopup = () => {
    return (
      <div>
        <NotificationPopup />
      </div>
    )
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <nav>
          {// <a style={{float: 'right'}} href="http://account.qbraid.com" className="sign-in-button">Sign in</a>
          }
        </nav>

        <div id="main-content">
          <header>
            <h1 style={{color: '#333'}}>Select your qBraid Executive Workshop plan</h1>
          </header>
          <p style={{color: '#333'}}>Or click <a href="https://qbraid.com/executive-workshop.html">here</a> for more information about the workshop</p>
        </div>
        <div id="main-content">
          <section className="plan-column">
            <ExecPayment planType="Basic" eventualCost={1000} reserveCost={300}
            product="Executive-Workshop" features={basicFeatures}/>
          </section>

          <section className="plan-column">
            <ExecPayment planType="Pro" eventualCost={3000} reserveCost={300}
            product="Executive-Workshop" features={fullFeatures}/>
          </section>

          <section className="plan-column">
            <ExecPayment planType="Ultimate" eventualCost={5000} reserveCost={300}
            product="Executive-Workshop" features={ultimateFeatures}/>
          </section>
        </div>

        <div className="notification-btn-container">
          <p>Don't want to sign up now, but still interested in the workshop?</p>
          <p className="notification-btn" onClick={this.activateNotificationPopup}>Receive Notifications</p>
        </div>

      </div>
    );
  }
}
