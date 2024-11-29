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
import CreateProductModal from '../Modal/CreateProductModal';

const APP_TYPES = {
  TG: 'tg',
  LC: 'lc',
  COURSE: 'course',
};

const APP_ICONS = {
  [APP_TYPES.TG]: IconBrandTelegram,
  [APP_TYPES.LC]: IconLock,
  [APP_TYPES.COURSE]: IconBook,
};

const APP_NAMES = {
  [APP_TYPES.TG]: 'telegram community',
  [APP_TYPES.LC]: 'locked content',
  [APP_TYPES.COURSE]: 'course',
};

const EmptyStateOne = ({
  app = APP_TYPES.TG,
  isFilter = false,
  isApp = false,
  title,
  description,
  onClear = () => {},
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const AppIcon = APP_ICONS[app] || null;
  const appName = APP_NAMES[app] || '';

  const renderIcon = () => {
    if (isFilter || isApp) {
      return (
        <IconFileSearch
          style={{
            strokeWidth: 1,
            height: rem(42),
            width: rem(42),
          }}
        />
      );
    }
    return AppIcon ? (
      <AppIcon
        style={{
          strokeWidth: 1,
          height: rem(42),
          width: rem(42),
        }}
      />
    ) : null;
  };

  const renderTitle = () => {
    if (title) return title;
    return isFilter
      ? 'No products found!'
      : `No published ${appName}`;
  };

  const renderDescription = () => {
    if (description) return description;
    if (isFilter) {
      return (
        <>
          Try changing your filters to
          <br />
          see products
        </>
      );
    }
    return (
      <>
        No {appName} yet? No problem! Create a new {appName}{' '}
        and start earning.
      </>
    );
  };

  const renderButton = () => {
    if (isApp) return null;

    if (isFilter) {
      return (
        <Button
          onClick={onClear}
          variant="default"
          radius="lg"
        >
          Clear filter
        </Button>
      );
    }

    const buttonProps = {
      radius: 'lg',
      variant: 'default',
      leftSection: (
        <IconPlus
          style={{ height: rem(20), width: rem(20) }}
        />
      ),
    };

    if (app === APP_TYPES.COURSE) {
      return (
        <Button
          {...buttonProps}
          onClick={() => setIsModalOpen(true)}
        >
          Create Course
        </Button>
      );
    }

    const href = `/create/${app === APP_TYPES.TG ? 'tg' : 'lc'}`;
    return (
      <Link href={href}>
        <Button {...buttonProps}>
          {app === APP_TYPES.TG
            ? 'Create Telegram Community'
            : 'Create Locked Content'}
        </Button>
      </Link>
    );
  };

  return (
    <>
      <div className="mx-auto flex min-h-[400px] w-full max-w-sm flex-col items-center justify-center px-6 py-4">
        <ActionIcon
          color="black"
          variant="transparent"
          size={62}
          radius="xl"
        >
          {renderIcon()}
        </ActionIcon>
        <h2 className="mt-5 text-center font-semibold text-gray-800">
          {renderTitle()}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {renderDescription()}
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {renderButton()}
        </div>
      </div>
      {isModalOpen && (
        <CreateProductModal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default EmptyStateOne;
