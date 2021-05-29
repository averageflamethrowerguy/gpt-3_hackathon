import React from 'react';
import posed, { PoseGroup } from 'react-pose';

import Link from '../../partials/Link'

import contextTypes from '../../../contextTypes';
import logo from '../../../../assets/img/logo.png';

import './Management.css'
import CancellationVerification from '../cancellation/CancellationVerification'
import Delete from '../delete-account/Delete'
import TermsConditionsPrivacyPolicyWebsite from '../terms-conditions/TermsConditionsPrivacyPolicyWebsite'
import CookiePolicy from '../terms-conditions/CookiePolicy'
import DetailsDrawer from '../../partials/DetailsDrawer'
import OrganizationDeletion from '../delete-account/OrganizationDeletion'
import OrganizationCancellation from '../cancellation/OrganizationCancellation'
import LeftBar from '../../partials/LeftBar'
import planCosts from '../PlanCosts'

export default class Management extends React.Component {

  static contextTypes = contextTypes;

  constructor(props, context) {
    super(props, context);
    this.state = {
      userEmail: '',
      userDetails: [{}],
      paymentPlan: '',
      cost: '',
      academicDiscount: false,
      cpu: '',
      maxCpu: '',
      ram: '',
      maxRam: '',
      organizationList: [],
      renderedOrg: {},
      accessKey: '',
      successMessage: '',
      failureMessage: '',
      computeDrawerOpen: false,
      accessKeyDrawerOpen: false,
      subscriptionsDrawerOpen: false,
      organizationDrawerOpen: false,

      // this determines whether we render a button to update the API with the profile information
      profileDirty: false,
    }
  }

  timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  findUser = () => {
    let { user, resources } = this.context.getStore('UserStore').getState()
    console.log(resources)
    let obj = {}
    if (user) {
      obj = Object.assign(obj, {userDetails: user, userEmail: this.context.getStore('AuthStore').getState().user.attributes.email})
    }
    if (resources && resources[0]) {
      obj = Object.assign(obj, {
        cpu: resources[0].kubespawner_override.cpu_guarantee,
        maxCpu: resources[0].kubespawner_override.cpu_limit,
        ram: resources[0].kubespawner_override.mem_guarantee,
        maxRam: resources[0].kubespawner_override.mem_limit,
      })
    }
    this.setState(obj)
  }

  findOrganization = () => {
    let organizationList = this.context.getStore('OrganizationStore').getState().organizations
    this.setState({organizationList})
  }

  componentDidMount() {
    setTimeout(this.findUser, 0.5);
    setTimeout(this.findOrganization, 0.5);
  }

  getCost = (paymentPlan) => {
    if (paymentPlan == 'QuBes') {
      return (
        [ planCosts.qubes.cost, planCosts.qubes.cost * (1 - planCosts.qubes.discount) ]
      )
    }
    if (paymentPlan == 'QuInt') {
      return (
        [ planCosts.quint.cost, planCosts.qubes.cost * (1 - planCosts.quint.discount) ]
      )
    }
    if (paymentPlan == 'Research') {
      return (
        [ planCosts.research.cost, planCosts.qubes.cost * (1 - planCosts.research.discount) ]
      )
    }
    else {
      return [ 0, 0 ]
    }
  }

  findPaymentPlan = (userDetails) => {
    var paymentPlan = userDetails.paymentPlan
    var cost = 0
    var academicDiscount = userDetails.academicDiscount

    if (paymentPlan == 'qubes') {
      paymentPlan = 'QuBes'
    }
    else if (paymentPlan == 'quint') {
      paymentPlan = 'QuInt'
    }
    else if (paymentPlan == 'research-basic' || paymentPlan == 'qupro') {
      paymentPlan = 'Research'
    }

    var costs = this.getCost(paymentPlan)
    var cost = costs[0]
    if (academicDiscount == true) {
      cost = costs[1]
    }

    this.setState({paymentPlan, cost, academicDiscount})
  }

  navigate = (paymentPlan) => {
    var url = '/individual-checkout/' + paymentPlan + '&' + this.state.paymentPlan
    this.context.getActions("NavigationActions").navigate(url)
    .catch((err) => console.log(err))
  }

  handleUpdateUserDetails = () => {
    this.context.getActions('UserActions').editUserDetails(this.state.userDetails)
    .then(() => this.setState({profileDirty: false}))
    .catch(() => alert('Failed to update your user object'))
  }

