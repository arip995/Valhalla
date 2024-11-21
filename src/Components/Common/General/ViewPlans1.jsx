'use client';
import BuyButton from '@/Components/Common/Payment/BuyButton';
import {
  CalculatePeriodString,
  CurrencySymbolMapping,
} from '@/Constants/constants';
import { discountPercentage } from '@/Utils/Common';
import {
  CheckIcon,
  Grid,
  Group,
  Radio,
  Text,
} from '@mantine/core';
import React, { useState } from 'react';
import classes from '../../../styles/common/RadioCardTwo.module.css';
import { statusErrorTextMapping } from '@/Constants/ProductListingContants';

const ViewPlans1 = ({
  data,
  onSelect = () => {},
  onPay = () => {},
}) => {
  const [selectedPlan, setSelectedPlan] = useState(
    data.subscriptionPlans?.[0]?._id
  );

  if (!data.subscriptionPlans?.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <Radio.Group
        className="bg-white"
        value={selectedPlan}
        onChange={value => {
          setSelectedPlan(value);
          onSelect(value);
        }}
      >
        {data.subscriptionPlans.map(plan => {
          return (
            <Grid gap={'sm'} key={plan._id}>
              <Grid.Col span={{ base: 12 }}>
                <Radio.Card
                  className={classes.root}
                  radius="md"
                  value={plan._id}
                  key={plan._id}
                >
                  <div className="flex w-full flex-nowrap justify-between gap-2">
                    <Group wrap="nowrap" align="flex-start">
                      <Radio.Indicator icon={CheckIcon} />
                      <div className="flex flex-col gap-1">
                        <Text className={classes.label}>
                          {`${CalculatePeriodString(
                            plan.planType,
                            plan.days
                          )}`}
                        </Text>
                        {plan.enableDiscountedPrice ? (
                          <Text
                            className={
                              classes.discountPercentage
                            }
                          >
                            Save{' '}
                            {`${discountPercentage(plan.cost, plan.discountedCost)}`}
                          </Text>
                        ) : null}
                      </div>
                    </Group>
                    <div className="flex items-center gap-1">
                      {plan.enableDiscountedPrice ? (
                        <Text
                          td="line-through"
                          size="xs"
                          c={'dimmed'}
                        >
                          {CurrencySymbolMapping['rupees']}
                          {plan.cost}
                        </Text>
                      ) : null}
                      <Text className={classes.label}>
                        {CurrencySymbolMapping['rupees']}
                        {plan.enableDiscountedPrice
                          ? plan.discountedCost
                          : plan.cost}
                      </Text>
                    </div>
                  </div>
                </Radio.Card>
              </Grid.Col>
            </Grid>
          );
        })}
      </Radio.Group>
      <BuyButton
        onClick={() => onPay(selectedPlan)}
        creatorId={data.creatorId}
        creatorDetails={data.creatorDetails}
        disabled={!selectedPlan || data.status !== 1}
        animate={data.status === 1 ? true : false}
        price={
          selectedPlan?.discountedCost || selectedPlan.cost
        }
        productDetails={data}
        fullWidth
      >
        {data.status === 1
          ? 'Proceed to pay'
          : statusErrorTextMapping[data.status]}
      </BuyButton>
    </div>
  );
};

export default React.memo(ViewPlans1);
