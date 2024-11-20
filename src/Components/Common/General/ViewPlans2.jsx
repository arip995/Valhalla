'use client';

import {
  CalculatePeriodString,
  CurrencySymbolMapping,
} from '@/Constants/constants';
import { discountPercentage } from '@/Utils/Common';
import { Badge } from '@mantine/core';
import BuyButton from '../Payment/BuyButton';

const ViewPlans2 = ({ data, onPay = () => {} }) => {
  if (!data.subscriptionPlans?.length) return null;
  return (
    <div
      className="flex w-full flex-col gap-3"
      onClick={onPay}
    >
      {data.subscriptionPlans.map(plan => {
        console.log(plan);
        return (
          <div
            className="flex w-full flex-col items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4"
            key={plan._id}
          >
            {plan.enableDiscountedPrice ? (
              <Badge className="text-sm" color="yellow.6">
                Save{' '}
                {`${discountPercentage(plan.cost, plan.discountedCost)}`}
              </Badge>
            ) : null}
            <div className="flex items-center gap-1">
              {plan.enableDiscountedPrice ? (
                <div
                  className="text-xs text-gray-500 line-through"
                  size="xs"
                >
                  {CurrencySymbolMapping['rupees']}
                  {plan.cost}
                </div>
              ) : null}
              <div className="text-md font-semibold text-gray-900">
                {CurrencySymbolMapping['rupees']}
                {plan.enableDiscountedPrice
                  ? plan.discountedCost
                  : plan.cost}
              </div>
            </div>
            <div className="text-md font-semibold text-gray-900">
              {`${CalculatePeriodString(
                plan.planType,
                plan.days
              )}`}
            </div>

            <BuyButton
              className="mt-2 w-fit"
              color="teal"
              animate={false}
              creatorId={data.creatorId}
              creatorDetails={data.creatorDetails}
              bookingData={{
                subscription: {
                  ...plan,
                },
              }}
              price={
                plan.enableDiscountedPrice
                  ? plan.discountedCost
                  : plan.cost
              }
            >
              BUY NOW
            </BuyButton>
          </div>
        );
      })}
    </div>
  );
};

export default ViewPlans2;
