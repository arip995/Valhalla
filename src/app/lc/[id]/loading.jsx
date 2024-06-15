import { Loader } from '@mantine/core';
import React from 'react';

const loading = () => {
  return (
    <div className="h-svh w-full fixed flex items-center justify-center">
      <Loader color="blue" />
    </div>
  );
};

export default loading;
