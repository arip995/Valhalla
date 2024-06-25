import { IconPlus } from '@tabler/icons-react';
import '../../../styles/common/header.css';
import React from 'react';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '../ThemeToogle/ThemeToogle';

const Header = ({ title, path }) => {
  const router = useRouter();

  return (
    <div className="apps-header-container">
      <div className={`apps-header `}>
        {!!title && (
          <div className="apps-header-title">{title}</div>
        )}
        {!!path && (
          <div className="flex gap-2">
            <Button
              leftSection={<IconPlus size={20} />}
              variant="light"
              radius="xl"
              size="xs"
              className="create-button"
              onClick={() => router.push(path)}
            >
              Create {title}
            </Button>
            {/* <ThemeToggle /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
