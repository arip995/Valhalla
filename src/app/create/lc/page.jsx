'use client';

import dynamic from 'next/dynamic';
const CreateLockedContent = dynamic(
  () =>
    import(
      '@/Components/Create/LockedContent/CreateLockedContent'
    ),
  { ssr: false }
);

const page = () => {
  return <CreateLockedContent />;
};

export default page;
