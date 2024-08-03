'use client';

import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import classNames from 'classnames';
import Link from 'next/link';
import classes from '../../../styles/common/header.module.css';

const Header = ({ title, path, className }) => {
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
        {/* <ThemeToggle /> */}
      </div>
    </div>
  );
};

export default Header;
