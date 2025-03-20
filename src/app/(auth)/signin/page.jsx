'use client';

import dynamic from 'next/dynamic';
const SigninAuth = dynamic(
  () => import('@/Components/Auth/SigninAuth'),
  { ssr: false }
);

const page = () => {
  return <SigninAuth />;
};

export default page;
