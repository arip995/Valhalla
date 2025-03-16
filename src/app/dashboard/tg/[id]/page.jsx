import TelegramDashboard from '@/Components/TelegramDashboard/TelegramDashboard';

const page = async props => {
  const params = await props.params;
  return <TelegramDashboard productId={params.id} />;
};

export default page;
