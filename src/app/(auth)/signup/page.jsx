'use client';

import dynamic from 'next/dynamic';
const SignupAuth = dynamic(
  () => import('@/Components/Auth/SignupAuth'),
  { ssr: false }
);

const page = () => {
  return <SignupAuth />;
};

export default page;
