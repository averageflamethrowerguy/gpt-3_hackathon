import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../../partials/Link'

import contextTypes from '../../../contextTypes'
import logo from '../../../../assets/img/logo.png'

import './TermsConditionsPrivacyPolicy.css'
import TermsConditionsPrivacyPolicy from './TermsConditionsPrivacyPolicyWebsite'

export default class TermsConditions extends React.Component {

  render() {
    return (<TermsConditionsPrivacyPolicy selectedWindow='terms-conditions' />)
  }

}
