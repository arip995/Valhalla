import { Button, Paper, rem } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import CloseButton from '../Common/Buttons/CloseButton';

const TelegramDashboardOpenlink = ({ data }) => {
  return (
    <Paper
      shadow="md"
      withBorder
      className="sticky top-0 z-20 flex w-full items-center justify-evenly gap-4 p-4"
    >
      <CloseButton className="!relative !left-0 !top-0" />
      <Link
        href={`/tg/${data._id}`}
        passHref
        legacyBehavior
      >
        <Button
          leftSection={<span />}
          justify="space-between"
          rightSection={
            <IconExternalLink
              style={{ height: rem(20), width: rem(20) }}
              stroke={1.5}
              color="white"
            />
          }
          fullWidth
        >
          Open Preview
        </Button>
      </Link>
    </Paper>
  );
};

export default React.memo(TelegramDashboardOpenlink);
