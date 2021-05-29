import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../../../partials/Link'

import contextTypes from '../../../../contextTypes'
import logo from '../../../../../assets/img/logo.png'

import './ExecWorkshop.css'

export default class NotificationPopup extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      formResponseMessage: '',
      name: '',
      email: '',
      affiliation: ''
    }
  }

  handleChangeName = (e) => {
    let name = e.target.value.trim().toLowerCase()
    this.setState({name})
  }

  handleChangeEmail =  (e) => {
    let email = e.target.value.trim().toLowerCase()
    this.setState({email})
  }

  handleChangeAffiliation =  (e) => {
    let affiliation = e.target.value.trim().toLowerCase()
    this.setState({affiliation})
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      console.log(this.state.name)
      if (this.state.name == "") {
        this.setState({formResponseMessage: 'Please fill out all three fields'})
        return this._nameInput.focus()
      } else if (this.state.email == "") {
        this.setState({formResponseMessage: 'Please fill out all three fields'})
        return this._emailInput.focus()
      } else if (this.state.affiliation == "") {
        this.setState({formResponseMessage: 'Please fill out all three fields'})
        return this._affiliationInput.focus()
      }

      var emailStatus = this.state.email.length == 0 ? 'default' : (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(this.state.email)) ? 'valid' : 'entering'; // regex to validate email
      if (emailStatus == 'entering') {
        this.setState({formResponseMessage: 'This does not look like a valid email'})
        return this._emailInput.focus()
      }

      await this.context.getActions("ApiActions").query().post(`/workshop-reservation`).send({ name: this.state.name, email: this.state.email, affiliation: this.state.affiliation })
      this.context.getActions('OverlayActions')._close()
    }
    catch (err) {
      this.setState({formResponseMessage: "Error adding you to our mailing list. Please try again later."})
    }
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.context.getActions('OverlayActions')._close()
  }

  render () {
    return (
      <div className="notification-form-container" style={{zIndex: 999}}>
        <p style={{textAlign: 'center'}}>Subscribe for Executive Workshop Notifications</p>
        <form>
          <div style={{display: "flex", flexDirection: "column", margin: "20px 40px 30px 40px"}}>

            <p>If you're interested in updates about the qBraid executive workshop, please subscribe below.</p>

            <label for="name" style={{color: 989898, textAlign: "left"}}>Name</label>
            <input class="reservation-input" ref={(input) => this._nameInput = input} style={{borderRadius: 7}} name="nameInput" type="text" capitalize="off" tabIndex="1" onChange={this.handleChangeName}/>
            <label for="email" style={{color: 989898, textAlign: "left"}}>Email</label>
            <input class="reservation-input" ref={(input) => this._emailInput = input} style={{borderRadius: 7}} name="emailInput" type="text" capitalize="off" tabIndex="1" onChange={this.handleChangeEmail}/>
            <label for="affiliation" style={{color: 989898, textAlign: "left"}}>Company or Organization</label>
            <input class="reservation-input" ref={(input) => this._affiliationInput = input} style={{borderRadius: 7}} name="affiliationInput" type="text" capitalize="off" tabIndex="1" onChange={this.handleChangeAffiliation}/>

            <p style={{textAlign: 'center', color: 'red'}}>{this.state.formResponseMessage}</p>

            <p className="notification-btn-small" style={{marginTop: 10}} onClick={this.handleSubmit}>Submit</p>
            <hr></hr>
            <p className="notification-btn-small" style={{marginTop: 20}} onClick={this.handleCancel}>Cancel</p>

          </div>
        </form>
      </div>
    )
  }
}
