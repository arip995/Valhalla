'use client';

import dynamic from 'next/dynamic';
const CreateCourse = dynamic(
  () => import('@/Components/Create/Course/CreateCourse'),
  { ssr: false }
);

const page = () => {
  return <CreateCourse />;
};

export default page;
