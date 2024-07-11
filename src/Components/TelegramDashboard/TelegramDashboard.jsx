'use client';

import React from 'react';
import useTelegramDashboard from './useTelegramDashboard';
import '../../styles/dashboard/TelegramDashborad.css';
import { Paper } from '@mantine/core';
import TelegramDashboardProfilepic from './TelegramDashboardProfilepic';
import TelegramDashboardPlansAndPricing from './TelegramDashboardPlansAndPricing';
import TelegramDashboardBasicDetails from './TelegramDashboardBasicDetails';
import { Toaster } from 'react-hot-toast';

const TelegramDashboard = ({ productId }) => {
  const data = useTelegramDashboard(productId);

  return (
    <>
      <div className="tg-dashboard-container">
        <div className="flex w-full max-w-[600px] flex-col items-center gap-4 overflow-auto p-3 md:p-6">
          <TelegramDashboardProfilepic />
          <TelegramDashboardPlansAndPricing />
          <TelegramDashboardBasicDetails />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default TelegramDashboard;
