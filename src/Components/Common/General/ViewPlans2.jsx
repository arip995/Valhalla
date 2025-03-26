'use client';

import {
  CalculatePeriodString,
  CurrencySymbolMapping,
} from '@/Constants/constants';
import axiosInstance from '@/Utils/AxiosInstance';
import { discountPercentage } from '@/Utils/Common';
import useUser from '@/Utils/Hooks/useUser';
import { Badge } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import AfterPurchaseTelegramModal from '../Card/AfterPurchaseTelegramModal';
import BuyButton from '../Payment/BuyButton';

const ViewPlans2 = ({ data, onPay = () => {} }) => {
  const productId = usePathname().split('/')[2];
  const { user } = useUser();
  const [purchasedData, setPurchasedData] = useState(false);
  const [opened, setOpened] = useState(false);
  const intervalRef = useRef(null);

  const onSuccess = async () => {
    try {
      const { data } = await axiosInstance.post(
        '/purchase/check',
        { productId, userId: user._id, productType: 'tg' }
      );
      if (data?.ok) {
        setPurchasedData(data.data);
        if (
          !data.data.hasSeenSuccessModal &&
          data.data.inviteLink
        ) {
          setOpened(true);
        }
      } else {
        setPurchasedData(false);
        setOpened(false);
      }
    } catch (error) {
      console.log();
    }
    return;
  };

  const onClose = async () => {
    setOpened(false);
  };

  const setupInterval = inviteLink => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (inviteLink) {
      intervalRef.current = setInterval(() => {
        onSuccess();
      }, 5000);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setupInterval(purchasedData?.inviteLink);
  }, [purchasedData?.inviteLink]);

  useEffect(() => {
    if (user?._id) {
      onSuccess();
    }
    if (window?.TelegramWebview) {
      setTimeout(() => {
        window.location.href = `intent://${window.location.href.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end;`;
      });
      window.close();
    }
  }, [user?._id]);

  if (!data.subscriptionPlans?.length) return null;

  return (
    <div
      className="flex w-full flex-col gap-3"
      onClick={onPay}
    >
      {purchasedData?.inviteLink ? (
        <AfterPurchaseTelegramModal
          opened={opened}
          onClose={onClose}
          inviteLink={purchasedData.inviteLink}
        />
      ) : null}
      {/* {purchasedData?.inviteLink ? (
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-green-600">
              Purchase Successful!
            </h2>
            <p className="text-gray-700">
              Thank you for your purchase. You can now join
              the Telegram group to get started.
            </p>
          </div>
          <a
            href={`https://t.me/${purchasedData.inviteLink}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button
              variant="filled"
              color="blue"
              size="md"
              radius="xl"
              fullWidth
              leftSection={<IconBrandTelegram />}
            >
              Join Now
            </Button>
          </a>
        </div>
      ) : null} */}
      {data.subscriptionPlans.map(plan => {
        return (
          <div
            className="flex w-full flex-col items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4"
            key={plan._id}
          >
            {plan.enableDiscountedPrice ? (
              <Badge className="text-sm" color="yellow.6">
                Save{' '}
                {`${discountPercentage(plan.cost, plan.discountedCost)}`}
              </Badge>
            ) : null}
            <div className="flex items-center gap-1">
              {plan.enableDiscountedPrice ? (
                <div
                  className="text-xs text-gray-500 line-through"
                  size="xs"
                >
                  {CurrencySymbolMapping['rupees']}
                  {plan.cost}
                </div>
              ) : null}
              <div className="text-md font-semibold text-gray-900">
                {CurrencySymbolMapping['rupees']}
                {plan.enableDiscountedPrice
                  ? plan.discountedCost
                  : plan.cost}
              </div>
            </div>
            <div className="text-md font-semibold text-gray-900">
              {`${CalculatePeriodString(
                plan.planType,
                plan.days
              )}`}
            </div>

            <BuyButton
              className="mt-2 !w-fit"
              color="teal"
              animate={false}
              creatorId={data.creatorId}
              creatorDetails={data.creatorDetails}
              bookingData={{
                subscription: {
                  ...plan,
                },
              }}
              price={
                plan.enableDiscountedPrice
                  ? plan.discountedCost
                  : plan.cost
              }
              productDetails={data}
              onSuccess={onSuccess}
            >
              BUY NOW
            </BuyButton>
          </div>
        );
      })}
    </div>
  );
};

export default ViewPlans2;
