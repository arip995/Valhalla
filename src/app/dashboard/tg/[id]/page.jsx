'use client';

import dynamic from 'next/dynamic';
const TelegramDashboard = dynamic(
  () =>
    import(
      '@/Components/TelegramDashboard/TelegramDashboard'
    ),
  { ssr: false }
);

const page = () => {
  return <TelegramDashboard />;
};

export default page;
