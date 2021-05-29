import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../../partials/Link'

import contextTypes from '../../../contextTypes'
import logo from '../../../../assets/img/logo.png'

import './TermsConditionsPrivacyPolicy.css'

export default class CookiePolicy extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedWindow: this.props.selectedWindow,
    }
  }

  handleCloseOverlay = (e) => {
    e.preventDefault()
    this.context.getActions('OverlayActions')._close()
  }

  renderCookiePolicy = () => {
    return (
    <div>
      <h1>Cookie Policy for qBraid.com</h1>

      <p>This is the Cookie Policy for qBraid.com, accessible from https://qbraid.com</p>

      <p className="toc-header">What Are Cookies?</p>

      <p>As is common practice with almost all professional websites, qBraid.com uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we need to store these cookies. We will also share how you can prevent these cookies from being stored; however this may downgrade or 'break' certain elements of the site's functionality.</p>

      <p>For more general information on cookies, please read <a href="https://www.cookieconsent.com/what-are-cookies/">"What Are Cookies"</a>. Information regarding cookies from this Cookies Policy are from <a href="https://www.generateprivacypolicy.com/">the Privacy Policy Generator</a>.</p>

      <p className="toc-header">How We Use Cookies</p>

      <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>

      <p className="toc-header">Disabling Cookies</p>

      <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies. This Cookies Policy was created with the help of the <a href="https://www.cookiepolicygenerator.com/cookie-policy-generator/">Cookies Policy Generator from CookiePolicyGenerator.com</a>.</p>
      <p className="toc-header">The Cookies We Set</p>

      <p>This site offers e-commerce or payment facilities, and some cookies are essential to ensure that your order is remembered between pages so that we can process it properly.</p>

        {
        // <li>
        //     <h3>Site preferences cookies</h3>
        //     <p>In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</p>
        // </li>
      }

      <p className="toc-header">Third Party Cookies</p>

      <p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>

      <ul>

        <li>
            <p>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</p>
            <p>For more information on Google Analytics cookies, see the official Google Analytics page.</p>
        </li>

      </ul>

      <p className="toc-header">More Information</p>

      <p>If you are still looking for more information, then you can contact us through one of our preferred contact methods:</p>

      <a href='mailto:request@qbraid.com'>Email: request@qbraid.com</a>

      <p className="toc-btn" onClick={this.handleCloseOverlay}>Return to Main Page</p>
    </div> )
    }


  render() {
    return (
      <div style={{zIndex: 999}} className="terms-conditions-container">
        {this.renderCookiePolicy()}
      </div>
    );
  }
}
