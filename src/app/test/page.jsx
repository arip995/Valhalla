'use client';

import AuthModal from '@/Components/Auth/LandingAuth/AuthModal';
import { Button } from '@mantine/core';
import { useState } from 'react';

const page = () => {
  const [opened, setOpened] = useState(false);
  const googleOauth = () => {
    const currentUrl = window.location.href;
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/google/auth?redirect=${encodeURIComponent(currentUrl)}`;
  };

  return (
    <>
      <div className="mt-20 flex w-full justify-center">
        <Button onClick={() => setOpened(true)}>
          Signin
        </Button>
      </div>
      <AuthModal
        opened={opened}
        onClose={() => setOpened(false)}
        onAuthComplete={() => {
          setOpened(false);
        }}
      />
    </>
  );
};

export default page;
