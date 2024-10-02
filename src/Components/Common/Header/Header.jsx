'use client';

import { Button, Tabs } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import classNames from 'classnames';
import Link from 'next/link';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useState } from 'react';
import CreateProductModal from '../Modal/CreateProductModal';

const Header = ({
  title,
  path,
  modal = false,
  withTab = false,
  className,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div
        className={classNames(
          'z-[95] h-[52px] w-full border-b border-solid border-b-[#dee2e6] bg-white p-[11px] shadow-sm',
          className
        )}
      >
        <div className="flex items-center justify-between">
          {!!title && (
            <div className="text-lg font-semibold">
              {title}
            </div>
          )}
          {path ? (
            <Link href={path}>
              <Button
                leftSection={<IconPlus size={20} />}
                variant="light"
                radius="xl"
                size="xs"
              >
                Create {title}
              </Button>
            </Link>
          ) : modal ? (
            <Button
              leftSection={<IconPlus size={20} />}
              variant="light"
              radius="xl"
              size="xs"
              onClick={() => {
                setOpened(true);
              }}
            >
              Create {title}
            </Button>
          ) : null}

          {/* <ThemeToggle /> */}
        </div>
      </div>
      {withTab ? (
        <Tabs
          radius="xs"
          value={tab || 'profile'}
          className="bg-white"
          onChange={val => {
            router.push(`/account?tab=${val}`);
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="profile">Profile</Tabs.Tab>
            <Tabs.Tab value="payment">Payment</Tabs.Tab>
            <Tabs.Tab value="billing">Billing</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      ) : null}
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

export default Header;
