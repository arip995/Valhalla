import { Loader } from '@mantine/core';
import React from 'react';

const loading = () => {
  return (
    <div className="fixed flex h-svh w-full items-center justify-center">
      <Loader color="blue" />
    </div>
  );
};

export default loading;
