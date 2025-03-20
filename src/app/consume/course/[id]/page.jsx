'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
const CourseConsume = dynamic(
  () => import('@/Components/Consume/Course/CourseConsume'),
  { ssr: false }
);

export default function Page() {
  const productId = usePathname().split('/')[3];

  return <CourseConsume productId={productId} />;
}
