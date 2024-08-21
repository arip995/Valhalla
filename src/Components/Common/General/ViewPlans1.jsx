'use client';
import {
  CalculatePeriodString,
  CurrencySymbolMapping,
} from '@/Constants/constants';
import { discountPercentage } from '@/Utils/Common';
import {
  Button,
  CheckIcon,
  Grid,
  Group,
  Radio,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import classes from '../../../styles/common/RadioCardTwo.module.css';
import { Shimmer } from '@/Constants/StyleConstants';

const ViewPlans1 = ({
  plans,
  defaultSelect,
  onSelect = () => {},
  onPay = () => {},
  btnText = '',
}) => {
  const [selectedPlan, setSelectedPlan] =
    useState(defaultSelect);

  if (!plans?.length) return null;

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
        {plans.map(plan => {
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
                          {/* {plan.subscriptionPeriod} */}
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
                      <Text size="sm" fw={700}>
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
      <Button
        className={Shimmer()}
        onClick={() => onPay(selectedPlan)}
        disabled={!selectedPlan}
        fullWidth
      >
        {btnText
          ? btnText
          : selectedPlan
            ? 'Proceed to pay'
            : 'Select a plan'}
      </Button>
    </div>
  );
};

export default ViewPlans1;
