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

const CompareTable = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="max-w-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text pb-1 text-4xl font-bold text-transparent">
            Save Big with Nexify!
          </div>
          <p className="text-md mx-auto mb-8 max-w-xl text-gray-700">
            With Nexify, you save close to ₹50,000 a year,
            as it costs 10 times less than all the products
            you currently use.
          </p>

          <div className="overflow-hidden rounded-lg shadow-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="px-4 py-3 text-sm text-gray-800">
                        <div className="flex items-center space-x-3">
                          <Icon
                            className="min-h-5 min-w-5 text-purple-600"
                            stroke={1}
                          />
                          <span className="text-left text-sm">
                            {feature.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-left text-sm text-gray-600 line-through">
                        {feature.price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-gray-700">
              What all of this usually costs:{' '}
              <span className="text-green-600">
                ₹50,000/year
              </span>
            </p>
            <p className="mt-4 text-xl font-extrabold text-gray-800">
              With Nexify, it costs you 10 times less!
            </p>
            <Link href={'/signup'}>
              <div className="mt-6 cursor-pointer rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 text-white shadow-lg hover:bg-gradient-to-l">
                🎁 Start Your 7-Day Free Trial
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareTable;
