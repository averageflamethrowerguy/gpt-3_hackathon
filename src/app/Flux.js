import Alt from 'alt'; // instead of 'alt' to avoid needing a transpiler to turn classes into methods (newing the class)

import router from './router';

import ApiActions from './actions/ApiActions';
import AuthActions from './actions/AuthActions';
import NavigationActions from './actions/NavigationActions';
import OverlayActions from './actions/OverlayActions';

import AuthStore from './stores/AuthStore';
import NavigationStore from './stores/NavigationStore';
import OverlayStore from './stores/OverlayStore';

class Flux extends Alt {

  constructor(options) {
    super();

    this.apiUrl = options.apiUrl;

    this.router = router;

    this.addActions('ApiActions', ApiActions);
    this.addActions('AuthActions', AuthActions);
    this.addActions('NavigationActions', NavigationActions);
    this.addActions('OverlayActions', OverlayActions);

    this.registerAltWithActions()

    this.addStore('AuthStore', AuthStore);
    this.addStore('NavigationStore', NavigationStore);
    this.addStore('OverlayStore', OverlayStore);
  }

  registerAltWithActions = () => { // hack to provide the alt singleton to function-based action creators (necessitated by ES6 breaking class-based action creators in alt by mandating construction via 'new')
    for (const namespace in this.actions) { // namespace is the string provided as the first param of calls to this.addActions(...) above
      if (namespace != 'global') { // this namespace is used internally by alt, so we leave it alone
        this.actions[namespace].registerAlt(this)
      }
    }
  }
}

export default Flux;
