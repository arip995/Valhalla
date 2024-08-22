/* eslint-disable @next/next/no-img-element */
import { Anchor } from '@mantine/core';
import Link from 'next/link';
import Logo from '../../../../public/icons/neifyiconsmall.webp';
import GpayIcon from '../../../../public/images/common/gpay.png';
import MastercardIcon from '../../../../public/images/common/mastercard.png';
import PaytmIcon from '../../../../public/images/common/paytm.png';
import PhonpeIcon from '../../../../public/images/common/phonepe.png';
import VisacardIcon from '../../../../public/images/common/visacard.png';

const FooterTwo = ({ description }) => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500">
            © Copyright 2021. All Rights Reserved.
          </p>

          <div className="-mx-2 mt-3 flex sm:mt-0">
            <Link
              href="/refund-and-cancellation"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500"
              aria-label="Reddit"
            >
              {' '}
              Refund Policy{' '}
            </Link>

            <Link
              href="/privacy-policy"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500"
              aria-label="Reddit"
            >
              {' '}
              Privacy Policy{' '}
            </Link>

            <Link
              href="/terms-and-conditions"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500"
              aria-label="Reddit"
            >
              {' '}
              T & C{' '}
            </Link>
          </div>
        </div> */}
        <p className="w-full text-center text-sm font-medium text-gray-500">
          Guaranteed safe & secure payment
        </p>
        <div className="my-2 flex w-full items-center justify-center gap-2">
          <img
            className="h-6 w-6"
            src={PhonpeIcon.src}
            alt=""
          />
          <img
            className="h-6 w-6"
            src={GpayIcon.src}
            alt=""
          />
          <img
            className="h-6 w-6"
            src={PaytmIcon.src}
            alt=""
          />
          <img
            className="h-6 w-6"
            src={MastercardIcon.src}
            alt=""
          />
          <img
            className="h-6 w-6"
            src={VisacardIcon.src}
            alt=""
          />
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm font-semibold text-gray-700"
          >
            <img
              className="h-4 w-auto"
              src={Logo.src}
              alt=""
            />{' '}
            Nexify
          </Link>

          <p className="mt-4 max-w-md text-center text-sm font-light text-gray-500">
            {description
              ? description
              : `Want to create your own community? Experience
            hassle-free payouts and premium support.`}{' '}
            <Anchor
              underline="always"
              href={`${process.env.NEXT_PUBLIC_HOST}creator/home`}
              className="font-light"
              size="sm"
            >
              Create your own.
            </Anchor>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterTwo;
