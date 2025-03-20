'use client';

import dynamic from 'next/dynamic';
const CouponPage = dynamic(
  () => import('@/Components/Creator/Coupon/Coupon'),
  { ssr: false }
);

const page = () => {
  return <CouponPage />;
};

export default page;
