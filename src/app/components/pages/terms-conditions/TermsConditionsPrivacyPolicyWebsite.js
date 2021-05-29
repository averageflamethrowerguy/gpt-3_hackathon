import React from 'react'
import posed, { PoseGroup } from 'react-pose'

import Link from '../../partials/Link'

import contextTypes from '../../../contextTypes'
import logo from '../../../../assets/img/logo.png'

import './TermsConditionsPrivacyPolicy.css'

export default class TermsConditionsPrivacyPolicyWebsite extends React.Component {

  static contextTypes = contextTypes

  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedWindow: this.props.selectedWindow,
    }
  }

  handleCloseOverlay = (e) => {
    e.preventDefault()
    this.context.getActions('OverlayActions')._close()
  }

  renderCurrentFormPage = () => {
    if (this.props.selectedWindow == 'terms-conditions') {
      return (
        <div>
        <h2><strong>Terms and Conditions</strong></h2>

          <p>Welcome to qBraid.com!</p>

          <p>These terms and conditions outline the rules and regulations for the use of qBraid Co's Website, located at https://qbraid.com.</p>

          <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use qBraid.com if you do not agree to take all of the terms and conditions stated on this page.</p>

          <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

          <h3><strong>Cookies</strong></h3>

          <p>We employ the use of cookies. By accessing qBraid.com, you agreed to use cookies in agreement with the qBraid Co's Privacy Policy. </p>

          <p>Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

          <h3><strong>License</strong></h3>

          <p>Unless otherwise stated, qBraid Co and/or its licensors own the intellectual property rights for all material on qBraid.com. All intellectual property rights are reserved. You may access this from qBraid.com for your own personal use subjected to restrictions set in these terms and conditions.</p>

          <p>You must not:</p>
          <ul>
            <li>Republish material from qBraid.com</li>
            <li>Sell, rent or sub-license material from qBraid.com</li>
            <li>Reproduce, duplicate or copy material from qBraid.com</li>
            <li>Redistribute content from qBraid.com</li>
          </ul>

          <p>This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the <a href="https://www.termsandconditionsgenerator.com">Terms And Conditions Generator</a> and the <a href="https://www.generateprivacypolicy.com">Privacy Policy Generator</a>.</p>

          <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. qBraid Co does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of qBraid Co,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, qBraid Co shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>

          <p>qBraid Co reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

          <p>You warrant and represent that:</p>

          <ul>
            <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
            <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
            <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
            <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
          </ul>

          <p>You hereby grant qBraid Co a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>

          <h3><strong>Hyperlinking to our Content</strong></h3>

          <p>The following organizations may link to our Website without prior written approval:</p>

          <ul>
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
            <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
          </ul>

          <p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</p>

          <p>We may consider and approve other link requests from the following types of organizations:</p>

          <ul>
            <li>commonly-known consumer and/or business information sources;</li>
            <li>dot.com community sites;</li>
            <li>associations or other groups representing charities;</li>
            <li>online directory distributors;</li>
            <li>internet portals;</li>
            <li>accounting, law and consulting firms; and</li>
            <li>educational institutions and trade associations.</li>
          </ul>

          <p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of qBraid Co; and (d) the link is in the context of general resource information.</p>

          <p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</p>

          <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to qBraid Co. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>

          <p>Approved organizations may hyperlink to our Website as follows:</p>

          <ul>
            <li>By use of our corporate name; or</li>
            <li>By use of the uniform resource locator being linked to; or</li>
            <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
          </ul>

          <p>No use of qBraid Co's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>

          <h3><strong>iFrames</strong></h3>

          <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

          <h3><strong>Content Liability</strong></h3>

          <p>We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that arise on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

          <h3><strong>Your Privacy</strong></h3>

          <p>Please read our <Link href='/privacy-policy' style={{textDecoration: 'underline'}}>Privacy Policy</Link></p>

          <h3><strong>Reservation of Rights</strong></h3>

          <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and their linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

          <h3><strong>Removal of links from our website</strong></h3>

          <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

          <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>

          <h3><strong>Disclaimer</strong></h3>

          <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>

          <ul>
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>

          <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

          <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>

          <p className='toc-microsection' style={{textAlign: 'center'}}>Effective Date: December 10, 2020</p>

          <p className="toc-btn" onClick={this.handleCloseOverlay}>Return to Main Page</p>
        </div>
      )
    }
    return (
      <div>
        <p style={{fontSize: 32, textAlign: 'center'}}>qBraid Privacy Policy</p>

        <p className='toc-microsection'>qBraid Co. (“qBraid,” “we,” “us,” and “our”) provides an all-in-one workspace allowing our users to write, design, collaborate, and learn to build quantum computing programs.
        Our Privacy Policy (“Privacy Policy”) is
        designed to help you understand how we collect, use and share your personal information and to assist you in exercising the privacy rights available to you.</p>

        <p className='toc-header'>Scope</p>

        <p className='toc-body'>This Privacy Policy covers the personal information we collect about you when you use our products or services, or otherwise interact with us, including on our website at qbraid.com
        (“Apps”) and our related online and offline offerings (collectively, the “Services”). This policy also explains your choices surrounding how we use your personal information, which
        include how you can object to certain uses of the information and how you can access and update certain information.</p>

        <p className='toc-header'>1. Personal Information we collect</p>

        <p className='toc-body'>We collect personal information when you provide it to us, when you use our Services, and when other sources provide it to us, as further described below.</p>

        <p className="toc-subheader">A. Information You Provide to Us</p>

        <p className='toc-microsection'>Account Creation:</p>
        <p className='toc-body'> When you create an account or otherwise use the Services, we collect information such as your name, email address, password, role within your team or
        enterprise, and an optional profile photo.</p>

        <p className='toc-microsection'>Your Communications with Us:</p>
        <p className='toc-body'>We collect personal information from you such as email address, phone number, or mailing address when you request information about our Services, register
        for our newsletter, request customer or technical support, or otherwise communicate with us. We also collect the contents of messages or attachments that you may send to us, as well as
        other information you choose to provide, and that may be associated with your communications.</p>

        <p className='toc-microsection'>Payment Information:</p>
        <p className='toc-body'>When you choose to subscribe for plans on the Services, we will collect payment information allowing you to pay us. We use third-party payment providers to process
        payments on the Services. We may receive information associated with your payment information, such as billing address and transaction information, but we do not directly store payment
        information on the Services.</p>

        <p className='toc-microsection'>Surveys:</p>
        <p className='toc-body'>We may contact you to participate in surveys. If you decide to participate, you may be asked to provide certain information which may include personal information.</p>

        <p className='toc-microsection'>Interactive Features:</p>
        <p className='toc-body'>We may offer interactive features such as forums, blogs, chat and messaging services, and social media pages. We and others who use our Services may collect the
        information you submit or make available through these interactive features. Any content you provide via the public sections of these features will be considered “public” and is not
        subject to the privacy protections referenced herein. By using these interactive features, you understand that the personal information provided by you may be viewed and used by third
        parties for their own purposes.</p>

        <p className='toc-microsection'>Registration for Sweepstakes or Contests:</p>
        <p className='toc-body'>We may run sweepstakes and contests. Contact information you provide may be used to inform you about the sweepstakes or contest and for other
        promotional, marketing and business purposes.</p>

        <p className='toc-microsection'>Conferences, Trade Shows, and Other Events:</p>
        <p className='toc-body'>We may attend conferences, trade shows, and other events where we collect personal information from individuals who interact with or express
        an interest in the Services.</p>

        <p className='toc-microsection'>Job Applications.</p>
        <p className='toc-body'>We may post job openings and opportunities on the Services. If you reply to one of these postings by submitting your application, CV and/or cover letter to us, we will
        collect and use your information to assess your qualifications.</p>

        <p className='toc-microsection'>Google Drive Information:</p>
        <p className='toc-body'>You may choose to access your Google Drive within qBraid. You may then choose to edit, download, delete or run files within your Drive. qBraid will retain information to enable your
        access to Google Drive across multiple sessions.</p>

        <p className="toc-subheader">B. Information Collected Automatically</p>

        <p className='toc-microsection'>Automatic Data Collection:</p>
        <p className='toc-body'>We keep track of certain information about you when you visit and interact with any of our Services. This information may include your Internet protocol (IP)
        address, user settings, MAC address, cookie identifiers, mobile carrier, mobile advertising and other unique identifiers, details about your browser, operating system or device, location
        information (including inferred location based off of your IP address), Internet service provider, pages that you visit before, during and after using the Services, information about the
        links you click, information about how you interact with the Services, including the frequency and duration of your activities, and other information about how you use the Services.</p>
        <p className='toc-body'>Information we collect may be associated with accounts and other devices.</p>

        <p className='toc-microsection'>Cookies, Pixel Tags/Web Beacons, and Analytics Information:</p>
        <p className='toc-body'>We, as well as third parties that provide content, advertising, or other functionality on the Services, may use cookies, pixel
        tags, local storage, and other technologies (“Technologies”) to automatically collect information through the Services. Technologies are essentially small data files placed on your devices
        that allow us and our partners to record certain pieces of information whenever you visit or interact with our Services.</p>

        <p className='toc-microsection'>Cookies:</p>
        <p className='toc-body'> Cookies are small text files placed in device browsers to store their preferences. Most browsers allow you to block and delete cookies. However, if you do that, the Services may
        not work properly.</p>

        <p className='toc-microsection'>Pixel Tags/Web Beacons:</p>
        <p className='toc-body'>A pixel tag (also known as a web beacon) is a piece of code embedded in the Services that collects information about engagement on the Services. The use of a pixel
        tag allows us to record, for example, that a user has visited a particular web page or clicked on a particular advertisement. We may also include web beacons in e-mails to understand whether
        messages have been opened, acted on, or forwarded.</p>

        <p className='toc-microsection'>Analytics:</p>
        <p className='toc-body'>We may also use third-party service providers to collect and process analytics and other information on our Services. These third-party service providers may use cookies, pixel
        tags, web beacons or other storage technology to collect and store analytics and other information. They have their own privacy policies addressing how they use the analytics and other
        information and we do not have access to, nor control over, third parties’ use of cookies or other tracking technologies.</p>

        <p className="toc-subheader">C. Information from Other Sources</p>

        <p className='toc-body'>We may obtain information about you from other sources, including through third-party services and organizations. For example, if you access our Services through a third-party application,
        such as a social networking site or a third-party login service, we may collect information about you from that third party that you have made available via your privacy settings.</p>

        <p className='toc-header'>2. How we use your information</p>

        <p className='toc-subheader'>We use your personal information for a variety of business purposes, including to:</p>
        <p className='toc-microsection'>Provide the Services or Requested Information, such as:</p>
        <ul className='toc-body' style={{marginLeft: 30}}>
          <li>Fulfilling our contract with you;</li>
          <li>Identifying and communicating with you, including providing newsletters and marketing materials;</li>
          <li>Managing your information;</li>
          <li>Processing your payments and otherwise servicing your purchase orders;</li>
          <li>Responding to questions, comments, and other requests;</li>
          <li>Providing access to certain areas, functionalities, and features of our Services; and</li>
          <li>Answering requests for customer or technical support.</li>
        </ul>
        <p className='toc-microsection'>Serve Administrative Purposes, such as:</p>
        <ul className='toc-body'  style={{marginLeft: 30}}>
          <li>Pursuing legitimate interests, such as direct marketing, research and development (including marketing research), network and information security, and fraud prevention;</li>
          <li>Measuring interest and engagement in our Services, including analyzing your usage of the Services;</li>
          <li>Developing new products and services and improving the Services;</li>
          <li>Ensuring internal quality control and safety;</li>
          <li>Authenticating and verifying individual identities;</li>
          <li>Carrying out audits;</li>
          <li>Communicating with you about your account, activities on our Services and Privacy Policy changes;</li>
          <li>Preventing and prosecuting potentially prohibited or illegal activities;</li>
          <li>Enforcing our agreements; and</li>
          <li>Complying with our legal obligations.</li>
        </ul>

        <p className='toc-microsection'>Marketing Our Products and Services:</p>
        <p className='toc-body'>We may use personal information to tailor and provide you with content and advertisements. If you have any questions about our marketing practices or
        if you would like to opt out of the use of your personal information for marketing purposes, you may contact us as set forth below.</p>

        <p className='toc-microsection'>Consent:</p>
        <p className='toc-body'>We may use personal information for other purposes that are clearly disclosed to you at the time you provide personal information or with your consent.</p>

        <p className='toc-microsection'>De-identified and Aggregated Information Use:</p>
        <p className='toc-body'>We may use personal information and other data about you to create de-identified and/or aggregated information. De-identified and/or aggregated
        information is not personal information, and we may use and disclose such information in a number of ways, including research, internal analysis, analytics, and any other legally permissible
        purposes.</p>

        <p className='toc-microsection'>Process Information on Behalf of Our Customers:</p>
        <p className='toc-body'>Our customers may choose to use our Services to process certain data of their own, which may contain personal information. Such personal
        information that is processed by us on behalf of our customers, and our privacy practices will be governed by the contracts that we have in place with our customers, not this Privacy Policy.
        If you have any questions or concerns about how such personal information is handled or would like to exercise your rights, you should contact the person or entity (i.e., the data controller)
        who has contracted with us to use the Service to process this information. Our customers control the personal information in these cases and determine the security settings within the account,
        its access controls and credentials. We will, however, provide assistance to our customers to address any concerns you may have, in accordance with the terms of our contract with them.</p>

        <p className='toc-microsection'>We use the following sub-processors:</p>
        <ul className='toc-body' style={{marginLeft: 30}}>
          <li>Amazon Web Services (USA)</li>
          <li>Ionos (USA)</li>
          <li>MongoDB (USA)</li>
          <li>Stripe (USA)</li>
          <li>Google (USA</li>
        </ul>

        <p className='toc-microsection'>How We Use Automatic Collection Technologies:</p>
        <p className='toc-body'>Our uses of Technologies fall into the following general categories:</p>
        <ul className='toc-body' style={{marginLeft: 30}}>
          <li>Operationally Necessary;</li>
          <li>Performance Related;</li>
          <li>Functionality Related;</li>
          <li>Advertising or Targeting Related.</li>
        </ul>

        <p className='toc-microsection'>Cross-Device Tracking:</p>
        <p className='toc-body'>Your browsing activity may be tracked across different websites and different devices or apps. For example, we may attempt to match your browsing activity on your
        mobile device with your browsing activity on your laptop. To do this our technology partners may share data, such as your browsing patterns, geo-location and device identifiers, and will
        match the information of the browser and devices that appear to be used by the same person.</p>

        <p className='toc-header'>3. Disclosing your information to third parties</p>

        <p className='toc-body'>We may share your personal information with the following categories of third parties:</p>

        <p className='toc-subheader'>Service Providers:</p>
        <p className='toc-body'>We may share any personal information we collect about you with our third-party service providers. The categories of service providers to whom we entrust personal
        information include service providers for:</p>
        <ul className='toc-body'>
          <li>the provision of the Services;</li>
          <li>the provision of information, products, and other services you have requested;</li>
          <li>marketing and advertising;</li>
          <li>payment and transaction processing;</li>
          <li>customer service activities; and</li>
          <li>the provision of IT and related services.</li>
        </ul>

        <p className='toc-microsection'>Business Partners:</p>
        <p className='toc-body'>We may provide personal information to business partners to provide you with a product or service you have requested. We may also provide personal information to business
        partners with whom we jointly offer products or services.</p>

        <p className='toc-microsection'>Affiliates:</p>
        <p className='toc-body'>We may share personal information with our affiliated entities.</p>

        <p className='toc-microsection'>Advertising Partners:</p>
        <p className='toc-body'>We do not use or share your information, including personal information, to advertise any third party’s products or services via the Services. We may use and share
        your personal information with third-party advertising partners to market our own Services and grow our Services’ user base, such as to provide targeted marketing about our own Services
        via third-party services. If you prefer not to share your personal information with third-party advertising partners, you may follow the instructions below.</p>

        <p className='toc-microsection'>Disclosures to Protect Us or Others:</p>
        <p className='toc-body'>We may access, preserve, and disclose any information we store in association with you to external parties if we, in good faith, believe doing so is
        required or appropriate to:</p>
        <ul className='toc-body' style={{marginLeft: 30}}>
          <li>comply with law enforcement or national security requests and legal process, such as a court order or subpoena;</li>
          <li>protect your, our, or others’ rights, property, or safety;</li>
          <li>enforce our policies or contracts;</li>
          <li>collect amounts owed to us;</li>
          <li>assist with an investigation and prosecution of suspected or actual illegal activity.</li>
        </ul>

        <p className='toc-microsection'>Disclosure in the Event of Merger, Sale, or Other Asset Transfer:</p>
        <p className='toc-body'>If we are involved in a merger, acquisition, financing due diligence, reorganization, bankruptcy, receivership, purchase
        or sale of assets, or transition of service to another provider, then your information may be sold or transferred as part of such a transaction, as permitted by law and/or contract.</p>

        <p className='toc-header'>4. International Data Transfers</p>

        <p className='toc-body'>All information processed by us may be transferred, processed, and stored anywhere in the world, including but not limited to, the United States or other countries, which may have data
        protection laws that are different from the laws where you live. We endeavor to safeguard your information consistent with the requirements of applicable laws.</p>

        <p className='toc-header'>5. Your Choices</p>

        <p className='toc-microsection'>General:</p>
        <p className='toc-body'>You may have the right to object to or opt out of certain uses of your personal information. Where you have consented to the processing of your personal information, you may
        withdraw that consent at any time by contacting us as described below. Even if you opt out, we may still collect and use non-personal information regarding your activities on our Services
        and for other legal purposes as described above.</p>

        <p className='toc-microsection'>Email Communications:</p>
        <p className='toc-body'>If you receive an unwanted email from us, you can use the unsubscribe link found at the bottom of the email to opt out of receiving future emails. Note that you will
        continue to receive transaction-related emails regarding products or services you have requested. We may also send you certain non-promotional communications regarding us and our Services,
        and you will not be able to opt out of those communications (e.g., communications regarding the Services or updates to this Privacy Policy).</p>

        <p className='toc-microsection'>Mobile Devices:</p>
        <p className='toc-body'>We may send you push notifications through our Apps. You may at any time opt out from receiving these types of communications by changing the settings on your mobile device.
        With your consent, we may also collect precise location information if you use our Apps. You may opt out of this collection by changing the settings on your mobile device.</p>

        <p className='toc-microsection'>“Do Not Track”:</p>
        <p className='toc-body'>Your browser may offer you a “Do Not Track” option, which allows you to signal to operators of websites and web applications and Service that you do not wish such operators
        to track certain of your online activities over time and/or across different websites. If your browser is set to “Do Not Track”, qBraid will attempt to honor this functionality. However, our
        third party service providers may use their own cookies, pixel tags, web beacons or other storage technology to collect and store Log Data or information from elsewhere on the internet, and
        we do not have access to, nor control over, a third parties’ use of cookies or other tracking technologies.</p>

        <p className='toc-microsection'>Cookies and Interest-Based Advertising: </p>
        <p className='toc-body'>You may stop or restrict the placement of Technologies on your device or remove them by adjusting your preferences as your browser or device permits.
        Please note that cookie-based opt-outs are not effective on mobile applications. However, you may opt-out of personalized advertisements on some mobile applications by following the
        instructions for Android and iOS. The online advertising industry also provides websites from which you may opt out of receiving targeted ads from data partners and other advertising
        partners that participate in self-regulatory programs. You can access these websites and learn more about targeted advertising and consumer choice and privacy, at
        www.networkadvertising.org/managing/opt_out.asp, http://www.youronlinechoices.eu/, https://youradchoices.ca/choices/, and www.aboutads.info/choices/.</p>

        <p className='toc-body'>Please note you must separately opt out in each browser and on each device.</p>

        <p className='toc-header'>6. Your Privacy Rights</p>

        <p className='toc-body'>Depending upon your location and in accordance with applicable laws, you may have the right to:</p>
        <ul className='toc-body'>
          <li>Access personal information about you consistent with legal requirements. In addition, you may have the right in some cases to receive or have your electronic personal information
          transferred to another party.</li>
          <li>Request Correction of your personal information where it is inaccurate or incomplete.</li>
          <li>Request Deletion of your personal information, subject to certain exceptions prescribed by law.</li>
          <li>Request Restriction or Object to Processing of your personal information, including the right to opt in or opt out of the sale of your personal information to third parties.</li>
          <li>Not be Discriminated Against by us for exercising your privacy rights.</li>
        </ul>
        <p className='toc-body'>If you would like to exercise any of these rights, please contact us as set forth below. We will process such requests in accordance with applicable laws. To protect your privacy,
        we will take steps to verify your identity before fulfilling your request, such as by requiring you to submit your request via your account.</p>

        <p className='toc-header'>7. Data Retention</p>

        <p className='toc-body'>We store the personal information we receive as described in this Privacy Policy for as long as you use our Services or as necessary to fulfill the purpose(s) for which it was collected,
        provide our Services, resolve disputes, establish legal defenses, conduct audits, pursue legitimate business purposes, enforce our agreements, and comply with applicable laws.</p>

        <p className='toc-header'>8. Security of your Information</p>

        <p className='toc-body'>We take steps to ensure that your information is treated securely and in accordance with this Privacy Policy. Unfortunately, no system is 100% secure, and we cannot ensure or warrant the
        security of any information you provide to us. To the fullest extent permitted by applicable law, we do not accept liability for unauthorized disclosure.</p>
        <p className='toc-body'>By using the Services or providing personal information to us, you agree that we may communicate with you electronically regarding security, privacy, and administrative issues relating to
        your use of the Services. If we learn of a security system’s breach, we may attempt to notify you electronically by posting a notice on the Services, by mail or by sending an email to you.</p>

        <p className='toc-header'>9. Third-Party Websites/Applications</p>

        <p className='toc-body'>The Services may contain links to other websites/applications and other websites/applications may reference or link to our Services. These third-party services are not controlled by us.
        We encourage our users to read the privacy policies of each website and application with which they interact. We do not endorse, screen or approve, and are not responsible for, the privacy
        practices or content of such other websites or applications. Visiting these other websites or applications is at your own risk.</p>

        <p className='toc-header'>10. Children's Information</p>

        <p className='toc-body'>The Services are not directed to children under 13 (or other age as required by local law), and we do not knowingly collect personal information from children. If you learn that your child
        has provided us with personal information without your consent, you may contact us as set forth below. If we learn that we have collected a child’s personal information in violation of
        applicable law, we will promptly take steps to delete such information and terminate the child’s account.</p>

        <p className='toc-header'>11. Supervisory Authority</p>

        <p className='toc-body'>If you are located in the European Economic Area or the UK, you have the right to lodge a complaint with a supervisory authority if you believe our processing of your personal information
        violates applicable law.</p>

        <p className='toc-header'>12. California Privacy Notice</p>

        <p className='toc-body'>This Privacy Notice applies to California consumers and supplements the Privacy Policy.</p>

        <p className='toc-microsection'>California Shine the Light Law:</p>
        <p className='toc-body'>The California “Shine the Light” law permits users who are California residents to request and obtain from us once a year, free of charge, a list of the third
         parties to whom we have disclosed their personal information (if any) for their direct marketing purposes in the prior calendar year, as well as the type of personal information disclosed
         to those parties. To make such a request from us, if entitled, please use the contact information listed below.</p>

        <p className='toc-microsection'>California Consumer Privacy Act (CCPA): </p>
        <p className='toc-body'>In the preceding 12 months, we have not disclosed your personal information to any third party in a manner that would be considered a sale under the
        CCPA.</p>

        <p className='toc-header'>13. Changes to Our Privacy Policy</p>

        <p className='toc-body'>We may revise this Privacy Policy from time to time at our sole discretion. If there are any material changes to this Privacy Policy, we will notify you as required by applicable law.
        You understand and agree that you will be deemed to have accepted the updated Privacy Policy if you continue to use the Services after the new Privacy Policy takes effect.</p>

        <div style={{width: 500, margin: '0 auto'}}>
          <p className='toc-header'>Contact us:</p>
          <p className='toc-microsection'>If you have any questions about our privacy practices or this Privacy Policy, please contact us at:
          contact@qbraid.com</p>
        </div>

        <p className='toc-microsection' style={{textAlign: 'center'}}>Effective Date: December 10, 2020</p>

        <p className="toc-btn" onClick={this.handleCloseOverlay}>Return to Main Page</p>
      </div>
    )
  }

  render() {
    return (
      <div style={{zIndex: 999}} className="terms-conditions-container">
        {this.renderCurrentFormPage()}
      </div>
    );
  }

}