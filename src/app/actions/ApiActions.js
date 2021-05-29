export default function ApiActions() {

  this.registerAlt = (alt) => {
    this.alt = alt
  }

  this.query = () => {
    if (!this.agent) { // this.agent, once instantiated persists across the app's lifespan does not need to be instantiated on the fly for each web request
      this.agent = require('superagent-use')(require('superagent'))
      this.agent.use((req) => { // middleware to set api url and id token header
        if (req.url[0] === '/') {
          req.url = this.alt.apiUrl + '/api' + req.url // that "this.alt" object is available to any class that's passed into Flux's addActions(...) method, which mutates the prototype (basically the class definition) to add methods at runtime. It's like reflection in Java, but js supports it out of the box
        }

        let { user } = this.alt.getStore('AuthStore').getState()

        if (user && user.signInUserSession && !req.header['authorization']) {        // if there is a user and the request is not set up to comm with dev server
          req.header['id-token'] = this.alt.getStore('AuthStore').getState().user.signInUserSession.idToken.jwtToken
        }

        // console.log(req.header['id-token'])

        return req
      })
    }
    return this.agent
  }

  // elsewhere we can use ApiActions.query('/quiz-questions') etc and it'll populate the api url prefix
}
