'use client';
import { Button } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import SectionWrapper from '../../SectionWrapper';
import LayoutEffect from '../../LayoutEffect';
import Link from 'next/link';
const Plans = [
  {
    name: 'Basic plan',
    desc: 'For new creators building their list',
    price: 0,
    isMostPop: false,
    features: [
      { isGiven: true, title: '1 community' },
      { isGiven: true, title: '1 payment Pages' },
      { isGiven: false, title: 'Custom website' },
      { isGiven: false, title: 'Email marketing' },
      { isGiven: false, title: 'Priority chat support' },
      { isGiven: false, title: '0 courses' },
    ],
  },
  {
    name: 'Starter',
    desc: 'Ideal for growing businesses',
    price: 500,
    isMostPop: true,
    features: [
      { isGiven: true, title: '5 courses' },
      { isGiven: true, title: '5 community' },
      { isGiven: true, title: 'Priority chat support' },
      { isGiven: true, title: 'Unlimited payment Pages' },
      { isGiven: false, title: 'Custom website' },
      { isGiven: false, title: 'Email marketing' },
    ],
  },
  {
    name: 'Business',
    desc: 'Built for marketing managers',
    price: 3000,
    isMostPop: false,
    features: [
      { isGiven: true, title: 'Custom website' },
      { isGiven: true, title: 'Email marketing' },
      { isGiven: true, title: 'Unlimited courses' },
      { isGiven: true, title: 'Unlimited communities' },
      { isGiven: true, title: 'Priority chat support' },
      { isGiven: true, title: 'Unlimited payment Pages' },
    ],
  },
];

const PricingCard = ({ plan, isAnnual }) => {
  const annualDiscount = 0.8; // 20% discount for annual Plans
  const monthlyPrice = plan.price;
  const annualPrice = Math.round(
    plan.price * 12 * annualDiscount
  );

  return (
    <div
      className={`flex flex-col rounded-lg bg-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
        plan.isMostPop
          ? 'border-2 border-violet-400'
          : 'border border-gray-700'
      }`}
    >
      {plan.isMostPop && (
        <span className="mb-4 inline-block rounded-full bg-violet-500 px-3 py-1 text-xs font-semibold uppercase text-white">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold text-white">
        {plan.name}
      </h3>
      <p className="mt-2 text-gray-400">{plan.desc}</p>
      <div className="my-6">
        <span className="text-4xl font-bold text-white">
          ₹{isAnnual ? annualPrice : monthlyPrice}
        </span>
        <span className="text-gray-400">
          /{isAnnual ? 'year' : 'month'}
        </span>
      </div>
      <ul className="mb-6 space-y-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            {feature.isGiven ? (
              <IconCheck className="mr-2 h-5 w-5 text-green-400" />
            ) : (
              <IconX className="mr-2 h-5 w-5 text-red-400" />
            )}
            <span
              className={
                feature.isGiven
                  ? 'text-gray-300'
                  : 'text-gray-500'
              }
            >
              {feature.title}
            </span>
          </li>
        ))}
      </ul>
      <Link href="/signup">
        <Button
          className={`mt-auto w-full rounded-full text-white ring-offset-2 focus:ring ${
            plan.isMostPop
              ? 'bg-violet-600 hover:bg-violet-500 focus:bg-violet-700'
              : 'bg-gray-700 hover:bg-gray-600 focus:bg-gray-800'
          }`}
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <SectionWrapper id="pricing">
      <LayoutEffect
        className="delay-300 duration-1000"
        isInviewState={{
          trueState: 'opacity-1',
          falseState: 'opacity-0 translate-y-12',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-100 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              {`Choose the plan that's right for your business`}
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <div className="relative inline-flex rounded-full bg-gray-100 p-0.5">
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium ${
                  !isAnnual
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium ${
                  isAnnual
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {Plans.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan}
                isAnnual={isAnnual}
              />
            ))}
          </div>
        </div>
      </LayoutEffect>
    </SectionWrapper>
  );
};

export default Pricing;
