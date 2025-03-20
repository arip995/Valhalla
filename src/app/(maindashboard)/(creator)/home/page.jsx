'use client';

import dynamic from 'next/dynamic';
const HomePage = dynamic(
  () => import('@/Components/Creator/Home/Home'),
  { ssr: false }
);

const Page = () => {
  return <HomePage />;
};

export default Page;
