import { Button, rem } from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  IconExternalLink,
  IconShare,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import Share from '../Common/General/Share';

const TelegramDashboardOpenlink = ({ data }) => {
  return (
    <div className="flex w-full gap-2">
      <Button
        rightSection={<span />}
        justify="space-between"
        leftSection={
          <IconShare
            style={{ height: rem(20), width: rem(20) }}
            stroke={1.5}
          />
        }
        fullWidth
        variant="light"
        onClick={() => {
          modals.open({
            title: 'Share on Social',
            children: (
              <div className="pb-4 pt-8">
                <Share
                  url={`${process.env.NEXT_PUBLIC_HOST}/tg/${data._id}`}
                />
              </div>
            ),
          });
        }}
      >
        Share
      </Button>
      <Link
        href={`/tg/${data._id}`}
        passHref
        legacyBehavior
      >
        <Button
          rightSection={<span />}
          justify="space-between"
          leftSection={
            <IconExternalLink
              style={{ height: rem(20), width: rem(20) }}
              stroke={1.5}
            />
          }
          fullWidth
          variant="light"
        >
          Open Preview
        </Button>
      </Link>
    </div>
  );
};

export default React.memo(TelegramDashboardOpenlink);
