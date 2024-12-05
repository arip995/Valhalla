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
  price,
  animate = true,
  creatorId,
  creatorDetails,
  bookingData,
  productDetails,
  onSuccess = () => {},
  ...props
}) => {
  const lottieRef = useRef();
  const { user } = useUser();
  const [opened, setOpened] = useState(false);
  const { onCreateOrder, paymentState, purchased } =
    usePayment(onSuccess);

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
        disabled={!purchased && productDetails.status == 6}
        onClick={() => {
          if (!user?._id) {
            setOpened(true);
          } else {
            onCreateOrder(
              price,
              creatorId,
              creatorDetails,
              bookingData
            );
          }
        }}
        className={classNames(
          `${animate ? 'animate-shimmer bg-[linear-gradient(110deg,#7950f2,45%,#ffffff50,55%,#7950f2)] bg-[length:200%_100%]' : ''} `,
          className
        )}
        fullWidth
        {...props}
      >
        {purchased
          ? 'Start Learning'
          : productDetails.status == 6
            ? 'Sale Ended'
            : children}
      </Button>
      {!!opened && (
        <AuthModal
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
