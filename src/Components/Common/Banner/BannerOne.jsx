import { rem } from '@mantine/core';
import {
  IconAlertTriangle,
  IconArrowNarrowRight,
  IconEdit,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const Banner = ({ type }) => {
  return (
    <div className="z-[200] cursor-pointer bg-gradient-to-r from-purple-600 to-blue-400">
      <div className="flex w-full items-center justify-center gap-2 py-2 text-center text-sm font-semibold text-white">
        {type === 'kyc' ? (
          <>
            <IconAlertTriangle
              style={{
                width: rem(18),
                height: rem(18),
              }}
            />{' '}
            Complete yout kyc to start earning{' '}
            <IconArrowNarrowRight />
          </>
        ) : type === 'edit' ? (
          <>
            <IconEdit
              style={{
                width: rem(18),
                height: rem(18),
              }}
            />
            You are the owner, edit this page.
          </>
        ) : null}
      </div>
    </div>
  );
};

const BannerOne = ({ type = 'kyc', href = '' }) => {
  return (
    <>
      {type === 'kyc' ? (
        <Link href={'/account'}>
          <Banner type={type} />
        </Link>
      ) : type === 'edit' ? (
        <Link href={href}>
          <Banner type={type} />
        </Link>
      ) : null}
    </>
  );
};

export default BannerOne;
