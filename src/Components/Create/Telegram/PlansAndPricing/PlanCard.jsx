import { rem } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import React from 'react';

function PlanCard({
  plan,
  hideDelete,
  editPlan,
  deletePlan,
}) {
  return (
    <div className="nexify-savedPlan" id={plan.id}>
      <div className="w-100">
        <div className="nexify-savedPlan-title">
          {plan.planTitle}
        </div>
        <div className="nexify-savedPlan-planCost">
          ₹{plan.subscriptionCost} /{' '}
          {plan.subscriptionPeriodLabel == 'Lifetime'
            ? 'Lifetime'
            : `${
                plan.subscriptionPeriodValue > 1
                  ? `${plan.subscriptionPeriodValue} `
                  : ''
              }${plan.subscriptionPeriodLabel}`}
        </div>
      </div>
      <div className="flex gap-2">
        <div
          role="button"
          className="ms-2"
          onClick={() => editPlan(plan.id)}
        >
          <IconEdit
            style={{
              width: rem(20),
              height: rem(20),
            }}
            stroke={1.5}
            color="gray"
          />
        </div>
        {!hideDelete && (
          <div
            role="button"
            className="ms-2"
            onClick={() => deletePlan(plan.id)}
          >
            <IconTrash
              style={{
                width: rem(20),
                height: rem(20),
              }}
              stroke={1.5}
              color="gray"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PlanCard;
