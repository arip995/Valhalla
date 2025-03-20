'use client';

import dynamic from 'next/dynamic';
const AudiencePage = dynamic(
  () => import('@/Components/Creator/Audience/Audience'),
  { ssr: false }
);
const page = () => {
  return <AudiencePage />;
};

export default page;
