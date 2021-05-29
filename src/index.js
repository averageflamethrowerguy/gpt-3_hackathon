import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '@aws-amplify/auth';

import Flux from './app/Flux';
import App from './app/App';

import './index.css';

Auth.configure({
  region: 'us-east-1',
  userPoolId: 'us-east-1_7hq9OmpnT',
  userPoolWebClientId: '70fo00fpob1sd133m98k7b0jan',
  authenticationFlowType: 'USER_SRP_AUTH'
})

// init Flux
const flux = new Flux({apiUrl: 'https://api.qbraid.com'});
// const flux = new Flux({apiUrl: 'https://api-staging.qbraid.com'});
// const flux = new Flux({apiUrl: 'http://localhost:3001'});

// make sure we're navigating to a valid route
var path = flux.router.getRoute(document.location.pathname) ? document.location.pathname : '/';
if (document.location.pathname !== path) {
  window.history.pushState(null, '', path);
}

// perform initial nav and render results
flux.getActions('NavigationActions').navigate(path).then(() => {
  const {component} = flux.getStore('NavigationStore').getState();
  ReactDOM.render(<App app={flux} component={component} />, document.getElementById('root'));
})
