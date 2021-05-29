import React from 'react'
import Link from '../partials/Link'
import LeftBar from '../partials/LeftBar'
import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'
import './Events.css'
// END IMPORT SECTION

export default class Events extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
    // BEGIN STATE VARIABLES
    events: [],
    // END STATE VARIABLES
    }
  }

  loadEvents = (state) => {
    console.log(state)
    this.setState({events: state.events})
  }

  componentDidMount() {
    this.loadEvents(this.context.getStore('EventStore').getState())
    this.context.getStore('EventStore').listen(this.loadEvents)
  }

  componentWillUnmount()  {
    this.context.getStore('EventStore').unlisten(this.loadEvents)
  }

  // BEGIN ONCHANGE HANDLERS
  // END ONCHANGE HANDLERS

  // BEGIN RENDER METHODS
  getDateString = (startingDate, endingDate) => {
    let dateString = ''

    if (endingDate) {
      let startingMonth = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(startingDate)
      let endingMonth = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(endingDate)
      let startingString = `${startingMonth} ${startingDate.getDate()}`
      let endingString = `-${endingDate.getDate()}`
      if (startingMonth != endingMonth || startingDate.getFullYear() != endingDate.getFullYear()) {
        endingString = ` - ${endingMonth} ${endingDate.getDate()}`
      }
      if (startingDate.getYear() == endingDate.getYear()) {
        dateString = startingString + endingString + ', ' + startingDate.getFullYear()
      }
      else {
        dateString = startingString + ', ' + startingDate.getFullYear() + endingString + ', ' + endingDate.getFullYear()
      }
    }
    else {
      let month = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(startingDate)
      dateString = `${month} ${startingDate.getDate()}, ${startingDate.getFullYear()}`
    }

    return dateString
  }

  renderEvents = () => {
    let events = this.state.events.map(eventObj => {
      eventObj.dates.startingDate = new Date(eventObj.dates.startingDate)
      eventObj.dates.endingDate = eventObj.dates.endingDate && new Date(eventObj.dates.endingDate)
      return eventObj
    })
    events = events.sort((eventObj1, eventObj2) => {
      if (eventObj1.dates.startingDate.getTime() > eventObj2.dates.startingDate.getTime()) {
        return -1
      }
      if (eventObj1.dates.startingDate.getTime() < eventObj2.dates.startingDate.getTime()) {
        return 1
      }
      else {
        return 0
      }
    })
    let upcomingEvents = events.filter(eventObj => {
      return (eventObj.dates.startingDate.getTime() > Date.now() || (eventObj.dates.endingDate && eventObj.dates.endingDate.getTime() > Date.now()))
    })
    let passedEvents = events.filter(eventObj => {
      return (eventObj.dates.startingDate.getTime() <= Date.now() && (!eventObj.dates.endingDate || eventObj.dates.endingDate.getTime() <= Date.now()))
    })
    return (
      <div className='events-list' style={{width: '100%', minHeight: '100vh'}}>
        <header>
          <div className="container">
            <div className="head">
              <h1>Upcoming Events</h1>
              <h2>Join us for a workshop or hackathon in 2021!</h2>
            </div>
          </div>
          <div className="pink-dot"></div>
        </header>
        <section className="events-b">
          <div className="container">
            <div className="events">
              { upcomingEvents.map((eventObj, eventKey) => {
                console.log(eventObj)
                let dateString = this.getDateString(eventObj.dates.startingDate, eventObj.dates.endingDate)
                return (
                  <div className="event-ind">
                    <a href={eventObj.externalImageLink} target="_blank"><img src={eventObj.imageS3Link} /></a>
                    <div className='vertical-line-connection' style={eventKey >= upcomingEvents.length - 2 ? {height: 200} : {}}>
                      <div className='pink-dot-for-line' />
                    </div>
                    <div className="event-ind-text">
                      <h2>{eventObj.title}</h2>
                      <h3>{dateString}</h3>
                      <p className='event-description'>{eventObj.textDescription}</p>
                    </div>
                  </div>
                )
              }) }
            </div>
          </div>
        </section>
      </div>
    )
  }
  // END RENDER METHODS

  render() {
    return (
      <div style={{display: 'flex'}}>
        <LeftBar />
        {this.renderEvents()}
      </div>
    )
  }
}
