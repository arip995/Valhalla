import { Loader } from '@mantine/core';
import classNames from 'classnames';
import React from 'react';

const LayoutLoading = ({
  overlay = false,
  loadingText = '',
  ...props
}) => {
  return (
    <div
      className={classNames(
        'fixed left-0 top-0 flex h-svh w-full items-center justify-center',
        { 'z-[10000000] bg-white': overlay }
      )}
    >
      <div className="flex w-full flex-col items-center gap-2">
        {!!loadingText && (
          <div className="font-bold">{loadingText}</div>
        )}
        <Loader {...props} />
      </div>
    </div>
  );
};

export default LayoutLoading;
