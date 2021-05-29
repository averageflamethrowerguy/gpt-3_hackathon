import React from 'react'
import posed, { PoseGroup } from 'react-pose'
import Link from '../partials/Link'
import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'
import './MainPage.css'


import regexCache from '../gtp3-utility-caches/regex-cache'
// END IMPORT SECTION


export default class MainPage extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
    // BEGIN STATE VARIABLES

      mode: 'regex',
      modeOptions: new Map([
        ['standard', {modeFunction: null, prompt: '', seed: ''}],
        ['regex', {modeFunction: this.handleRegexFunction, prompt: regexCache.prompt, seed: regexCache.seed}]
      ]),
      tokens: 100,
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

  handleChangeMode = (mode) => this.setState({mode})

  handleStandardSubmit = () => {
    let { tokens, machineName, input, modeOptions, mode } = this.state

    if (!input && !(modeOptions.get(mode) && modeOptions.get(mode).seed)) {
      console.log('Must specify an input')
      return
    }

    if (modeOptions.get(mode)) {
      if (modeOptions.get(mode).seed) {
        input = modeOptions.get(mode).seed + input
      }
    }

    this.setState({loading: true})

    this.context.getActions('GPTActions').handleSubmit({
      tokens,
      input,
      machineName: machineName || 'davinci',
    }).then((response) => {
      console.log(response)
      this.setState({output: response})

      this.state.modeOptions.get(this.state.mode).modeFunction && this.state.modeOptions.get(this.state.mode).modeFunction(response)
    })
    .catch(err => console.log(err))
    .finally(() => this.setState({loading: false}))
  }

  handleRegexFunction = (response) => {

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
                  <div className={`input-mode-choice ${modeName == this.state.mode && 'input-mode-selected'}`} onClick={modeFunction} key={modeIndex}>
                    {modeName}
                  </div>
                )
              })
            }
          </div>

          <div className='input-wrapper'>
            <p className='input-title'>Write prompt here</p>
            <textarea onChange={this.handleChangeInput}
                      className='input-area'
                      defaultValue={this.state.modeOptions.get(this.state.mode).prompt} />
            <div className='input-run-button' onClick={this.handleStandardSubmit}>
              Run this query
            </div>
          </div>
        </div>

        {
          this.loading ?
            this.renderLoadingSpinner()
          :
          this.state.output ?
            <div className='output-container'>
              <div className='raw-output-container'>
                <p className='raw-output-title'>Raw Output</p>
                <div className='raw-output'>
                  {
                    this.state.output.choices[0].text.split('\n').map((line, lineNumber) => {
                      return <div className='output-line' key={lineNumber}>{line}</div>
                    })
                  }
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
