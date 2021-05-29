import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../partials/Link'
import LeftBar from '../partials/LeftBar'

import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'

import './Ambassadors.css'

export default class Ambassadors extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      name: '',
      email: '',
      qBraidExperience: '',
      quantumExperience: '',
      errorMessage: '',
      successMessage: '',
    }
  }

  handleChangeName = (e) => this.setState({name: e.target.value.trim()})

  handleChangeEmail = (e) => this.setState({email: e.target.value.trim()})

  handleChangeQBraidExperience = (e) => this.setState({qBraidExperience: e.target.value.trim()})

  handleChangeQuantumExperience = (e) => this.setState({quantumExperience: e.target.value.trim()})

  sendAmbassadorEmail = () => {
    this.context.getActions('ApiActions').query().post('/request-ambassador').send({
      name: this.state.name,
      email: this.state.email,
      qBraidExperience: this.state.qBraidExperience,
      quantumExperience: this.state.quantumExperience
    })
    .end((err, res) => {
      if (err) {
        console.log(err)
        this.setState({errorMessage: 'Failed to send your ambassadors program request'})
      }
      else {
        this.setState({successMessage: 'Success! You should be hearing back from us soon.'})
      }
    })
  }

  signOut = () => this.context.getActions('AuthActions').signOut()

  render() {
    return (
      <div className='ambassadors'>
        <LeftBar />
        <div className="ambassadors-container">
          <div className="ambassadors-text-container">
            <h1 style={{marginTop: 0}}>Our Ambassador Program</h1>
            <p>qBraid ambassadors are a group of talented individuals who have used qBraid learning or research tools and loved them so much they want to help other
            members of the qBraid community. They often respond to questions about quantum computing and qBraid products on the qBraid Discord server.</p>
            <p>Our ambassadors get access to some of qBraid's latest tutorials and tools before the rest of our users. If you are interested in helping qBraid build the
            best and most useful products for learning and researching quantum computing, the Ambassadors Program may be the right place for you!</p>

            <h1>Become an Ambassador</h1>
            <p>If you love qBraid's products and want to help the rest of our community, you should join our Ambassadors Program. We generally ask that you have spent a little
            bit of time using qBraid learning or research tools (for instance, learned basic quantum computing using the QuBes tutorial). You should also expect to spend a little bit
            of time each week on the qBraid Discord server answering any questions our community may have.</p>
          </div>

          <div className='formContainer'>
            <input type='text' onChange={this.handleChangeName} placeholder='Your Name' />
            <input type='text' onChange={this.handleChangeEmail} placeholder='Your Email' />
            <textarea onChange={this.handleChangeQBraidExperience} placeholder='Describe Your Experience With qBraid' />
            <textarea onChange={this.handleChangeQuantumExperience} placeholder='Describe Your Experience With Quantum Computing' />
            <div className='submitButton' onClick={this.sendAmbassadorEmail}><h1>Submit</h1></div>
            {this.state.errorMessage && <p className='errorMessage'>{this.state.errorMessage}</p>}
            {this.state.successMessage && <p className='successMessage'>{this.state.successMessage}</p>}
          </div>
        </div>
      </div>
    )
  }
}
