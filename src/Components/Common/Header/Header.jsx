'use client';

import { Button, Tabs } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import classNames from 'classnames';
import Link from 'next/link';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useState } from 'react';
import CreateProductModal from '../Modal/CreateProductModal';

const Header = ({
  title,
  path,
  modal = false,
  tabOptions = [],
  className,
  Component = CreateProductModal,
  onClose = () => {},
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const productType = usePathname().split('/')[2];
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
      {tabOptions?.length ? (
        <Tabs
          radius="xs"
          value={tab || 'profile'}
          className="bg-white"
          onChange={val => {
            router.push(`${pathname}?tab=${val}`);
          }}
        >
          <Tabs.List>
            {tabOptions.map((item, i) => {
              return (
                <Tabs.Tab value={item.value} key={i}>
                  {item.label}
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
        </Tabs>
      ) : null}

      {!!opened && (
        <Component
          productType={productType}
          opened={opened}
          onClose={() => {
            setOpened(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default Header;
