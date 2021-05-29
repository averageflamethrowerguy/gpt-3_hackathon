export default function NavigationStore() {

  this.state = {}

  this.handleSuccess = ({url, params, title, component, requiresAuth}) => {
    this.setState({
      navigationError: null,
      url: url,
      params: params,
      title: title,
      component: component,
      requiresAuth: requiresAuth
    })
  }

  this.handleFailure = (error) => {
    this.setState({
      navigationError: error
    })
  }

  const {navigateSuccess, navigateFailure} = this.alt.getActions('NavigationActions')
  this.bindListeners({
    handleSuccess: navigateSuccess,
    handleFailure: navigateFailure
  })
}
