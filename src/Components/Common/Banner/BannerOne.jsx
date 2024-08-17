import {
  IconAlertTriangle,
  IconArrowNarrowRight,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const BannerOne = () => {
  return (
    <Link href={'/creator/account'}>
      <div className="sticky top-0 z-[200] cursor-pointer bg-gradient-to-r from-purple-600 to-blue-400">
        <div className="flex w-full justify-center gap-2 py-2 text-center text-sm font-semibold text-white">
          <IconAlertTriangle /> Complete yout kyc to start
          earning <IconArrowNarrowRight />
        </div>
      </div>
    </Link>
  );
};

export default BannerOne;
