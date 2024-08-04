'use client';
import {
  CheckIcon,
  Grid,
  Group,
  Radio,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import classes from '../../../styles/common/RadioCardTwo.module.css';

const ViewPlans1 = ({ plans, onSelect = () => {} }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  if (!plans?.length) return null;

  return (
    <div>
      <Radio.Group
        value={selectedPlan}
        onChange={value => {
          setSelectedPlan(value._id);
          onSelect(value);
        }}
      >
        {plans.map(plan => {
          return (
            <Grid gap={'sm'} key={plan._id}>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Radio.Card
                  className={classes.root}
                  radius="md"
                  value={plan._id}
                  key={plan._id}
                >
                  <Group wrap="nowrap" align="flex-start">
                    <Radio.Indicator icon={CheckIcon} />
                    <div className="flex flex-col gap-2">
                      <Text className={classes.label}>
                        {plan.subscriptionPeriod}
                      </Text>
                      <Text className={classes.description}>
                        {plan.cost}
                      </Text>
                    </div>
                  </Group>
                </Radio.Card>
              </Grid.Col>
            </Grid>
          );
        })}
      </Radio.Group>
    </div>
  );
};

export default ViewPlans1;
