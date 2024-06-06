import NavbarLayout from '@/src/Components/NavbarLayout/NavbarLayout';
import { Loader } from '@mantine/core';
import React from 'react';

const loading = () => {
  return (
    <NavbarLayout>
      <div className="h-svh w-full flex items-center justify-center">
        <Loader color="blue" />
      </div>
    </NavbarLayout>
  );
};

export default loading;
