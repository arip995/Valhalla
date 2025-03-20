'use client';

import dynamic from 'next/dynamic';
const CustomLinks = dynamic(
  () => import('@/Components/Creator/Link/CustomLinks'),
  { ssr: false }
);

const page = () => {
  return <CustomLinks />;
};

export default page;
