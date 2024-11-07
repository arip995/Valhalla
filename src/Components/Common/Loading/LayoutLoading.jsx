import { Loader } from '@mantine/core';
import classNames from 'classnames';
import React from 'react';

const LayoutLoading = ({ overlay = false, ...props }) => {
  return (
    <div
      className={classNames(
        'fixed left-0 top-0 flex h-svh w-full items-center justify-center',
        { 'z-[10000000] bg-white': overlay }
      )}
    >
      <Loader {...props} />
    </div>
  );
};

export default LayoutLoading;
