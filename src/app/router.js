import Routr from 'routr'

import MainPage from './components/pages/MainPage'

// END IMPORT SECTION

const router = new Routr({

  MainPage: {
    path: '/',
    title: 'FUT BUNGUS',
    component: MainPage,
    requiresAuth: true
  }
// END COMPONENT PATHS
})

export default router
