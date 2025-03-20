'use client';

import dynamic from 'next/dynamic';
const CreateDP = dynamic(
  () => import('@/Components/Create/DP/CreateDP'),
  { ssr: false }
);

const page = () => {
  return <CreateDP />;
};

export default page;
