'use client';

import { Button } from '@mantine/core';
import classNames from 'classnames';
import React from 'react';

const BuyButton = ({ className, props, children }) => {
  return (
    <Button
      className={classNames(
        'animate-shimmer bg-[linear-gradient(110deg,#7950f2,45%,#ffffff50,55%,#7950f2)] bg-[length:200%_100%]',
        className
      )}
      fullWidth
      {...props}
    >
      {children}
    </Button>
  );
};

export default BuyButton;
