'use client';

import { IconPlus } from '@tabler/icons-react';
import classes from '../../../styles/common/header.module.css';
import React from 'react';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '../ThemeToogle/ThemeToogle';
import classNames from 'classnames';
import Link from 'next/link';

const Header = ({ title, path, className }) => {
  const router = useRouter();

  return (
    <div
      className={classNames(
        classes.appsHeaderContainer,
        className
      )}
    >
      <div className={classes.appsHeader}>
        {!!title && (
          <div className={classes.appsHeaderTitle}>
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
                className={classes.createButton}
              >
                Create {title}
              </Button>
            </Link>
          </div>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
