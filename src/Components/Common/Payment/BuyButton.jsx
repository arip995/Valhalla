'use client';

import AuthModal from '@/Components/Auth/LandingAuth/AuthModal';
import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';
import { Button } from '@mantine/core';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import lottieJson from '../../../../public/lottie/tick.json';
import LayoutLoading from '../Loading/LayoutLoading';
import PaymentPreview from './PaymentPreview';
import usePayment from './usePayments';

const Lottie = dynamic(
  () => import('react-lottie-player'),
  {
    ssr: false, // Ensures Lottie loads only on the client
  }
);

const BuyButton = ({
  className,
  children = <></>,
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
  const [coupons, setCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAfterLogin, setOpenAfterLogin] =
    useState(false);
  const { onCreateOrder, paymentState, purchased } =
    usePayment(onSuccess);

  const fetchCoupons = async () => {
    try {
      const response = await axiosInstance.post(
        `/coupon/list`,
        { productId: productDetails._id, isPurchase: true }
      );
      setCoupons(response?.data?.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  useEffect(() => {
    if (user?._id && openAfterLogin?.price) {
      if (coupons.length > 0) {
        setIsModalOpen(true);
      } else {
        onCreateOrder(
          openAfterLogin.price,
          openAfterLogin.creatorId,
          openAfterLogin.creatorDetails,
          openAfterLogin.bookingData
        );
      }
    }
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) {
      fetchCoupons();
    }
  }, [user?._id]);

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
          <LayoutLoading
            overlay
            size="xl"
            loadingText="Please wait we are validating your payment...."
          />
        )}
      </>
    );
  }

  return (
    <>
      {purchased ? (
        <Link
          className="w-full"
          href={`/consume/course/${productDetails._id}`}
        >
          <Button
            fullWidth
            {...props}
            className={classNames(
              `${animate ? 'animate-shimmer bg-[linear-gradient(110deg,#7950f2,45%,#ffffff50,55%,#7950f2)] bg-[length:200%_100%]' : ''} `,
              className
            )}
          >
            {purchased ? 'Start Learning' : children}
          </Button>
        </Link>
      ) : (
        <Button
          loading={paymentState?.payinLoading}
          disabled={
            !purchased && productDetails.status == 6
          }
          onClick={() => {
            if (!user?._id) {
              setOpenAfterLogin({
                price,
                creatorId,
                creatorDetails,
                bookingData,
              });
              setOpened(true);
            } else {
              if (coupons.length > 0) {
                setIsModalOpen(true);
              } else {
                onCreateOrder(
                  price,
                  creatorId,
                  creatorDetails,
                  bookingData
                );
              }
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
      )}

      {!!opened && (
        <AuthModal
          opened={opened}
          onClose={() => setOpened(false)}
          onAuthComplete={() => {
            setOpened(false);
          }}
          isNameRequired={
            creatorId === '67f5001c7042ec5061a9ed19'
              ? false
              : true
          }
          // isEmailRequired={
          //   productDetails.isEmailRequired === false
          //     ? false
          //     : true
          // }
        />
      )}
      {!!isModalOpen && (
        <PaymentPreview
          price={price}
          title={productDetails.title}
          isCourse={productDetails.isCourse}
          course={productDetails.course}
          closeOnClickOutside={false}
          onPurchase={(
            price,
            isCouponApplied,
            couponDetails
          ) => {
            setIsModalOpen(false);
            onCreateOrder(
              price,
              creatorId,
              creatorDetails,
              bookingData,
              isCouponApplied,
              couponDetails
            );
          }}
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          email={user?.email}
          phoneNumber={user?.phoneNumber}
          productDetails={productDetails}
          subscription={bookingData.subscription}
        />
      )}
    </>
  );
};

export default BuyButton;
