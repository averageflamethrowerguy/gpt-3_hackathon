import React, { Fragment } from 'react'

import contextTypes from '../../contextTypes'

import './DetailsDrawer.css'

export default class DetailsDrawer extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div className="details-drawer" style={{width: this.props.open ? 400 : 0}}>
        <span className='close-button' onClick={this.props.onClose}>X</span>
        {this.props.children}
      </div>
    )
  }
}
