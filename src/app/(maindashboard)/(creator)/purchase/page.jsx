'use client';

import dynamic from 'next/dynamic';
const PurchasePage = dynamic(
  () => import('@/Components/Creator/Purchase/Purchase'),
  { ssr: false }
);

const page = () => {
  return <PurchasePage />;
};

export default page;
