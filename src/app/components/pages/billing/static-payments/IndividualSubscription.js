import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../../../partials/Link'

import contextTypes from '../../../../contextTypes'
import logo from '../../../../../assets/img/logo.png'

import './IndividualSubscription.css'
import IndividualPayment from './IndividualPayment';

import planCosts from '../../PlanCosts'

const qubes = { tier: 'qubes', cost: planCosts.qubes.cost, academicDiscount: planCosts.qubes.discount * 100 + '%' }
const quint = { tier: 'quint', cost: planCosts.quint.cost, academicDiscount: planCosts.quint.discount * 100 + '%' }
const qupro = { tier: 'qupro', cost: planCosts.qupro.cost, academicDiscount: planCosts.qupro.discount * 100 + '%' }
const research = { tier: 'research', cost: planCosts.research.cost, academicDiscount: planCosts.research.discount * 100 + '%' }

export default class IndividualSubscription extends React.Component {

  static contextTypes = contextTypes


  signOut = () => this.context.getActions('AuthActions').signOut()

  activateNotificationPopup = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderNotificationPopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <nav>
          <a href="https://qbraid.com">
            <span>
              <img className="logo-image" src={logo}/>
              <p className="logo-text" style={{fontSize: '25px'}}>qBraid</p>
            </span>
          </a>

          {// <a style={{float: 'right'}} href="http://account.qbraid.com" className="sign-in-button">Sign in</a>
          }
        </nav>

        <div id="main-content">
          <header>
            <h1 style={{color: '#333'}}>Choose your qBraid tools</h1>
          </header>
          <p style={{color: '#333'}}>Or click <a href="https://qbraid.com/platform.html">here</a> for more information about our platform</p>
        </div>
        <div style={{display: 'inlineGrid', gridTemplateColumns: '1fr 1fr 1fr 1fr'}}>
          <section className="plan-column">
            <IndividualPayment planType="QuBes"
            product="Individual-Subscription" features={qubes}/>
          </section>

          <section className="plan-column">
            <IndividualPayment planType="QuInt"
            product="Individual-Subscription" features={quint}/>
          </section>

          {// <section className="plan-column">
          //   <IndividualPayment planType="QuPro"
          //   product="Individual-Subscription" features={qupro}/>
          // </section>
        }

          <section className="plan-column">
            <IndividualPayment planType="Research"
            product="Individual-Subscription" features={research}/>
          </section>
        </div>

      </div>
    );
  }
}
