import React from 'react'
import posed, { PoseGroup } from 'react-pose'
import Link from '../partials/Link'
import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'
import './MainPage.css'
// END IMPORT SECTION

export default class MainPage extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
    // BEGIN STATE VARIABLES

      mode: 'standard',
      modeOptions: new Map([
        ['standard', {modeFunction: this.handleStandardSubmit}]
      ]),
      tokens: 20,
      // davichi is the most powerful
      machineName: '',

      input: '',
      output: '',

      loading: false,

    // END STATE VARIABLES
    }
  }

  componentDidMount() {

  }

  // BEGIN ONCHANGE HANDLERS
  handleChangeInput = (e) => this.setState({input: e.target.value})

  handleStandardSubmit = () => {
    let { tokens, machineName, input } = this.state

    if (!input) {
      console.log('Must specify an input')
      return
    }

    this.setState({loading: true})

    this.context.getActions('GPTActions').handleStandardSubmit({
      tokens,
      input,
      machineName: machineName || 'davichi',
    }).then((response) => {
      console.log(response)
      this.setState({output: response})
    })
    .catch(err => console.log(err))
    .finally(() => this.setState({loading: false}))
  }
  // END ONCHANGE HANDLERS

  // BEGIN RENDER METHODS
  renderLoadingSpinner = () => (
    <div class='index-foreground-container'>
      <div class='index-loading-spinner-container'>
        <div class='index-qbraid-spinner'></div>
        <p class='index-loading-spinner-label'>Loading...</p>
      </div>
    </div>
  )
  // END RENDER METHODS

  render() {
    return (
      <div className='container-flexbox'>
        <div className='input-container'>
          <div className='input-mode-choice-list'>
            {
              [...this.state.modeOptions].map(([modeName, {modeFunction}], modeIndex) => {
                return (
                  <div className='input-mode-choice' onClick={modeFunction} key={modeIndex}>
                    {modeName}
                  </div>
                )
              })
            }
          </div>

          <div className='input-wrapper'>
            <p className='input-title'>Write prompt here</p>
            <textarea onChange={this.handleChangeInput} className='input-area' />
            <div className='input-run-button' onClick={this.state.modeOptions.get(this.state.mode).modeFunction}>
              Run this query
            </div>
          </div>
        </div>

        {
          this.loading ?
            this.renderLoadingSpinner()
          :
          this.output ?
            <div className='output-container'>
              <div className='raw-output-container'>
                <p className='raw-output-title'>Raw Output</p>
                <div className='raw-output'>
                  { JSON.stringify(this.state.output) }
                </div>
              </div>
            </div>
            :
            <div className='output-placeholder'>
              Enter an input to get a response
            </div>
        }

      </div>
    )
  }
}
