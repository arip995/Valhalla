'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
const DPConsume = dynamic(
  () =>
    import('@/Components/Consume/DigitalProduct/DPConsume'),
  { ssr: false }
);

const page = () => {
  const productId = usePathname().split('/')[3];
  return <DPConsume productId={productId} />;
};

export default page;
