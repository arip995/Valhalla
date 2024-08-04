'use client';
import ViewPlans1 from '@/Components/Common/General/ViewPlans1';
import React from 'react';

const GLManagePlans = ({ data }) => {
  return (
    <ViewPlans1
      plans={data.subscriptionPlans}
      onSelect={() => {}}
    />
  );
};

export default GLManagePlans;
