'use client';
import CompleteProfileModal from '@/Components/Common/Modal/CompleteProfileModal';
import { Button } from '@mantine/core';
import { useState } from 'react';

const page = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpened(prev => !prev);
        }}
      >
        Complete your profile
      </Button>
      {!!opened && (
        <CompleteProfileModal
          opened={opened}
          onClose={() => setOpened(false)}
        />
      )}
    </>
  );
};

export default page;
