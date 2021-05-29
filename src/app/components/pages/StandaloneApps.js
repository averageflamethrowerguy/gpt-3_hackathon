import React from 'react'
import Link from '../partials/Link'
import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'
import './StandaloneApps.css'
import chemApp from '../../../assets/img/chem-app.png'
import comingSoon from '../../../assets/img/coming-soon.png'
import LeftBar from '../partials/LeftBar'

// END IMPORT SECTION

export default class StandaloneApps extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
    // BEGIN STATE VARIABLES

    // END STATE VARIABLES
    }
  }

  componentDidMount() {

  }

  // BEGIN ONCHANGE HANDLERS

  // END ONCHANGE HANDLERS

  // BEGIN RENDER METHODS

  // END RENDER METHODS

  render() {
    return (
      <div className='home'>
        <LeftBar />
        <div className='homeMainContainer'>
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
        </div>
      </div>
    )
  }
}
