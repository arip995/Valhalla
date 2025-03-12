'use client';

import useUser from '@/Utils/Hooks/useUser';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const LandingPageButton = ({ type, ...props }) => {
  const { user } = useUser();
  const redirect = user?._id ? 'home' : 'signup';
  const redirectTitle = user?._id ? 'Dashboard' : 'Signup';

  if (redirectTitle === 'Dashboard') {
    return (
      <Link href={`/${redirect}`} {...props}>
        {type ? (
          <button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/30 hover:opacity-90">
            {redirectTitle}
          </button>
        ) : (
          <button className="flex w-full transform items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 text-base font-medium text-white shadow-lg shadow-purple-500/30 transition-transform hover:scale-105 hover:opacity-90 sm:w-auto">
            Start Free Trial
            <IconChevronRight className="ml-2 h-5 w-5" />
          </button>
        )}
      </Link>
    );
  }
};

export default LandingPageButton;
