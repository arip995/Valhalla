'use client';

import dynamic from 'next/dynamic';
const ProductPage = dynamic(
  () => import('@/Components/Creator/Product/Product'),
  { ssr: false }
);

const page = () => {
  return <ProductPage />;
};

export default page;
