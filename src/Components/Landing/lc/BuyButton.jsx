'use client';

import { Button } from '@mantine/core';
import classNames from 'classnames';
import React from 'react';

const BuyButton = ({
  className,
  children,
  onClick = () => {},
  animate = true,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      className={classNames(
        `${animate ? 'animate-shimmer bg-[linear-gradient(110deg,#7950f2,45%,#ffffff50,55%,#7950f2)] bg-[length:200%_100%]' : ''} `,
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
