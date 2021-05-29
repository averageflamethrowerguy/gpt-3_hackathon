import React from 'react'

import contextTypes from './contextTypes'

import Link from './components/partials/Link'
import Login from './components/pages/Login'
import Overlay from './components/partials/Overlay'
import logo from '../assets/img/logo.png'
import './App.css'

class App extends React.Component {

  static childContextTypes = contextTypes

  getChildContext() {
    const {app} = this.props
    return {
      getActions: app.getActions.bind(app),
      getStore: app.getStore.bind(app),
      router: app.router,
    }
  }

  constructor(props, context) {
    super(props, context)
    const navState = props.app.getStore('NavigationStore').getState()
    const authState = props.app.getStore('AuthStore').getState()
    const overlayState = props.app.getStore('OverlayStore').getState()
    this.state = {
      loaded: false,

      // nav
      navigationError: navState.navigationError,
      url: navState.url,
      params: navState.params,
      component: navState.component || props.component,
      requiresAuth: navState.requiresAuth,

      //auth
      isAuthenticated: authState.isAuthenticated,

      // overlay
      overlay: overlayState.open && overlayState.foreground,
      overlayBackgroundStyle: overlayState.overlayBackgroundStyle,
      onOverlayBackgroundClick: overlayState.onBackgroundClick,
    }
  }

  componentDidMount() {
    this.syncTitle()
    this.load()

    this.props.app.getStore('NavigationStore').listen(this.handleNavigate)
    this.props.app.getStore('AuthStore').listen(this.handleUpdateAuth)
    this.props.app.getStore('OverlayStore').listen(this.handleUpdateOverlay)

    let nav = this.props.app.getActions('NavigationActions')
    window.onpopstate = (event) => nav.navigate(window.location.pathname)

    // auto sign in
    this.props.app.getActions('AuthActions').getUser()
  }

  componentWillUnmount() {
    this.props.app.getStore('NavigationStore').unlisten(this.handleNavigate)
    this.props.app.getStore('AuthStore').unlisten(this.handleUpdateAuth)
    this.props.app.getStore('OverlayStore').unlisten(this.handleUpdateOverlay)
  }

  load = () => this.setState({ loaded: true })

  handleNavigate = (state) => {
    if (state.navigationError) {
      this.setState({
        navigationError: state.navigationError
      })
    } else {
      this.setState({
        navigationError: null,
        url: state.url,
        params: state.params,
        component: state.component,
        requiresAuth: state.requiresAuth
      })
      window.history.pushState(null, '', state.url)
      document.title = state.title || 'qBraid Account'
    }
  }

  handleUpdateAuth = (state) => {
    this.setState({ isAuthenticated: state.isAuthenticated })
  }

  handleSignOut = (state) => {
    this.props.app.getActions('AuthActions').signOut()
  }

  handleUpdateOverlay = (state) => {
    this.setState({
      overlay: state.open && state.foreground,
      overlayBackgroundStyle: state.backgroundStyle,
      onOverlayBackgroundClick: state.onBackgroundClick
    })
  }

  syncTitle = () => {
    document.title = this.props.app.getStore('NavigationStore').getState().title || 'qBraid Admin'
  }

  render() {
    if (this.state.navigationError) {
      return (
        <div>
          <p>Encountered an error:</p>
          <p>{this.state.navigationError}</p>
          <br></br>
          <p>Please let us know if this error persists</p>
        </div>
      )
    }

    if (this.state.requiresAuth && !this.state.isAuthenticated) { // if current route requires user to be authenticated and user isn't, show Login instead of route component
      return (
        <div style={{ opacity: this.state.loaded ? 1 : 0, transition: 'opacity .25s ease-in'}}>
          <Login />
        </div>
      )
    }

    const Page = this.state.component
    let user = this.props.app.getStore('AuthStore').getState().user
    let username = null
    if (user) {
      username = user.attributes.email
    }
    return (
      <div>
        <div style={{ opacity: this.state.loaded ? 1 : 0, transition: 'opacity .25s ease-in'}}>
          {this.state.overlay && <Overlay backgroundStyle={this.state.overlayBackgroundStyle} onBackgroundClick={this.state.onOverlayBackgroundClick}>{this.state.overlay}</Overlay>}

            <Page params={this.state.params} />
        </div>
      </div>
    )
  }
}

export default App
