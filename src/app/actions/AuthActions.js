import Auth from '@aws-amplify/auth'

export default function AuthActions() {

  this.registerAlt = (alt) => { // hack to provide the alt singleton to function-based action creators (necessitated by ES6 breaking class-based action creators in alt by mandating construction via 'new')
    this.alt = alt
    this.actions = alt.getActions(this.__proto__.constructor.__proto__.name)
  }

  const dataRelays = ['_updateUser', '_signOut']
  dataRelays.forEach(relayName => {
    this[relayName] = (relayObj) => relayObj
  })

  this.signUp = (email, password, attributes) => { // attributes are optional
    this.alt.dispatch(this, {email, password})
    return new Promise((resolve, reject) => {
      let credentials = {
        username: email,
        password: password
      }
      Auth.signUp(attributes ? Object.assign(credentials, {attributes: attributes}) : credentials)
      .then((newUser) => {
        this.actions._updateUser(newUser)
        return resolve(newUser)
      })
      .catch(reject)
    })
  }

  this.signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      Auth.signIn(email, password)
      .then((user) => {
        this.actions._updateUser(user)
        return resolve()
      })
      .catch(reject)
    })
  }

  this.confirmUser = (email, code) => {
    return new Promise((resolve, reject) => {
      Auth.confirmSignUp(email, code)
      .then((user) => {
        this.actions._updateUser(user)
        return resolve()
      })
      .catch(reject)
    })
  }

  this.signOut = () => {
    Auth.signOut()
    this.actions._signOut()
    document.cookie = "EMAIL= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "REFRESH= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    return
  }

  this.getUser = (refresh) => {
    return new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser({ bypassCache: refresh })
      .then((user) => {
        this.actions._updateUser(user)
        return resolve(user)
      })
      .catch((err) => {
        return reject(err)
      })
    })
  }


  this.updateUserAttributes = (attributes, user) => { // user is optional if absent the AuthStore's current user will be used
    return Auth.updateUserAttributes(user || this.alt.getStore('AuthStore').getState().user, attributes)
  }

  this.changePassword = (oldPassword, newPassword, user) => { // user is optional if absent the AuthStore's current user will be used
    return Auth.changePassword(user || this.alt.getStore('AuthStore').getState().user, oldPassword, newPassword)
  }

  this.forgotPassword = (email) => {
    return new Promise((resolve, reject) => {
      this.alt.getActions('ApiActions').query().get('/search-user-cognitoId/' + email).end((err, res) => {
        if (err || !res || !res.body || !res.body.cognitoId) {
          return reject({ message: 'No account exists with that email address'})
        }
        Auth.forgotPassword(email).then(resolve).catch(reject)
      })
    })
  }

  this.resetPassword = (email, code, newPassword) => {
    return Auth.forgotPasswordSubmit(email, code, newPassword)
  }
}
