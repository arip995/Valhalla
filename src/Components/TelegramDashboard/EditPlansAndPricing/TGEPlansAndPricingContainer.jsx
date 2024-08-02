import { Paper, Text } from '@mantine/core';
import React from 'react';
import TGEPlansAndPricing from './TGEPlansAndPricing';
import useEditPlanAndPricing from './useEditPlanAndPricing';

const TGEPlansAndPricingContainer = ({
  data,
  onUpdate,
}) => {
  const {
    openPlanSideBar,
    setOpenPlanSideBar,
    isSavingPlan,
    isDeletingPlan,
    onSavePlan,
    onDeletePlan,
    onTogglePlanStatus,
    onDragPlans,
    plans,
  } = useEditPlanAndPricing(data, onUpdate);

  return (
    <Paper withBorder className="w-full p-4">
      <Text size="md" className="mb-2" fw={600}>
        Pland and Pricing
      </Text>
      <TGEPlansAndPricing
        plans={plans}
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

export default React.memo(TGEPlansAndPricingContainer);
