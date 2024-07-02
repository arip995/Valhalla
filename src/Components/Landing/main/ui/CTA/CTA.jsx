'use client';

import GradientWrapper from '../../GradientWrapper';
import Image from 'next/image';
import NavLink from '../NavLink';
import BgPattern from '../../../../../../public/images/main/bg-pattern.webp';
import LayoutEffect from '../../LayoutEffect';

const CTA = () => (
  <section>
    <GradientWrapper wrapperClassName="max-w-xs h-[13rem] top-12 inset-0">
      <div className="custom-screen relative py-12 sm:py-16">
        <LayoutEffect
          className="delay-300 duration-1000"
          isInviewState={{
            trueState: 'opacity-1',
            falseState: 'opacity-0 translate-y-6',
          }}
        >
          <div className="relative z-10">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-semibold text-gray-50 sm:text-4xl">
                Unleash the power of monetization solutions
              </h2>
              <p className="mt-5 text-gray-300">
                Nexify is the perfect answer! Our
                comphrensive platform enables you to create
                highly targeted products that are tailored
                to each individual subscriber.
              </p>
            </div>
            <div className="mt-5 flex justify-center text-sm font-medium">
              <NavLink
                href="/#pricing"
                className="flex items-center bg-purple-600 text-white hover:bg-purple-500 active:bg-purple-700"
              >
                Start now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </NavLink>
            </div>
          </div>
        </LayoutEffect>
        <Image
          width={1274}
          height={456}
          src={BgPattern.src}
          className="pointer-events-none absolute inset-0 m-auto h-full w-full object-cover"
          alt="Background pattern"
        />
      </div>
    </GradientWrapper>
  </section>
);

export default CTA;
