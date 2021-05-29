import React from 'react'
import posed, { PoseGroup } from 'react-pose'
import Link from '../partials/Link'
import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'
import './QuantumNews.css'
import LeftBar from '../partials/LeftBar'
// END IMPORT SECTION

export default class QuantumNews extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
    // BEGIN STATE VARIABLES
    quantumNews: []
    // END STATE VARIABLES
    }
  }

  loadQuantumNews = (state) => {
    console.log(state)
    this.setState({quantumNews: state.quantumNews})
  }

  componentDidMount() {
    this.loadQuantumNews(this.context.getStore('QuantumNewsStore').getState())
    this.context.getStore('QuantumNewsStore').listen(this.loadQuantumNews)
  }

  componentWillUnmount() {
    this.context.getStore('QuantumNewsStore').unlisten(this.loadQuantumNews)
  }

  // BEGIN ONCHANGE HANDLERS

  // END ONCHANGE HANDLERS

  // BEGIN RENDER METHODS

  // END RENDER METHODS

  render() {
    return (
      <div className='quantum-news'>
        <div className='quantum-news-left-container'>
          <LeftBar />
        </div>
        <div className='quantum-news-meta-container'>
          <div className='events-list'>
            <header>
              <div className="container">
                <div className="head">
                  <h1>Quantum News</h1>
                  <h2>The most notable recent changes to the field of quantum computing!</h2>
                </div>
              </div>
              <div className="pink-dot"></div>
            </header>
            <div className='quantum-news-container'>
              <div className='news-grid'>
                {this.state.quantumNews.map((newsItem, index) => {
                  return (
                    <div key={index} className="event-ind" onDoubleClick={() => this.handleUpdateEditor(newsItem)}>
                      {newsItem.externalImageLink ? <a href={newsItem.externalImageLink} target="_blank"><img src={newsItem.imageS3Link} /></a> :
                                                    <img src={newsItem.imageS3Link} /> }
                      <div className="event-ind-text">
                        <h2>{newsItem.title}</h2>
                        <p>{newsItem.textDescription}</p>
                      </div>
                    </div>
                    )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
