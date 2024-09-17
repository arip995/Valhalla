import { ActionIcon, Button, rem } from '@mantine/core';
import {
  IconBook,
  IconBrandTelegram,
  IconFileSearch,
  IconLock,
  IconPlus,
} from '@tabler/icons-react';
import Link from 'next/link';
import React, { useState } from 'react';
import CreateProductModal from '../Header/CreateProductModal';

const EmptyStateOne = ({
  app = 'tg', //tg,lc,course
  isfilter = false,
  title,
  description,
  onClear = () => {},
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className="mx-auto flex min-h-[400px] w-full max-w-sm flex-col items-center justify-center px-6 py-4">
        <ActionIcon
          color={'black'}
          variant={'transparent'}
          size={62}
          radius="xl"
        >
          {isfilter ? (
            <IconFileSearch
              style={{
                strokeWidth: 1,
                height: rem(42),
                width: rem(42),
              }}
            />
          ) : (
            <>
              {app === 'tg' ? (
                <IconBrandTelegram
                  style={{
                    strokeWidth: 1,
                    height: rem(42),
                    width: rem(42),
                  }}
                />
              ) : app === 'lc' ? (
                <IconLock
                  style={{
                    strokeWidth: 1,
                    height: rem(42),
                    width: rem(42),
                  }}
                />
              ) : app === 'course' ? (
                <IconBook
                  style={{
                    strokeWidth: 1,
                    height: rem(42),
                    width: rem(42),
                  }}
                />
              ) : null}
            </>
          )}
        </ActionIcon>
        <h2 className="mt-5 font-semibold text-gray-800">
          {title ? (
            title
          ) : (
            <>
              {isfilter ? (
                <>No products found!</>
              ) : (
                <>
                  {' '}
                  No published{' '}
                  {app === 'tg'
                    ? 'telegram community'
                    : app === 'lc'
                      ? 'locked content'
                      : 'course'}
                </>
              )}
            </>
          )}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {description ? (
            description
          ) : (
            <>
              {isfilter ? (
                <>
                  Try changing your filters to
                  <br />
                  see products
                </>
              ) : (
                <>
                  No{' '}
                  {app === 'tg'
                    ? 'telegram community'
                    : app === 'lc'
                      ? 'locked content'
                      : 'course'}{' '}
                  yet? No problem! Create a new{' '}
                  {app === 'tg'
                    ? 'telegram community'
                    : app === 'lc'
                      ? 'locked content'
                      : 'course'}{' '}
                  and start earning.
                </>
              )}
            </>
          )}
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {isfilter ? (
            <Button
              onClick={onClear}
              variant="default"
              radius="lg"
            >
              Clear filter
            </Button>
          ) : (
            <>
              {app === 'course' ? (
                <Button
                  radius="lg"
                  variant="default"
                  onClick={() => {
                    setOpened(true);
                  }}
                  leftSection={
                    <IconPlus
                      style={{
                        height: rem(20),
                        width: rem(20),
                      }}
                    />
                  }
                >
                  Create Course
                </Button>
              ) : (
                <Link
                  href={`/create/${app === 'tg' ? 'telegram' : 'lockedcontent'}`}
                >
                  <Button
                    radius="lg"
                    variant="default"
                    leftSection={
                      <IconPlus
                        style={{
                          height: rem(20),
                          width: rem(20),
                        }}
                      />
                    }
                  >
                    {app === 'tg'
                      ? 'Create Telegram Community'
                      : app === 'lc'
                        ? 'Create Locked Content'
                        : 'Create Course'}
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      {!!opened && (
        <CreateProductModal
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
        />
      )}
    </>
  );
};

export default EmptyStateOne;
