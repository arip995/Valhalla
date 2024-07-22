'use client';

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import '../../styles/dashboard/TelegramDashborad.css';
import LayoutLoading from '../Common/Loading/LayoutLoading';
import TelegramDashboardBasicDetails from './TelegramDashboardBasicDetails';
import TelegramDashboardOpenlink from './TelegramDashboardOpenlink';
import TelegramDashboardPlansAndPricing from './TelegramDashboardPlansAndPricing';
import TelegramDashboardProfilepic from './TelegramDashboardProfilepic';
import useTelegramDashboard from './useTelegramDashboard';

const TelegramDashboard = ({ productId }) => {
  const { data, handleFileChange, loadingImage } = useTelegramDashboard(productId);

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
          <TelegramDashboardProfilepic data={data} handleFileChange={handleFileChange} loadingImage={loadingImage} />
          <TelegramDashboardBasicDetails data={data} />
          <TelegramDashboardPlansAndPricing data={data} />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default TelegramDashboard;
