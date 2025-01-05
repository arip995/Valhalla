'use client';

import '../../styles/dashboard/TelegramDashborad.css';
import PaperWrapper from '../Auth/PaperWrapper';
import LayoutLoading from '../Common/Loading/LayoutLoading';
import TGEPlansAndPricingContainer from './EditPlansAndPricing/TGEPlansAndPricingContainer';
import TelegramDashboardBasicDetails from './TelegramDashboardBasicDetails';
import TelegramDashboardOpenlink from './TelegramDashboardOpenlink';
import TelegramDashboardProfilepic from './TelegramDashboardProfilepic';
import useTelegramDashboard from './useTelegramDashboard';

const TelegramDashboard = ({ productId }) => {
  const {
    data,
    handleFileChange,
    loadingImage,
    basicDetailsForm,
    updateData,
  } = useTelegramDashboard(productId);

  if (!data) {
    return <LayoutLoading />;
  }

  return (
    <div className="tg-dashboard-container">
      <PaperWrapper showBackButton>
        <div className="flex h-screen w-full max-w-[600px] flex-col items-center gap-4 p-3 md:p-6">
          <TelegramDashboardOpenlink data={data} />
          <div className="hide-scrollbar flex w-full flex-col items-center gap-4 overflow-y-auto">
            <TelegramDashboardProfilepic
              data={data}
              handleFileChange={handleFileChange}
              loadingImage={loadingImage}
              onUpdate={updateData}
              basicDetailsForm={basicDetailsForm}
            />
            {basicDetailsForm.values.description ? (
              <TelegramDashboardBasicDetails
                data={data}
                basicDetailsForm={basicDetailsForm}
                onUpdate={updateData}
              />
            ) : null}
            <TGEPlansAndPricingContainer
              data={data}
              onUpdate={updateData}
            />
          </div>
        </div>
      </PaperWrapper>
    </div>
  );
};

export default TelegramDashboard;
