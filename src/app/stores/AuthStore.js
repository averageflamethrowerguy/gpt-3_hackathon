export default function AuthStore() {

  this.state = {}

  this.handleUpdateUser = (user) => {
    this.setState({
      isAuthenticated: true,
      user: user
    })

    let refreshToken = this.alt.getStore('AuthStore').getState().user.signInUserSession.refreshToken.token
    let now = new Date()
    let oneHour = now.setHours(now.getHours() + 1)
    let oneWeek = now.setHours(now.getHours() + 168)

    document.cookie = "EMAIL=" + user.attributes.email + ";expires=" + oneWeek + ";domain=.qbraid.com;path=/;SameSite=Lax"
    document.cookie = "REFRESH=" + refreshToken + ";expires=" + oneWeek + ";domain=.qbraid.com;path=/;SameSite=Lax"
    // console.log(document.cookie)
  }

  this.handleSignOut = () => {
    this.setState({
      isAuthenticated: false,
      user: null
    })
  }

  const {_updateUser, _signOut} = this.alt.getActions('AuthActions')
  this.bindListeners({
    handleUpdateUser: _updateUser,
    handleSignOut: _signOut
  })
}
