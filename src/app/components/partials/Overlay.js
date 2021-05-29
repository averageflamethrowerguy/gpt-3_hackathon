import React, { Component } from "react";

import './Overlay.css';

export default class Overlay extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.setState({style: {opacity: 1, transition: 'all 0.25s ease-in'}})
    if (this.refs.emailInput) {
      this.refs.emailInput.focus()
    }
  }

  render() {
    return (
      <div>
        <div className="overlay-background" style={this.props.backgroundStyle} onClick={this.props.onBackgroundClick}></div>
        {this.props.children}
      </div>
    )
  }
}