  handleChangeFirstName = (e) => {
    let { userDetails } = this.state
    userDetails.firstName = e.target.value
    this.setState({ userDetails, profileDirty: true })
  }

  handleChangeLastName = (e) => {
    let { userDetails } = this.state
    userDetails.lastName = e.target.value
    this.setState({ userDetails, profileDirty: true })
  }

  handleChangePublicUsername = (e) => {
    let { userDetails } = this.state
    userDetails.publicUsername = e.target.value
    this.setState({ userDetails, profileDirty: true })
  }

  handleCloseDrawer = () => {
    this.setState({subscriptionsDrawerOpen: false, computeDrawerOpen: false, organizationDrawerOpen: false, accessKeyDrawerOpen: false})
  }

  handleChangeRenderedOrg = (org) => {
    this.setState({renderedOrg: org, organizationDrawerOpen: true})
  }

  handleChangeSubscriptionsDrawerOpen = (drawer) => {this.setState({subscriptionsDrawerOpen: !this.subscriptionsDrawerOpen})}

  handleChangeComputeDrawerOpen = (drawer) => {this.setState({computeDrawerOpen: !this.computeDrawerOpen})}

  handleChangeAccessKeyDrawerOpen = (drawer) => {this.setState({accessKeyDrawerOpen: !this.accessKeyDrawerOpen})}

  handleChangeOrganizationDrawerOpen = (drawer) => {this.setState({organizationDrawerOpen: !this.organizationDrawerOpen})}

  handleChangeAccessKey = (e) => this.setState({accessKey: e.target.value})

  submitAccessKey = () => {
    let key = this.state.accessKey
    this.context.getActions('UserActions').searchAccessKeys(key)
    .then(([cognitoKeyVal, errorMessage]) => {
      if (errorMessage) {
        this.setState({failureMessage: errorMessage, successMessage: ''})
      }
      else {
        this.context.getActions('ApiActions').query().post('/user/add-access-key').send({email: this.state.email, accessKey: cognitoKeyVal})
        .end((err, res) => {
          if (err) {
            console.log(err)
            this.setState({failureMessage: 'Failed to update the API with your access key', successMessage: ''})
          }
          else {
            this.setState({successMessage: 'Successfully updated the API with your access key', failureMessage: ''})
          }
        })
      }
    })
  }

  handleCancellationPopup = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderCancellationPopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  handleDeleteAccountPopup = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderDeleteAccountPopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  activateTermsOfService = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderTermsOfServicePopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  activatePrivacyPolicy = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderPrivacyPolicyPopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  activateCookiePolicy = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderCookiePolicyPopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  activateOrganizationDeletion = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderOrganizationDeletionPopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  activateOrganizationCancellation = () => {
    this.context.getActions('OverlayActions')._open({
      foreground: this.renderOrganizationCancellationPopup(),
      onBackgroundClick: this.context.getActions('OverlayActions')._close
    })
  }

  renderTermsOfServicePopup = () => {
    return (
      <div>
        <TermsConditionsPrivacyPolicyWebsite selectedWindow='terms-conditions' />
      </div>
    )
  }

  renderPrivacyPolicyPopup = () => {
    return (
      <div>
        <TermsConditionsPrivacyPolicyWebsite selectedWindow='privacy-policy' />
      </div>
    )
  }

  renderCookiePolicyPopup = () => {
    return (
      <div>
        <CookiePolicy />
      </div>
    )
  }

  renderDeleteAccountPopup = () => {
    return (
      <div>
        <Delete email={this.state.userEmail} />
      </div>
    )
  }

  renderCancellationPopup = () => {
    return (
      <div>
        <CancellationVerification paymentPlan={this.state.paymentPlan} email={this.state.userEmail} />
      </div>
    )
  }

  renderOrganizationDeletionPopup = () => {
    return (
      <OrganizationDeletion organization={this.state.renderedOrg} />
    )
  }

  renderOrganizationCancellationPopup = () => {
    return (
      <OrganizationCancellation organization={this.state.renderedOrg} />
    )
  }

