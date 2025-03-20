'use client';

import dynamic from 'next/dynamic';
const AccountPage = dynamic(
  () => import('@/Components/Creator/Account/Account'),
  { ssr: false }
);

const Page = () => {
  return <AccountPage />;
};

export default Page;
