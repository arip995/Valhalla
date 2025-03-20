'use client';

import dynamic from 'next/dynamic';
const ProductListing = dynamic(
  () =>
    import(
      '@/Components/Apps/ProductListing/ProductListing'
    ),
  { ssr: false }
);

const Page = () => {
  return <ProductListing />;
};

export default Page;
