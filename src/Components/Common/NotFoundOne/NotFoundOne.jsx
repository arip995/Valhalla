'use client';

import { Button, Text } from '@mantine/core';
import React from 'react';
import ListBlocks from '../Blocks/ListBlocks';
import { useRouter } from 'next/navigation';

const NotFoundOne = () => {
  const router = useRouter();

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-start bg-white px-4 md:px-8">
      <div className="mx-auto max-w-lg text-gray-600">
        <div className="space-y-3 text-center">
          <Text size="lg" fw={500} c="grape.4">
            404 Error
          </Text>
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
                router.push('/creator/home');
              }}
            >
              Back to Homepage
            </Button>
          </div>
          <ListBlocks />
        </div>
      </div>
    </div>
  );
};

export default NotFoundOne;
