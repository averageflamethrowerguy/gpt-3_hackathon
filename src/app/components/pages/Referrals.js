import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../partials/Link'

import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'

import './Referrals.css'

export default class Ambassadors extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  signOut = () => this.context.getActions('AuthActions').signOut()

  render() {
    return (
      <div>
        <p>Our Referrals Program</p>
        <p></p>
      </div>
    )
  }
}
