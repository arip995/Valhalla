/* eslint-disable @next/next/no-img-element */
'use client';

import ListFiles from '@/Components/Common/ListFiles/ListFiles';
import BuyButton from '@/Components/Common/Payment/BuyButton';
import { StatusErrorTextMapping } from '@/Constants/ProductListingContants';
import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import lockImage from '../../../../public/images/locked-content/lock.png';

const ViewLockedContentDetails = ({ data }) => {
  const { user } = useUser();
  const productId = usePathname().split('/')[2];
  const productType = usePathname().split('/')[1];

  const [showLockedItems, setShowLockedItems] =
    useState(false);

  const onSuccess = async fetch => {
    if (fetch) {
      try {
        const { data } = await axiosInstance.post(
          '/purchase/check',
          { productId, productType, userId: user._id }
        );
        if (data?.ok) {
          setShowLockedItems(true);
        }
      } catch (error) {
        console.log();
      }
      return;
    }
    setShowLockedItems(true);
  };

  useEffect(() => {
    if (user?._id) {
      onSuccess(true);
    }
    if (window?.TelegramWebview) {
      setTimeout(() => {
        window.location.href = `intent://${window.location.href.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end;`;
      });
      window.close();
    }
  }, [user?._id]);

  return (
    <>
      {showLockedItems ? (
        <>
          <div className="mb-4 animate-[fadeIn_0.7s_ease-in-out] text-center">
            <div className="mb-2 inline-block rounded-full bg-green-100 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-600">
              Purchase Successful!
            </h2>
            <p className="text-gray-700">
              Thank you for your purchase. Your locked
              content is unlocked now!!!
            </p>
          </div>
        </>
      ) : null}
      <div className="vlc-view-product-container">
        {showLockedItems ? (
          <div className="vlc-view-product-unlocked-state relative h-full animate-[fadeIn_0.5s_ease-in-out] overflow-y-auto rounded-md border-2 border-gray-200 p-2 shadow-lg">
            <div className="pointer-events-none absolute inset-0 animate-[pulse_5s_ease-in-out_infinite] bg-gradient-to-r from-green-50 via-transparent to-green-50 opacity-50"></div>
            {data.message ? (
              <div className="relative z-10 mb-2">
                {data.message}
              </div>
            ) : null}
            {data.files ? (
              <div className="relative z-10">
                <ListFiles
                  files={data.files}
                  showDownloadButton
                />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="vlc-view-product-locked-state relative h-full overflow-hidden bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 transition-all duration-700 ease-in-out">
            <div className="absolute inset-0 animate-[pulse_3s_ease-in-out_infinite] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/30 to-transparent opacity-80"></div>
            <div className="absolute inset-0 animate-[spin_15s_linear_infinite] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-300 via-slate-600 to-indigo-300 opacity-40 mix-blend-overlay"></div>

            {/* Floating particles effect */}
            <div className="absolute inset-0">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="absolute rounded-full bg-white/60 blur-sm"
                  style={{
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center">
              <img
                src={lockImage.src}
                alt=""
                className="vlc-view-product-locked-state-image mb-4 h-24 w-24 animate-[bounce_2s_ease-in-out_infinite] animate-[glow_3s_ease-in-out_infinite] transition-all duration-300 hover:scale-110"
              />
              <div className="shadow-text relative z-10 flex flex-col items-center justify-center gap-3 text-center font-bold">
                <div className="text-xl text-white drop-shadow-lg">
                  Content is locked
                </div>
                <div className="rounded-full border border-white/20 bg-white/20 px-2 py-1 text-base text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/30">
                  {data.files.length
                    ? `${data.files.length + 1} items`
                    : `1 item`}{' '}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showLockedItems ? null : (
        <BuyButton
          animate={data.status === 1 ? true : false}
          disabled={data.status !== 1}
          price={data?.price}
          creatorId={data.creatorId}
          productDetails={data}
          onSuccess={onSuccess}
          color={data.status === 1 ? 'violet' : 'black'}
        >
          {data.status === 1
            ? `${`Unlock for ₹${data?.price}`}`
            : StatusErrorTextMapping[data.status]}{' '}
        </BuyButton>
      )}
      {/* <ViewLockedContentBuyButton data={data} /> */}
    </>
  );
};

export default ViewLockedContentDetails;
