'use client';

import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import CreateProductModal from '../Modal/CreateProductModal';

const Header = ({
  title,
  path,
  modal = false,
  className,
}) => {
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
