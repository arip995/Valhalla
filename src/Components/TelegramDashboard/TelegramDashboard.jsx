'use client';

import { Paper, Tabs, Text } from '@mantine/core';
import '../../styles/dashboard/TelegramDashborad.css';
import LayoutLoading from '../Common/Loading/LayoutLoading';
import dynamic from 'next/dynamic';
import useTelegramDashboard from './useTelegramDashboard';
import CloseButton from '../Common/Buttons/CloseButton';
import StatusBlock from '../Common/StatusBlock';

// Dynamically import heavy components
const TGEPlansAndPricingContainer = dynamic(
  () =>
    import(
      './EditPlansAndPricing/TGEPlansAndPricingContainer'
    ),
  {
    loading: () => <LayoutLoading />,
    ssr: false,
  }
);

const TelegramDashboardBasicDetails = dynamic(
  () => import('./TelegramDashboardBasicDetails'),
  {
    ssr: false,
  }
);

const TelegramDashboardProfilepic = dynamic(
  () => import('./TelegramDashboardProfilepic'),
  {
    ssr: false,
  }
);

const TelegramDashboardMemberDetails = dynamic(
  () => import('./TelegramDashboardMemberDetails'),
  {
    loading: () => <LayoutLoading />,
    ssr: false,
  }
);

const TelegramDashboardOpenlink = dynamic(
  () => import('./TelegramDashboardOpenlink'),
  {
    ssr: false,
  }
);

const TelegramDashboardCoupons = dynamic(
  () => import('./TelegramDashboardCoupons'),
  {
    loading: () => <LayoutLoading />,
    ssr: false,
  }
);

const TAB_OPTIONS = [
  { label: 'Overview', value: 'overview' },
  { label: 'Subscriber', value: 'subscriber' },
];

const TelegramDashboard = ({ productId }) => {
  const {
    data,
    handleFileChange,
    loadingImage,
    basicDetailsForm,
    updateData,
    tab,
    router,
    pathName,
  } = useTelegramDashboard(productId);

  if (!data) {
    return <LayoutLoading />;
  }

  return (
    <div className="tg-dashboard-container">
      <div className="flex h-screen w-full max-w-[900px] flex-col items-center gap-4 p-3 md:p-6">
        <div className="w-full">
          <TelegramDashboardOpenlink data={data} />
        </div>

        <div className="flex w-full gap-2">
          <CloseButton className="!relative !left-0 !top-0" />
          <Tabs
            radius="xs"
            value={tab || 'profile'}
            className="w-full bg-white"
            onChange={val => {
              router.push(`${pathName}?tab=${val}`);
            }}
          >
            <Tabs.List grow>
              {TAB_OPTIONS.map((item, i) => {
                return (
                  <Tabs.Tab value={item.value} key={i}>
                    {item.label}
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>
          </Tabs>
        </div>
        {tab === 'subscriber' ? (
          <TelegramDashboardMemberDetails />
        ) : (
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
            <Paper withBorder className="w-full p-4">
              <Text size="md" className="mb-2" fw={600}>
                Settings
              </Text>
              <StatusBlock
                label="Make email mandatory"
                value={
                  data.isEmailRequired === false
                    ? false
                    : true
                }
                onChange={value => {
                  updateData('emailRequired', value);
                }}
              />
            </Paper>
            <TelegramDashboardCoupons />
          </div>
        )}
      </div>
    </div>
  );
};

export default TelegramDashboard;
