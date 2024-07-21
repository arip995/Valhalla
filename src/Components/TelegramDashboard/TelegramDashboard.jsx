'use client';

import React from 'react';
import useTelegramDashboard from './useTelegramDashboard';
import '../../styles/dashboard/TelegramDashborad.css';
import { Paper } from '@mantine/core';
import TelegramDashboardProfilepic from './TelegramDashboardProfilepic';
import TelegramDashboardPlansAndPricing from './TelegramDashboardPlansAndPricing';
import TelegramDashboardBasicDetails from './TelegramDashboardBasicDetails';
import { Toaster } from 'react-hot-toast';
import LayoutLoading from '../Common/Loading/LayoutLoading';
import TelegramDashboardOpenlink from './TelegramDashboardOpenlink';

const TelegramDashboard = ({ productId }) => {
  const { data } = useTelegramDashboard(productId);
  console.log(data)

  if (!data) {
    return (
      <LayoutLoading />
    )
  }

  return (
    <>
      <div className="tg-dashboard-container">
        <div className="flex w-full max-w-[600px] flex-col items-center gap-4 overflow-auto p-3 md:p-6">
          <TelegramDashboardOpenlink data={data} />
          <TelegramDashboardProfilepic data={data} />
          <TelegramDashboardPlansAndPricing data={data} />
          <TelegramDashboardBasicDetails data={data} />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default TelegramDashboard;