  renderSubscriptionDetails = () => {
    var isSubscribed = this.state.userDetails.autoRenewal
    var activeMessage = 'You do not have an active subscription with this plan.'

    if (isSubscribed == true || isSubscribed == 'true') {
      activeMessage = 'Your ' + this.state.paymentPlan + 'Plan is activated. Thank you for your business!'
    }

    return (
      <div>
        {activeMessage}
        {(isSubscribed == false  || isSubscribed == 'false') ?
          <div>
            <p>Your account will expire on {this.state.userDetails.paymentEndTimeLearn ? Date(this.state.userDetails.paymentEndTimeLearn) : ''}</p>
            <p className='learn-more-btn' onClick={() => this.navigate(this.state.paymentPlan)}>Activate Here</p>
          </div> : ''}
      </div>
    )
  }

  renderProductDescription = (paymentPlan, active) => {
    var isSubscribed = this.state.userDetails.autoRenewal
    let button = null
    if (!active) {
      button = <div style={{width: '100%', margin: '0 auto', textAlign: 'center'}}>
        <span className='subscribe-btn' onClick={() => this.navigate(paymentPlan)} style={{color: 'white'}}>Subscribe</span>
      </div>
    }
    else if (isSubscribed) {
      button = <div style={{width: '100%', margin: '0 auto', textAlign: 'center'}}>
        <span className='subscribe-btn' onClick={() => this.handleCancellationPopup()} style={{color: 'white'}}>Cancel Subscription</span>
      </div>
    }

    if ( paymentPlan == 'QuBes' ) {
      return (
        <div className='potential-plan'>
          <p>QuBes is designed for individuals just starting out in quantum. Qubes tutorials last 2-3 weeks, and prepare students with the basic skills to learn and understand quantum computing.</p>
          { button }
        </div>
      )
    }
    if ( paymentPlan == 'QuInt' ) {
      return (
        <div className='potential-plan'>
          <p>QuInt is designed for individuals who are already mathematically and programmatically proficient and wish to get started in quantum computing. QuInt tutorials last 3-4 months. QuInt courses
          cover famous algorithms such as Shor's Algorithm, as well as intermediate topics from quantum chemistry and quantum cryptography.</p>
          { button }
        </div>
      )
    }
    if ( paymentPlan == 'Research' ) {
      return (
        <div className='potential-plan'>
          <p>Our research platform is designed for academics and people in industry who already have a robust knowledge about the quantum computing space. qBraid makes it easy to learn new concepts and packages
          if you so choose; alternatively, our transpiler allows conversion between two languages.</p>
          { button }
        </div>
      )
    }
  }

  renderProduct = (paymentPlan, active) => {
    var costs = this.getCost(paymentPlan)
    var cost = costs[0]
    if (this.state.academicDiscount == true) {
      cost = costs[1]
    }
    return (
      <div className='productContainer'>
        <p className='product-name'>{paymentPlan}: ${cost} / month.</p>
        {this.renderProductDescription(paymentPlan, active)}
      </div>
    )
  }

  renderOtherProducts = (activePlan) => {
    var planList = ['QuBes', 'QuInt', 'Research']
    var renderedProducts = []
    for (let i = 0; i < planList.length; i++) {
      if (planList[i] != activePlan) {
        renderedProducts.push(this.renderProduct(planList[i], false))
      }
    }
    return (
      <div className="renderOtherProducts">
        <h1 className='other-plans'>Other Plans:</h1>
        {renderedProducts}
      </div>
    )
  }

  renderComputeInfo = () => {
      return (
        <div className="computeResources">
          <h1>Your Compute Resources</h1>
          <div className='productContainer'>
            <p>Your Available Disk Space: Unlimited</p>
            <p>You can write and store as much information as you like with qBraid.</p>
            <p>Your Available CPU Resources:</p>
              <p>Guaranteed: {this.state.cpu} AWS vCPU</p>
              <p>Maximum: {this.state.maxCpu} AWS vCPU</p>
            <p>Your Available RAM Resources:</p>
              <p>Guaranteed: {this.state.ram}B RAM</p>
              <p>Maximum: {this.state.maxRam}B RAM</p>
            <p>If you need more CPU or RAM, you might consider upgrading to a higher-grade plan.
            Alternatively, contact us at <a style={{color: 'lightgrey'}} href='mailto:request@qbraid.com'>request@qbraid.com</a></p>
          </div>
        </div>
      )
  }

