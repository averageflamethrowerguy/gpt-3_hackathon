import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../partials/Link'
import LeftBar from '../partials/LeftBar'

import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'

import './Research.css'

export default class Research extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      name: '',
      email: '',
      affiliation: '',
      bio: '',
      interest: '',
      errorMessage: '',
      successMessage: '',
    }
  }

  navigateIfResearchEnabled = () => {
    this.context.getActions('ApiActions').query().get(`/spawner-profiles/research/${this.context.getStore('AuthStore').getState().user.attributes.email}`)
    .end((err, res) => {
      if (err) {
        console.log(err)
      }
      else if (res.body && res.body.length > 0) {
        window.location.href = 'https://research.qbraid.com'
      }
    })
  }

  componentDidMount = () => {
    setTimeout(() => this.navigateIfResearchEnabled(), 5)
  }

  handleChangeName = (e) => this.setState({name: e.target.value.trim()})

  handleChangeEmail = (e) => this.setState({email: e.target.value.trim()})

  handleChangeAffiliation = (e) => this.setState({affiliation: e.target.value.trim()})

  handleChangeBio = (e) => this.setState({bio: e.target.value.trim()})

  handleChangeInterest = (e) => this.setState({interest: e.target.value.trim()})

  sendAmbassadorEmail = () => {
    this.context.getActions('ApiActions').query().post('/request-access').send({
      name: this.state.name,
      email: this.state.email,
      affiliation: this.state.affiliation,
      bio: this.state.bio,
      interest: this.state.interest,
    })
    .end((err, res) => {
      if (err) {
        console.log(err)
        this.setState({errorMessage: 'Failed to send your request for access to the research platform'})
      }
      else {
        this.setState({successMessage: 'Success! You should be hearing back from us soon.'})
      }
    })
  }

  signOut = () => this.context.getActions('AuthActions').signOut()

  render() {
    return (
      <div className='research'>
        <LeftBar />
        <div className="research-container">
          <div className="research-text-container">
            <h1 style={{marginTop: 0}}>Our Research Platform</h1>
            <p>qBraid Research is a platform designed to accelerate the work of professional quantum researchers and developers. We offer access to managed environments focused
            around state-of-the-art quantum computing packages, so that you can spend more time on your work and less time on debugging packages.</p>
            <h1>Upcoming Tools</h1>
            <p>qBraid Research will offer a number of additional features to enable quantum workflows. We will offer tools like a transpiler to translate between quantum packages,
            and a chem app to provide code snippets for quantum chemistry applications.</p>
          </div>

          <div className='formContainer'>
            <input type='text' onChange={this.handleChangeName} placeholder='Your Name' />
            <input type='text' onChange={this.handleChangeEmail} placeholder='Your Email' />
            <input type='text' onChange={this.handleChangeAffiliation} placeholder='School or business affiliation' />
            <textarea onChange={this.handleChangeBio} placeholder='Describe your experience with quantum computing' />
            <textarea onChange={this.handleChangeInterest} placeholder='What would you use the Research platform for?' />
            <div className='submitButton' onClick={this.sendAmbassadorEmail}><h1>Submit</h1></div>
            {this.state.errorMessage && <p className='errorMessage'>{this.state.errorMessage}</p>}
            {this.state.successMessage && <p className='successMessage'>{this.state.successMessage}</p>}
          </div>
        </div>
      </div>
    )
  }
}
