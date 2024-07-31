import React from 'react';
import {
  IconEdit,
  IconGripVertical,
} from '@tabler/icons-react';
import { Switch } from '@mantine/core';

const durationMapping = {
  daily: 'Day',
  weekly: 'Week',
  monthly: 'Month',
  yearly: 'Year',
  lifetime: 'Lifetime',
  quarterly: 'Quarterly',
  'half yearly': 'Half yearly',
  bimonthly: 'Bimonthly',
  quadrimester: 'Quadrimester',
  'one time': 'One Time',
};

const TGESinglePlan = ({
  planObj = {},
  onEdit,
  onToggleStatus = () => {},
  plansLength = 0,
}) => {
  const onToggleChange = () => {
    onToggleStatus(planObj);
  };

  const getDurationString = () => {
    const lowercasePlanType =
      planObj?.planType?.toLowerCase();
    if (lowercasePlanType === 'lifetime') {
      return durationMapping[lowercasePlanType];
    }
    return `${planObj?.periodQuantity} ${durationMapping[lowercasePlanType]}${
      planObj?.periodQuantity > 1 ? `s` : ``
    }`;
  };

  const getDiscountPercentage = (a, b) => {
    if (!a || !b) return 0;
    return 100 - ((a / b) * 100).toFixed();
  };

  return (
    <div className="pd-plan">
      <div className="pd-plan" style={{ border: 'none' }}>
        {plansLength > 1 && (
          <div className="pd-plan-draggable-image">
            <IconGripVertical
              stroke={1.5}
              size={18}
              className="cl_draggable"
            />
          </div>
        )}
        <div className="pd-plan-details">
          <div className="pd-plan__name">
            {planObj.subscriptionPeriod}
          </div>
          <div className="pd-plan-pricing">
            <div className="pd-plan-pricing-main">
              <span>₹</span>
              <span>
                {planObj.enableDiscountedPrice
                  ? planObj?.discountedCost
                  : planObj.cost}
              </span>
              <span>/</span>
              <span>{getDurationString()}</span>
            </div>
            {planObj?.enableDiscountedPrice ? (
              <div className="pd-plan-pricing-discounted">
                <span>₹</span>
                <span className="pd-plan-pricing-discounted__price">
                  {planObj.cost}
                </span>
                <span className="pd-plan-pricing-discounted__off">{`(${getDiscountPercentage(
                  planObj?.discountedCost,
                  planObj.cost
                )} % off)`}</span>
              </div>
            ) : null}
          </div>
          <div className="pd-plan-members">
            {`${planObj?.totalSoldQuantity || 0} ${
              planObj?.totalSoldQuantity === 1
                ? `Active Subscriber`
                : 'Active Subscribers'
            }`}
          </div>
        </div>
      </div>
      <div className="pd-plan-actionables">
        <IconEdit
          stroke={1.5}
          size={18}
          className="edit-icon cursor-pointer"
          onClick={() => {
            onEdit(planObj._id);
          }}
        />
        <Switch
          color="green"
          checked={planObj?.status === 1}
          onChange={() => {
            onToggleChange();
          }}
        />
      </div>
    </div>
  );
};

export default TGESinglePlan;
