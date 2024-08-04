/* eslint-disable no-unused-vars */
'use client';
import React, { useState } from 'react';

const ViewPlans1 = ({ plans, onSelect = () => {} }) => {
  const [selectedPlan, setSelectedPlan] = useState(plans);

  if (!plans?.length) return null;
  return <div>ViewPlans1</div>;
};

export default ViewPlans1;
