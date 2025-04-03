'use client';

import dynamic from 'next/dynamic';
const AdminPage = dynamic(
  () => import('@/Components/Creator/Admin/Admin'),
  { ssr: false }
);
const page = () => {
  return <AdminPage />;
};

export default page;
