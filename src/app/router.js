import Routr from 'routr'

import NewHome from './components/pages/NewHome'
import Events from './components/pages/Events'
import StandaloneApps from './components/pages/StandaloneApps'
import ForgotPassword from './components/pages/ForgotPassword'
import SignUp from './components/pages/login/SignUp'
import Billing from './components/pages/billing/Billing'
import CustomResearchSubscription from './components/pages/billing/custom-payment/CustomResearchSubscription'

import OrganizationCheckoutPage from './components/pages/billing/checkout/OrganizationCheckoutPage'
import ExecCheckoutPage from './components/pages/billing/checkout/ExecCheckoutPage'
import ExecPayupPage from './components/pages/billing/checkout/ExecPayupPage'

import IndividualSubscription from './components/pages/billing/static-payments/IndividualSubscription'
import OrganizationSubscription from './components/pages/billing/static-payments/OrganizationSubscription'
import ExecWorkshop from './components/pages/billing/exec-workshop/ExecWorkshop'

import ExecPaymentConfirmation from './components/pages/ExecPaymentConfirmation'

import Management from './components/pages/management/Management'

import TermsConditionsPrivacyPolicy from './components/pages/terms-conditions/TermsConditionsPrivacyPolicyWebsite'
import TermsConditions from './components/pages/terms-conditions/TermsConditions'

import Articles from './components/pages/Articles'
import QuantumNews from './components/pages/QuantumNews'
import Ambassadors from './components/pages/Ambassadors'
import Research from './components/pages/Research'
import Referrals from './components/pages/Referrals'
// END IMPORT SECTION

const router = new Routr({

  // unauthenticaed routes
  signup: {
    path: '/join',
    title: 'Join the quantum revoluion | qBraid',
    component: SignUp
  },

  forgotPassword: {
    path: '/forgot-password',
    title: 'Password reset | qBraid',
    component: ForgotPassword
  },

  home: {
    path: '/',
    title: 'Home | qBraid',
    component: NewHome,
    requiresAuth: true
  },

  events: {
    path: '/events',
    title: 'Events | qBraid',
    component: Events,
    actions: 'EventPageLoader',
    requiresAuth: true
  },

  standaloneApps: {
    path: '/standalone-apps',
    title: 'Apps | qBraid',
    component: StandaloneApps,
    requiresAuth: true
  },

  billing: {
    path: '/billing',
    title: 'Billing | qBraid',
    component: Billing,
    requiresAuth: true
  },

  customResearchSubscription: {
    path: '/custom-research-subscription',
    title: 'Customize Subscription | qBraid',
    component: CustomResearchSubscription,
    requiresAuth: true
  },

  individualCheckoutPage: {
    path: '/individual-checkout/:stuff',
    title: 'Checkout | qBraid',
    component: OrganizationCheckoutPage,
    requiresAuth: true
  },

  organizationCheckoutPage: {
    path: '/organization-checkout/:stuff',
    title: 'Checkout | qBraid',
    component: OrganizationCheckoutPage,
    requiresAuth: true
  },

  execWorkshop: {
    path: '/executive-workshop',
    title: 'Executive Workshop | qBraid',
    component: ExecWorkshop,
  },

  execCheckoutPage: {
    path: '/executive-checkout/:stuff',
    title: 'Executive Workshop | qBraid',
    component: ExecCheckoutPage
  },

  execPaymentConfirmation: {
    path: '/executive-home/:order',
    title: 'Executive Workshop | qBraid',
    component: ExecPaymentConfirmation
  },

  execPayup: {
    path: '/executive-payup',
    title: 'Finish Paying | qBraid',
    component: ExecPayupPage,
    requiresAuth: true
  },

  individualSubscription: {
    path: '/individual-subscription',
    title: 'Subscribe | qBraid',
    component: IndividualSubscription,
    requiresAuth: true
  },

  organizationSubscription: {
    path: '/organization-subscription',
    title: 'Subscribe | qBraid',
    component: OrganizationSubscription,
    requiresAuth: true
  },

  management: {
    path: '/management',
    title: 'Manage qBraid Features | qBraid',
    component: Management,
    actions: 'ManagementPageLoader',
    requiresAuth: true
  },

  privacyPolicy: {
    path: '/privacy-policy',
    title: 'qBraid Terms and Conditions',
    component: TermsConditionsPrivacyPolicy,
    requiresAuth: false
  },

  termsConditions: {
    path: '/terms-conditions',
    title: 'qBraid Terms and Conditions',
    component: TermsConditions,
    requiresAuth: false
  },

  Ambassadors: {
    path: '/ambassadors',
    title: 'qBraid Ambassadors Program',
    component: Ambassadors,
    requiresAuth: true
  },

  Research: {
    path: '/research',
    title: 'qBraid Research Program',
    component: Research,
    requiresAuth: true
  },

  Articles: {
    path: '/articles',
    title: 'Quantum Articles | qBraid',
    component: Articles,
    actions: 'ArticlePageLoader',
    requiresAuth: true
  },

  quantumNews: {
    path: '/quantum-news',
    title: "Quantum News | qBraid",
    component: QuantumNews,
    actions: 'QuantumNewsPageLoader',
    requiresAuth: true
  },

  Referrals: {
    path: '/referrals',
    title: 'qBraid Referrals Program',
    component: Referrals,
    requiresAuth: true
  },
// END COMPONENT PATHS
})

export default router
