'use client';

import HeaderWrapper from '@/Components/Auth/HeaderWrapper';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import Logo from '../../../../public/icons/neifyiconsmall.webp';
import IconPageNotFound from '../../../../public/icons/pagenotfound.svg';

const NotFoundOne = () => {
  const router = useRouter();

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-start bg-white px-4 md:px-8">
      <div className="mx-auto max-w-lg text-gray-600">
        <div className="flex w-full flex-col items-center gap-8">
          <HeaderWrapper
            titleOne={
              <div className="flex select-none items-center gap-2 text-[30px] font-black text-black">
                <img
                  className="h-8 w-auto"
                  src={Logo.src}
                  alt="Nexify"
                />
                Nexify
              </div>
            }
          />
          <img
            src={IconPageNotFound.src}
            alt=""
            className="mb-8 h-60 w-60"
          />
        </div>
        <div className="space-y-3 text-center">
          <p className="text-4xl font-semibold text-gray-800 sm:text-5xl">
            Page not found
          </p>
          <p>
            Sorry, the page you are looking for could not be
            found or has been removed.
          </p>
        </div>
        <div className="my-8">
          <div className="flex w-full justify-center">
            <Button
              onClick={() => {
                router.push('/home');
              }}
            >
              Back to Homepage
            </Button>
          </div>
          {/* <ListBlocks /> */}
        </div>
      </div>
    </div>
  );
};

export default NotFoundOne;
