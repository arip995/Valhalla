'use client';

import dynamic from 'next/dynamic';
const TransactionPage = dynamic(
  () =>
    import('@/Components/Creator/Transaction/Transaction'),
  { ssr: false }
);

const Page = () => {
  return <TransactionPage />;
};

export default Page;
