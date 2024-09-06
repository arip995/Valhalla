/* eslint-disable @next/next/no-img-element */
import { Anchor } from '@mantine/core';
import Link from 'next/link';
import Logo from '../../../../src/app/icon.png';
import GpayIcon from '../../../../public/images/common/gpay.png';
import MastercardIcon from '../../../../public/images/common/mastercard.png';
import PaytmIcon from '../../../../public/images/common/paytm.png';
import PhonpeIcon from '../../../../public/images/common/phonepe.png';
import VisacardIcon from '../../../../public/images/common/visacard.png';

const FooterTwo = ({ description }) => {
  return (
    <footer className="bg-gray-50 text-gray-600">
      <div className="container mx-auto px-3 py-6">
        <p className="mb-4 w-full text-center text-sm font-medium text-gray-500">
          Guaranteed safe & secure payment
        </p>
        <div className="mb-6 flex w-full items-center justify-center gap-4">
          <img
            className="h-6 w-auto transition-transform hover:scale-105"
            src={PhonpeIcon.src}
            alt="PhonePe"
          />
          <img
            className="h-6 w-auto transition-transform hover:scale-105"
            src={GpayIcon.src}
            alt="Google Pay"
          />
          <img
            className="h-6 w-auto transition-transform hover:scale-105"
            src={PaytmIcon.src}
            alt="Paytm"
          />
          <img
            className="h-6 w-auto transition-transform hover:scale-105"
            src={MastercardIcon.src}
            alt="Mastercard"
          />
          <img
            className="h-6 w-auto transition-transform hover:scale-105"
            src={VisacardIcon.src}
            alt="Visa"
          />
        </div>
        <hr className="my-6 border-gray-200" />
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="text-md flex items-center font-bold text-gray-800 transition-colors duration-300 hover:text-violet-600"
          >
            <img
              className="mr-1 h-5 w-auto"
              src={Logo.src}
              alt="Nexify Logo"
            />
            Nexify
          </Link>

          <p className="mt-4 max-w-md text-center text-xs leading-relaxed text-gray-500">
            {description
              ? description
              : `Want to create your own community? Experience
            hassle-free payouts and premium support.`}{' '}
            <Anchor
              underline="hover"
              href={`${process.env.NEXT_PUBLIC_HOST}/home`}
              className="font-medium"
              size="xs"
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

//Dark mode
{
  /* <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <p className="mb-6 w-full text-center text-base font-semibold text-gray-200">
          Guaranteed safe & secure payment
        </p>
        <div className="mb-8 flex w-full items-center justify-center gap-6">
          <img
            className="h-8 w-auto transition-transform hover:scale-110"
            src={PhonpeIcon.src}
            alt="PhonePe"
          />
          <img
            className="h-8 w-auto transition-transform hover:scale-110"
            src={GpayIcon.src}
            alt="Google Pay"
          />
          <img
            className="h-8 w-auto transition-transform hover:scale-110"
            src={PaytmIcon.src}
            alt="Paytm"
          />
          <img
            className="h-8 w-auto transition-transform hover:scale-110"
            src={MastercardIcon.src}
            alt="Mastercard"
          />
          <img
            className="h-8 w-auto transition-transform hover:scale-110"
            src={VisacardIcon.src}
            alt="Visa"
          />
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="flex items-center text-xl font-bold text-white transition-colors duration-300 hover:text-blue-400"
          >
            <img
              className="mr-2 h-6 w-auto"
              src={Logo.src}
              alt="Nexify Logo"
            />
            Nexify
          </Link>

          <p className="mt-6 max-w-md text-center text-sm leading-relaxed text-gray-400">
            {description
              ? description
              : `Want to create your own community? Experience
            hassle-free payouts and premium support.`}{' '}
            <Anchor
              underline="hover"
              href={`${process.env.NEXT_PUBLIC_HOST}/home`}
              className="font-medium text-blue-400 transition-colors duration-300 hover:text-blue-300"
              size="sm"
            >
              Create your own.
            </Anchor>
          </p>
        </div>
      </div>
    </footer> */
}
