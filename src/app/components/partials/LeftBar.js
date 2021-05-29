import React from 'react'
import Link from '../partials/Link'
import contextTypes from '../../contextTypes'
import logo from '../../../assets/img/logo.png'
import './LeftBar.css'
// END IMPORT SECTION

export default class LeftBar extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
    // BEGIN STATE VARIABLES
    eventNames: []
    // END STATE VARIABLES
    }
  }

  componentDidMount() {
    setTimeout(() => this.loadEventNames(), 5)
  }

  // BEGIN ONCHANGE HANDLERS
  loadEventNames = () => {
    this.context.getActions('EventActions').getEvents()
    .then(([events, err]) => {
      if (err) {
        console.log(err)
      }
      else {
        this.setState({eventNames: events.map(eventObj => {
          eventObj.dates.startingDate = new Date(eventObj.dates.startingDate)
          eventObj.dates.endingDate = new Date(eventObj.dates.endingDate)
          return eventObj
        }).filter(eventObj => {
          return eventObj.dates.startingDate.getTime() > Date.now()
        }).sort((eventObj1, eventObj2) => {
          if (eventObj1.dates.startingDate.getTime() > eventObj2.dates.startingDate.getTime()) {
            return -1
          }
          else if (eventObj1.dates.startingDate.getTime() < eventObj2.dates.startingDate.getTime()) {
            return 1
          }
          else {
            return 0
          }
        }).map(eventObj => eventObj.title)})
      }
    })
  }
  // END ONCHANGE HANDLERS

  // BEGIN RENDER METHODS

  // END RENDER METHODS

  render() {
    return (
      <div className='homeSidebar'>
        <div className='navTabContainer'>
          <Link href='/management'><div className='navTab'>                          { /* we will want to split the two pages -- right now it redirects to the same place */ }
            <div className='navTabColor' style={{backgroundColor: '#E60B74'}}></div>
            <h2>Profile</h2>
          </div></Link>
          { /* }<Link href='/user-management'><div className='navTab'>
            <div className='navTabColor' style={{backgroundColor: '#6D33FF'}}></div>
            <h2>Billing</h2>
          </div></Link> */ }
        </div>
        <Link href='/events'>
          <div className='myEvents'>
            <h1>UPCOMING EVENTS</h1>
            {
              this.state.eventNames.slice(0, 3).map((eventName, eventKey) => {
                return (
                  <div key={eventKey} className='myEventsEvent'>
                    <div className='upcoming-event-flexbox'>
                      <div className='upcoming-event-bullet'>•</div>
                      <div>{eventName}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </Link>
        <p className='colorChangeTitleSegment'>Pages</p>
        <Link href='/home'>
          <div className='platformItem'>
            <div className='platformColorBar'></div>
            <span>Home & Tools</span>
          </div>
        </Link>
        {
          // <Link href='/standalone-apps'>
          //   <div className='platformItem'>
          //     <div className='platformColorBar'></div>
          //     <span>Standalone Apps</span>
          //   </div>
          // </Link>
        }
        <Link href='/articles'>
          <div className='platformItem'>
            <div className='platformColorBar'></div>
            <span>Blog Posts & Articles</span>
          </div>
        </Link>
        <Link href='/quantum-news'>
          <div className='platformItem'>
            <div className='platformColorBar'></div>
            <span>Quantum News</span>
          </div>
        </Link>
        <div className='navTabContainer containernotop'>
          <Link href='/ambassadors'><div className='navTab'>
            <div className='navTabColor' style={{backgroundColor: '#E60B74'}}></div>
            <h2>Ambassadors Program</h2>
          </div></Link>
        { /*  <Link href='/referrals'><div className='navTab'>
            <div className='navTabColor' style={{backgroundColor: '#6D33FF'}}></div>
            <span>Referral Program</span>
          </div></Link>  */ }
        </div>
      </div>
    )
  }
}
