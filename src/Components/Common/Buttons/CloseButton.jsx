'use client';

import { ActionIcon, rem, Tooltip } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const CloseButton = ({ className }) => {
  const router = useRouter();
  const productType = usePathname().split('/')[2];
  return (
    <Tooltip
      label="Exit"
      position="right"
      events={{ hover: true, focus: true, touch: true }}
    >
      <ActionIcon
        variant="default"
        className={classNames(
          '!fixed left-2 top-2 z-[200]',
          className
        )}
        size="lg"
        radius="lg"
        onClick={e => {
          router.push(`/app/${productType}`);
          e.stopPropagation();
        }}
      >
        <IconArrowLeft
          stroke={1}
          color="black"
          style={{ width: rem(20), height: rem(20) }}
        />
      </ActionIcon>
    </Tooltip>
  );
};

export default CloseButton;
