import React from 'react'
import contextTypes from './contextTypes'
import './PageError.css'
// END IMPORT SECTION

export default class PageError extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
    // BEGIN STATE VARIABLES
      errorExpanded: false
    // END STATE VARIABLES
    }
  }

  // BEGIN ONCHANGE HANDLERS
  handleExpandError = () => {
    let { errorExpanded } = this.state
    errorExpanded = !errorExpanded

    let foundSheet
    for (let sheet of document.styleSheets) {
      if (sheet.title == 'top-dom-styles') {
        foundSheet = sheet
        break
      }
    }

    if (foundSheet) {
      // removes the rule(s) that affect the error message
      for (let ruleIndex in foundSheet.rules) {
        if (foundSheet.rules[ruleIndex] && foundSheet.rules[ruleIndex].selectorText == 'body > iframe') {
          foundSheet.deleteRule(ruleIndex)
        }
      }

      if (errorExpanded) {
        foundSheet.insertRule(`
          body > iframe {
            max-width: 625px;
            max-height: calc(95% - 370px);
            top: 380px !important;
            left: calc(50% - 312.5px) !important;
          }
        `, 0)
      }
      else {
        foundSheet.insertRule(`
          body > iframe {
            display: none;
          }
        `, 0)
      }
    }

    this.setState({errorExpanded})
  }
  // END ONCHANGE HANDLERS

  // BEGIN RENDER METHODS

  // END RENDER METHODS

  render() {
    return (
      <div>
        <div className='page-error noselect'>
          <p className='page-error-title'>Ouch. Our quantum state just collapsed.</p>
          <p className='page-error-apology'>We're sorry about that.</p>
          <ul className='page-error-actions'>
            <li className='page-error-action'>Try reloading the page</li>
            <li className='page-error-action'>Check your internet connection</li>
            <li className='page-error-action'>Make sure you think this page or tutorial exists</li>
          </ul>
          <p className='page-error-email'>If the error persists, feel free to <a className='page-error-email-link' href='mailto:elliotpotter@qbraid.com'>email us</a> and we'll do our best to help you out.</p>
          <p className='page-error-details-request'>Please copy the below section to help us debug the problem.</p>
        </div>
        {
          !this.state.errorExpanded ?
            <div className='page-error-details-header' onClick={this.handleExpandError}>
              <div className='page-error-details-title'>
                Error Details
              </div>
              <div className='page-error-expand-button'>
                &#8964;
              </div>
            </div>
          :
            <div className='page-error-expanded'>
              <div className='page-error-details-header'  onClick={this.handleExpandError}>
                <div className='page-error-details-title'>
                  Error Details
                </div>
                <div className='page-error-contract-button'>
                  ^
                </div>
              </div>
            </div>
        }
      </div>
    )
  }
}
