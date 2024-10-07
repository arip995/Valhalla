'use client';

import AuthModal from '@/Components/Auth/LandingAuth/AuthModal';
import useUser from '@/Utils/Hooks/useUser';
import { Button } from '@mantine/core';
import classNames from 'classnames';
import { useState } from 'react';
import usePayment from './usePayment';

const BuyButton = ({
  className,
  children,
  onClick = () => {},
  animate = true,
  price,
  ...props
}) => {
  const { user } = useUser();
  const [opened, setOpened] = useState(false);
  const { onPay } = usePayment(
    () => {
      onClick();
    },
    () => {
      console.log('error');
    }
  );

  return (
    <>
      <Button
        onClick={() => {
          if (!user?._id) {
            setOpened(true);
          } else {
            onPay(user?.phoneNumber, price);
          }
        }}
        className={classNames(
          `${animate ? 'animate-shimmer bg-[linear-gradient(110deg,#7950f2,45%,#ffffff50,55%,#7950f2)] bg-[length:200%_100%]' : ''} `,
          className
        )}
        fullWidth
        {...props}
      >
        {children}
      </Button>
      {!!opened && (
        <AuthModal
          signin
          opened={opened}
          onClose={() => setOpened(false)}
          onAuthComplete={() => {
            setOpened(false);
          }}
        />
      )}
    </>
  );
};

export default BuyButton;
