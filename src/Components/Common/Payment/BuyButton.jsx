'use client';

import AuthModal from '@/Components/Auth/LandingAuth/AuthModal';
import useUser from '@/Utils/Hooks/useUser';
import { Button } from '@mantine/core';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import Lottie from 'react-lottie-player';
import lottieJson from '../../../../public/lottie/tick.json';
import LayoutLoading from '../Loading/LayoutLoading';
import usePayment from './usePayments';

const BuyButton = ({
  className,
  children,
  onClick = () => {},
  animate = true,
  price,
  ...props
}) => {
  const lottieRef = useRef();
  const { user } = useUser();
  const [opened, setOpened] = useState(false);
  const { onCreateOrder, paymentState } = usePayment(
    () => {
      onClick();
    },
    () => {
      console.log('first');
    }
  );

  if (paymentState.loading) {
    return (
      <>
        {paymentState.purchaseSuccessful ? (
          <div
            className="fixed left-0 top-0 z-[10000000] flex h-svh w-full items-center justify-center bg-white"
            ref={lottieRef}
          >
            <Lottie
              loop
              play
              speed={0.5}
              animationData={lottieJson}
              style={{ width: 120, height: 120 }}
            />
          </div>
        ) : (
          <LayoutLoading overlay size="xl" />
        )}
      </>
    );
  }

  return (
    <>
      <Button
        loading={paymentState?.payinLoading}
        onClick={() => {
          if (!user?._id) {
            setOpened(true);
          } else {
            onCreateOrder(price);
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