  renderAccessKeyInfo  = () => {
    return (
      <div className="accessKey">
        <h1>Add an Access Key</h1>
        <p>You may be given an access key in order to learn courses on the qBraid Jupyter platform that are in development or that qBraid does not maintain.
        If you haven't been given an access key, you probably don't need one.</p>
        <div className='access-key-input-container'>
          <input className='access-key-input-field' onChange={this.handleChangeAccessKey} />
          <p onClick={this.submitAccessKey} className='access-key-btn'>Add Key</p>
        </div>
        {this.state.successMessage && <p className='success-message'>{this.state.successMessage}</p>}
        {this.state.failureMessage && <p className='failure-message'>{this.state.failureMessage}</p>}
      </div>
    )
  }

  renderProfileInformationArea = () => {
    let {userDetails} = this.state
    if (userDetails) {
      return (
        <div className='profile-change-forms'>
          <p className='profile-title'>My Profile</p>
          <div className='profile-information-flexbox'>
            <div className='profile-forms-meta-wrapper'>
              <p className='profile-information'>Optional Information</p>
              <div className='profile-forms-wrapper'>
                <div>
                  <p className='profile-information-form-label'>First Name</p>
                  <input className='profile-information-form' placeHolder='First Name' defaultValue={userDetails.firstName} onChange={this.handleChangeFirstName} />
                </div>
                <div>
                  <p className='profile-information-form-label'>Last Name</p>
                  <input className='profile-information-form' placeHolder='Last Name' defaultValue={userDetails.lastName} onChange={this.handleChangeLastName} />
                </div>
                <div>
                  <p className='profile-information-form-label'>Public Username</p>
                  <input className='profile-information-form' placeHolder='Public Username' defaultValue={userDetails.publicUsername} onChange={this.handleChangePublicUsername} />
                </div>
                {
                  this.state.profileDirty ?
                  <div className='profile-information-update-container'>
                    <div className='profile-information-update-button' onClick={this.handleUpdateUserDetails}>Update</div>
                  </div>
                  :
                  <div className='profile-information-update-success'>All changes are saved</div>
                }
              </div>
            </div>
            <div className='profile-information-meta-wrapper'>
              <p className='profile-information'>Your Code Snippets</p>
              <table className='snippet-list-container'>
                <tr style={{borderBottom: '1px solid white'}}>
                  <th className='snippet-name-column'>Name</th>
                  <th>Upvotes</th>
                </tr>
                {
                  (this.state.userDetails.ownCodeSnippets || []).map((snippet, snippetIndex) => {
                    return (
                      <tr className='snippet-information' style={snippetIndex % 2 == 0 ? {color: 'lightgrey'} : {}}>
                        <td>{snippet.title}</td>
                        <td>{snippet.numberUpvotes}</td>
                      </tr>
                    )
                  })
                }
              </table>
            </div>
          </div>
        </div>
      )
    }
  }

  renderOrganizationSelection = () => {

    var orgInfo = this.state.organizationList
    var renderedOrgInfo = orgInfo.map((org, index) => {
      return(
        <tr key={index}
        className={`table-column ${index % 2 == 1 && 'table-column-dark'}`}
        onClick={() => this.handleChangeRenderedOrg(org)} style={{cursor:'pointer'}}>
          <td className='column-element' style={{margin: 5}}>{org.name}</td>
          <td className='column-element' style={{margin: 5}}>{org.paymentPlan}</td>
          <td className='column-element' style={{margin: 5}}>{org.seats}</td>
          <td className='column-element' style={{margin: 5}}>{org.accessKey}</td>
          <td className='column-element' style={{margin: 5}}>{org.researchPaymentPlan}</td>
          <td className='column-element' style={{margin: 5}}>{org.researchSeats}</td>
          <td className='column-element' style={{margin: 5}}>{org.researchAccessKey}</td>
        </tr>
      )
    })
    return (
      <div className='organizationContainer'>
        <h1>Organizations:</h1>
        { orgInfo.length > 0 ? <table className='organizationTable'>
          <thead>
            <tr>
              <th className='column-element-header'>Name</th>
              <th className='column-element-header'>Learn Payment Plan</th>
              <th className='column-element-header'>Learn Seats</th>
              <th className='column-element-header'>Learn Access Key</th>
              <th className='column-element-header'>Research Payment Plan</th>
              <th className='column-element-header'>Research Seats</th>
              <th className='column-element-header'>Research Access Key</th>
            </tr>
          </thead>
          <tbody>
            {renderedOrgInfo}
          </tbody>
        </table> :
        <p>No organizations to display</p> }
      </div>
    )
  }


