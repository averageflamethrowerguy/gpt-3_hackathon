import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../partials/Link'
import LeftBar from '../partials/LeftBar'
import chemApp from '../../../assets/img/chem-app.png'

import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'

import './NewHome.css'

import helloquantum from '../../../assets/img/helloquantum.png'
import comingSoon from '../../../assets/img/coming-soon.png'

export default class NewHome extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      email: '',
    }
  }

  componentDidMount() {
    setTimeout(this.getEmail, 50)
  }

  signOut = () => this.context.getActions('AuthActions').signOut()

  getEmail = () => {
    this.context.getActions("AuthActions").getUser(true)
    .then((user) => {
      if (user) {
        this.setState({email: user.attributes.email})
      }
    })
  }

  navigateIfResearchEnabled = () => {
    this.context.getActions('ApiActions').get('/')
  }

  renderLaunchOptions = () => {
    return (
      <div className="main-content">
        <p className='welcomeMessage'>Welcome, {this.state.email}</p>
        <div className='servicesPanel'>
          <div className='service'>
            <h2 style={{minHeight: 20, fontSize: 20}}>qBook</h2>
            <div className='horizontalSeparator'></div>
            <p style={{padding: 0, margin: 0, marginBottom: 20, minHeight: 60, fontSize: 12}}>A custom-designed platform for students new to quantum to learn using our QuBes tutorials.</p>
            <div className='qbook-buttons-container'>
              <Link href='https://qbook.qbraid.com/learn/'><span className='servicesButton'>Study</span></Link>
              <Link href='https://qbook.qbraid.com/write-tutorials'>
                <span className='servicesButton' title='Host your own course content on qBook with our tutorial builder!'>Write</span>
              </Link>
            </div>
          </div>
          <div className='service'>
            <h2 style={{minHeight: 20, fontSize: 20}}>Learn</h2>
            <div className='horizontalSeparator'></div>
            <p style={{padding: 0, margin: 0, marginBottom: 20, minHeight: 60, fontSize: 12}}>Our Jupyter-based platform for studying quantum computing and writing quantum projects.</p>
            <Link href='https://learn.qbraid.com'><span className='servicesButton'>Launch</span></Link>
          </div>
          <div className='service'>
            <h2 style={{minHeight: 20, fontSize: 20}}>Research</h2>
            <div className='horizontalSeparator'></div>
            <p style={{padding: 0, margin: 0, marginBottom: 20, minHeight: 60, fontSize: 12}}>Our Jupyter-based platform for quantum computing researchers.</p>
            <Link href='/research'><span onClick={this.navigateIfResearchEnabled} className='servicesButton'>Join</span></Link>
          </div>
          { /* }<div className='service'>
            <h2 style={{minHeight: 40, fontSize: 20}}>Training & Consultation</h2>
            <div className='horizontalSeparator'></div>
            <p style={{padding: 0, margin: 0, marginBottom: 20, minHeight: 60, fontSize: 12}}>Reach out to us if you or your company wishes state-of-the-art training in quantum computing.</p>
            <Link href='https://qbraid.com/training.html'><span className='servicesButton'>Inquire</span></Link>
          </div> */ }
        </div>
      </div>
    )
  }

  renderAdditionalFeatures = () => {
    return (
      <div className='features-meta-container'>
        <div className='features-title-container'>
          <p className='features-title'>Standalone Apps</p>
        </div>
        <div className='features-container'>
          <div className='feature'>
            <img className='coming-soon' src={comingSoon} />
            <p className='feature-title'>Chemistry App</p>
            <div className='feature-image-container'>
              <img src={chemApp} className='chem-app-image' />
            </div>
            <p className='feature-description'>The Chemistry App is designed for simulating quantum chemical systems.
            You can run classical chemistry simulations or the quantum equivalent, and the chemistry app will create code that you
            can add to your own algorithms.</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='home'>
        <LeftBar />
        <div className='homeMainContainer'>
          {this.renderLaunchOptions()}
          {this.renderAdditionalFeatures()}
        </div>
      </div>
    )
  }
}
