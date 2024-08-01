import { Button, Paper, rem, Text } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const TelegramDashboardOpenlink = ({ data }) => {
  return (
    <Paper
      withBorder
      className="sticky top-0 z-20 w-full p-4"
    >
      <Text size="md" className="mb-2" fw={600}>
        Page overview
      </Text>
      <Link
        href={`/tg/${data._id}`}
        passHref
        legacyBehavior
      >
        <a target="_blank">
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
            Open link
          </Button>
        </a>
      </Link>
    </Paper>
  );
};

export default React.memo(TelegramDashboardOpenlink);
