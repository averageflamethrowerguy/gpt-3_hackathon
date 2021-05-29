import React from 'react';
import PaymentButton from '../PaymentButton'
import './PaymentPlan.css';
export default class PaymentPlan extends React.Component {
  renderPlanDescription = () => {
    return(
      <div>
        <p>${this.props.cost} {this.props.planDescriptionList[0]}</p>
        <p>{this.props.planDescriptionList[1]}</p>
        <p>{this.props.planDescriptionList[2]}</p>
        <p>{this.props.additionalInfo}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="box">
        <div>
          <h2 id="plan-heading">qBraid {this.props.planBuyer}: {this.props.planType}</h2>
          <dl id="plan-description">{this.renderPlanDescription()}</dl>
        </div>
        <PaymentButton planType={this.props.planType} duration={this.props.duration} planBuyer={this.props.planBuyer} cost={this.props.cost}
        product={this.props.product}
        />
      </div>
    )
  }
}
