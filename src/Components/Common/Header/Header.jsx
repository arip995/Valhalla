import { IconPlus } from '@tabler/icons-react';
import '../../../styles/common/header.css';
import React from 'react';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

const Header = ({
  title,
  path = '/create/lockedcontent',
}) => {
  const router = useRouter();

  return (
    <div className="apps-header-container">
      <div className="apps-header">
        <div className="apps-header-title">
          {title || 'Premium Content'}
        </div>
        <Button
          leftSection={<IconPlus size={20} />}
          variant="light"
          radius="xl"
          size="xs"
          className="create-button"
          onClick={() => router.push(path)}
        >
          Create {title || 'Locked Content'}
        </Button>
      </div>
    </div>
  );
};

export default Header;
