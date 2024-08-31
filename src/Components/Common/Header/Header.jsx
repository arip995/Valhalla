'use client';

import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import classNames from 'classnames';
import Link from 'next/link';

const Header = ({ title, path, className }) => {
  return (
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
        {!!path && (
          <div className="flex gap-2">
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
          </div>
        )}
        {/* <ThemeToggle /> */}
      </div>
    </div>
  );
};

export default Header;
