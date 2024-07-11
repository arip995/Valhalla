import TelegramDashboard from '@/Components/TelegramDashboard/TelegramDashboard';

const page = async ({ params }) => {
  return <TelegramDashboard productId={params.id} />;
};

export default page;
