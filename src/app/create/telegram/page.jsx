import CreateTelegram from '@/Components/Create/Telegram/CreateTelegram';
import React from 'react';

export const generateMetadata = ({ params }) => {
  return {
    title: params,
    description: 'All in one creator monetization company',
  };
};
// export const metadata = {};

const page = () => {
  return <CreateTelegram />;
};

export default page;
