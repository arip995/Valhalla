/* eslint-disable no-unused-vars */
import {
  IconBook,
  IconBrandWebflow,
  IconCalendar,
  IconCash,
  IconChartPie,
  IconCreditCard,
  IconLocation,
  IconMail,
  IconPalette,
  IconTicket,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';

const features = [
  {
    icon: IconBrandWebflow,
    title: 'Your Own Online Store / Website',
    price: '₹900/mo',
  },
  {
    icon: IconCreditCard,
    title: 'Multiple Payment Gateways',
    price: '₹800/mo',
  },
  {
    icon: IconBook,
    title: 'Course Builder',
    price: '₹1000/mo',
  },
  {
    icon: IconTicket,
    title: 'Host Events & Webinars',
    price: '₹700/mo',
  },
  //   {
  //     icon: IconCalendar,
  //     title: 'Offer 1-on-1 Sessions',
  //     price: '₹800/mo',
  //   },
  //   {
  //     icon: IconMail,
  //     title: 'Build Email & SMS Lists',
  //     price: '₹600/mo',
  //   },
  {
    icon: IconCash,
    title: 'Sell Digital Products',
    price: '₹400/mo',
  },
  {
    icon: IconUser,
    title: 'Launch Paid Communities',
    price: '₹500/mo',
  },
  {
    icon: IconPalette,
    title: 'Social Media Template Library',
    price: '₹300/mo',
  },
  {
    icon: IconChartPie,
    title: 'Audience Analytics',
    price: '₹400/mo',
  },
  //   {
  //     icon: IconLocation,
  //     title: 'Invite-Only City Meet-ups',
  //     price: '₹2000/mo',
  //   },
];
const packages = [
  {
    name: 'Basic',
    price: '999',
    features: [
      'Course Builder',
      'Digital Products',
      'Payment Gateway Integration',
      'Basic Analytics',
      'Email Support',
      'Mobile App Access',
    ],
  },
  {
    name: 'Professional',
    price: '1999',
    features: [
      'Everything in Basic',
      'Host Events & Webinars',
      'Community Features',
      'Advanced Analytics',
      'Priority Support',
      'Custom Domain',
      'Remove Nexify Branding',
    ],
  },
  {
    name: 'Enterprise',
    price: '4999',
    features: [
      'Everything in Professional',
      'White Label Solution',
      'API Access',
      'Dedicated Account Manager',
      'Custom Integration',
      'SLA Support',
      'Unlimited Storage',
    ],
  },
];

const CompareTable = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="max-w-5xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text pb-1 text-4xl font-bold text-transparent">
            Save Big with Nexify!
          </div>
          <p className="text-md mx-auto mb-8 max-w-xl text-gray-700">
            With Nexify, you save close to ₹50,000 a year,
            as it costs 10 times less than all the products
            you currently use.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-8 shadow-lg transition-all hover:shadow-xl"
              >
                <h3 className="mb-4 text-2xl font-bold text-gray-800">
                  {pkg.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-purple-600">
                    ₹{pkg.price}
                  </span>
                  <span className="text-gray-600">
                    /month
                  </span>
                </div>
                <ul className="mb-8 space-y-3">
                  {pkg.features.map(
                    (feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-left text-gray-600"
                      >
                        <svg
                          className="mr-2 h-5 w-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    )
                  )}
                </ul>
                <Link href={'/signup'}>
                  <div className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 text-center text-white transition-all hover:from-pink-500 hover:to-purple-600">
                    Buy Now
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* <div className="mt-12 text-center">
            <p className="text-lg font-semibold text-gray-700">
              What all of this usually costs:{' '}
              <span className="text-red-600 line-through">
                ₹10,000/month
              </span>
            </p>
            <p className="mt-4 text-xl font-extrabold text-gray-800">
              With Nexify, it costs you{' '}
              <span className="text-green-600">
                ₹1,000/month
              </span>
            </p>
            <Link href={'/signup'}>
              <div className="mt-6 cursor-pointer rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 text-white shadow-lg hover:bg-gradient-to-l">
                🎁 Start Your 7-Day Free Trial
              </div>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CompareTable;
