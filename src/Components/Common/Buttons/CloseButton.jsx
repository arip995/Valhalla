'use client';

import { ActionIcon, rem, Tooltip } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const CloseButton = () => {
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
        className="!fixed left-2 top-2"
        size="lg"
        radius="lg"
        onClick={() => router.push(`/app/${productType}`)}
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
