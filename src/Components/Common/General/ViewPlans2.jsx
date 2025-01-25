'use client';

import {
  CalculatePeriodString,
  CurrencySymbolMapping,
} from '@/Constants/constants';
import { discountPercentage } from '@/Utils/Common';
import { Badge, Button } from '@mantine/core';
import BuyButton from '../Payment/BuyButton';
import { useEffect, useState } from 'react';
import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';
import { usePathname } from 'next/navigation';
import { IconBrandTelegram } from '@tabler/icons-react';
import { isTMA } from '@telegram-apps/bridge';

const ViewPlans2 = ({ data, onPay = () => {} }) => {
  const { user } = useUser();
  const productId = usePathname().split('/')[2];
  const [purchasedData, setPurchasedData] = useState(false);

  const onSuccess = async () => {
    try {
      const { data } = await axiosInstance.post(
        '/purchase/check',
        { productId, userId: user._id, productType: 'tg' }
      );
      if (data?.ok) {
        setPurchasedData(data.data);
      }
    } catch (error) {
      console.log();
    }
    return;
  };
  const testIsTelegram = async () => {
    if (await isTMA()) {
      console.log("It's Telegram Mini Apps");
      axiosInstance.post('/test/console', {
        data: { isTMA },
      });
    }
  };

  useEffect(() => {
    if (user?._id) {
      onSuccess();
    }
    if (window?.TelegramWebview) {
      window.location.href = `intent://${window.location.href.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end;`;
      axiosInstance.post('/test/console', {
        data: { tele: window?.TelegramWebview },
      });
    }
    testIsTelegram();
  }, [user?._id]);

  if (!data.subscriptionPlans?.length) return null;
  return (
    <div
      className="flex w-full flex-col gap-3"
      onClick={onPay}
    >
      {purchasedData?.inviteLink ? (
        <div className="flex items-center justify-center p-4">
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
      ) : null}
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
              className="mt-2 w-fit"
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
