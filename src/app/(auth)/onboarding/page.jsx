'use client';

import dynamic from 'next/dynamic';
const StepTwoAuth = dynamic(
  () => import('@/Components/Auth/StepTwoAuth'),
  { ssr: false }
);

const page = () => {
  return <StepTwoAuth />;
};

export default page;
