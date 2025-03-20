'use client';
import dynamic from 'next/dynamic';
const TelegramDashboard = dynamic(
  () =>
    import(
      '@/Components/TelegramDashboard/TelegramDashboard'
    ),
  { ssr: false }
);

const page = async props => {
  const params = await props.params;
  return <TelegramDashboard productId={params.id} />;
};

export default page;
