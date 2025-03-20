'use client';

import dynamic from 'next/dynamic';
const CreateTelegram = dynamic(
  () =>
    import('@/Components/Create/Telegram/CreateTelegram'),
  { ssr: false }
);

const page = () => {
  return <CreateTelegram />;
};

export default page;
