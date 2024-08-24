'use client';

import { Button } from '@mantine/core';

const page = () => {
  const googleOauth = () => {
    const currentUrl = window.location.href;
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/google/auth?redirect=${encodeURIComponent(currentUrl)}`;
  };
  return (
    <div className="mt-20 flex w-full justify-center">
      <Button onClick={() => googleOauth()}>Signin</Button>
    </div>
  );
};

export default page;