  renderRenderedOrg = () => {
    return (
      <div className='organization-drawer-container' style={{width: 400}}>
        <p>Name: {this.state.renderedOrg.name}</p>
        <p>Seats: {this.state.renderedOrg.seats}</p>
        <p>Research Seats: {this.state.renderedOrg.researchSeats}</p>
        <p>Payment Plan: {this.state.renderedOrg.paymentPlan}</p>
        <p>Research Payment Plan: {this.state.renderedOrg.researchPaymentPlan}</p>
        <p>Access Key: {this.state.renderedOrg.accessKey}</p>
        {this.state.renderedOrg.researchPaymentPlan != 'none' ? <p>Research Access Key: {this.state.renderedOrg.researchAccessKey}</p> : ""}
        {(this.state.renderedOrg.paymentPlan || this.state.renderedOrg.researchPaymentPlan) && <p style={{marginTop: 40}}>
          <span className='organization-delete-button' onClick={this.activateOrganizationCancellation}>Cancel Billing for this Organization</span>
        </p>}
        <p style={{marginTop: 40}}>
          <span className='organization-delete-button' onClick={this.activateOrganizationDeletion}>Delete this Organization</span>
        </p>
      </div>
    )
  }


  render() {
    return (
      <div className='managementMetaContainer'>
        <LeftBar />
        <div className='middle-container'>
          {this.renderProfileInformationArea()}
          {this.renderOrganizationSelection()}
        </div>

        <div className='rightSidebar'>
          {/* this.state.paymentPlan != 'none' ?
            <h1>Your {this.state.paymentPlan} Subscription is Active</h1> :
            <h1>No active subscriptions</h1> */}
            { /* <p onClick={this.handleChangeSubscriptionsDrawerOpen}><span className='open-drawer-btn'>More information</span></p> */ }
          <div className='keys-and-resources'>
            <h1>Your Compute and Access Keys</h1>
            <div className='key-resource-container' onClick={this.handleChangeComputeDrawerOpen}>
              <p>View My Compute Resources</p>
              <p>&#9654;</p>
            </div>
            <div className='key-resource-container' onClick={this.handleChangeAccessKeyDrawerOpen}>
              <p>Add an Access Key</p>
              <p>&#9654;</p>
            </div>
          </div>
          <div className='legal-agreements'>
            <h1>Legal Agreements & Managing Your Data</h1>
            <div>
              <p>Review our <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={this.activateTermsOfService}>Terms and Conditions</span>, <span style={{textDecoration: 'underline', cursor: 'pointer'}}
              onClick={this.activatePrivacyPolicy}>Privacy Policy</span> and <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={this.activateCookiePolicy}>Cookie Policy</span></p>
              <p>Have questions? Contact us at <a style={{color: 'grey'}} href='mailto:request@qbraid.com'>request@qbraid.com</a></p>
            </div>
          </div>
          <div className='delete-account'>
            <p>Delete your account</p>
            <span className='delete-acct-btn' style={{textAlign: 'center', width: 150}} onClick={this.handleDeleteAccountPopup}>Click Here</span>
          </div>
        </div>

        {this.state.subscriptionsDrawerOpen && <DetailsDrawer open={this.state.subscriptionsDrawerOpen} onClose={this.handleCloseDrawer}>
          <div className='payment-plan-drawer'>
            {this.renderProduct(this.state.paymentPlan, true)}
            {this.renderOtherProducts(this.state.paymentPlan)}
          </div>
        </DetailsDrawer>}
        {this.state.computeDrawerOpen && <DetailsDrawer open={this.state.computeDrawerOpen} onClose={this.handleCloseDrawer}>
          {this.renderComputeInfo()}
        </DetailsDrawer>}
        {this.state.accessKeyDrawerOpen && <DetailsDrawer open={this.state.accessKeyDrawerOpen} onClose={this.handleCloseDrawer}>
          {this.renderAccessKeyInfo()}
        </DetailsDrawer>}
        {this.state.organizationDrawerOpen && <DetailsDrawer open={this.state.organizationDrawerOpen} onClose={this.handleCloseDrawer}>
          {this.renderRenderedOrg()}
        </DetailsDrawer>}
      </div>
    )
  }
}


// need: billing plan / cost per month; upgrade and cancel buttons
