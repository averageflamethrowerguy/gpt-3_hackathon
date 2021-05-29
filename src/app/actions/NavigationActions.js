export default function NavigationActions() {

  this.registerAlt = (alt) => { // hack to provide the alt singleton to function-based action creators (necessitated by ES6 breaking class-based action creators in alt by mandating construction via 'new')
    this.alt = alt
    this.actions = alt.getActions(this.__proto__.constructor.__proto__.name)
  }

  const dataRelays = [
    'navigateSuccess',
    'navigateFailure',
  ]

  dataRelays.forEach(relayName => {
    this[relayName] = (relayObj) => relayObj
  })

  this.navigate = (url) => {

    const navigateToRoute = (route, resolve, reject, redirected) => {
      var config = route.config
      let navSuccessPayload = {
        url: route.url,
        params: route.params,
        title: config.title,
        component: config.component,
        requiresAuth: config.requiresAuth
      }
      if (config.actions) {
        return this.alt
        .getActions(config.actions)
        .load(route.params)
        .then((result) => {
          if (result) {
            if (result.redirectPath) {
              route = this.alt.router.getRoute(result.redirectPath)
              if(!route) {
                return reject('404')
              }
              return navigateToRoute(route, resolve, reject, true)
            }

            if (redirected) {
              window.history.pushState(null, '', route.url)
            }

            if (result.title) {
              navSuccessPayload.title = result.title
            }
          }
          this.actions.navigateSuccess(navSuccessPayload)
          return resolve()
        })
        .catch((err) => {
          this.actions.navigateFailure(err)
          return resolve()
        })
      } else {
        if (redirected) {
          window.history.pushState(null, '', route.url)
        }
        this.actions.navigateSuccess(navSuccessPayload)
        return resolve()
      }
    }

    return new Promise((resolve, reject) => {
      var route = this.alt.router.getRoute(url)

      if (!route) {
        return reject('404')
      }

      while (route.config.redirectPath) {
        url = route.config.redirectPath
        route = this.alt.router.getRoute(url)
        if(!route) {
          return reject('404')
        }
      }

      return navigateToRoute(route, resolve, reject)
    })
  }
}
