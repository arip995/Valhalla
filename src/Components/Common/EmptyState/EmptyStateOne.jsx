import { ActionIcon, Button, rem } from '@mantine/core';
import {
  IconBrandTelegram,
  IconFileSearch,
  IconLock,
  IconPlus,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const EmptyStateOne = ({
  isTelegram = true,
  isfilter = false,
  title,
  description,
  onClear = () => {},
}) => {
  return (
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
            {isTelegram ? (
              <IconBrandTelegram
                style={{
                  strokeWidth: 1,
                  height: rem(42),
                  width: rem(42),
                }}
              />
            ) : (
              <IconLock
                style={{
                  strokeWidth: 1,
                  height: rem(42),
                  width: rem(42),
                }}
              />
            )}
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
                {isTelegram
                  ? 'telegram community'
                  : 'locked content'}
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
                {isTelegram
                  ? 'telegram community'
                  : 'locked content'}{' '}
                yet? No problem! Create a new{' '}
                {isTelegram
                  ? 'telegram community'
                  : 'locked content'}{' '}
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
          <Link
            href={`/create/${isTelegram ? 'telegram' : 'lockedcontent'}`}
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
              {isTelegram
                ? 'Create Telegram Community'
                : 'Create Locked Content'}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyStateOne;
