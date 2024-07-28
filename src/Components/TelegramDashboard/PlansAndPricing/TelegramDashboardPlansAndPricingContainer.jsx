import { Paper, Text } from '@mantine/core';
import React, { useState } from 'react';
import PlansAndPricing from './PlansAndPricing';

const TelegramDashboardPlansAndPricingContainer = ({
  data,
  onUpdate,
}) => {
  const [openPlanSideBar, setOpenPlanSideBar] =
    useState(false);
  const [isSavingPlan, setIsSavingPlan] = useState(false);
  const [isDeletingPlan, setIsDeletingPlan] =
    useState(false);

  const onSavePlan = () => {};
  const onDeletePlan = () => {};
  const onTogglePlanStatus = () => {};
  const onDragPlans = () => {};
  return (
    <Paper withBorder className="w-full p-4">
      <Text size="md" className="mb-2" fw={600}>
        Pland and pricing
      </Text>
      <PlansAndPricing
        plans={data?.subscriptionPlans}
        onSavePlan={onSavePlan}
        onDeletePlan={onDeletePlan}
        onTogglePlanStatus={onTogglePlanStatus}
        onDragPlans={onDragPlans}
        openPlanSideBar={openPlanSideBar}
        setOpenPlanSideBar={setOpenPlanSideBar}
        isSavingPlan={isSavingPlan}
        isDeletingPlan={isDeletingPlan}
      />
    </Paper>
  );
};

export default TelegramDashboardPlansAndPricingContainer;
