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
          <div className="text-center">
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
          <div className="vlc-view-product-unlocked-state h-full overflow-y-auto rounded-md border-2 border-gray-200 p-2 shadow-lg">
            {data.message ? (
              <div className="mb-2">{data.message}</div>
            ) : null}
            {data.files ? (
              <ListFiles
                files={data.files}
                showDownloadButton
              />
            ) : null}
          </div>
        ) : (
          <div className="vlc-view-product-locked-state h-full bg-gradient-to-r from-teal-100 via-fuchsia-200 to-slate-100">
            <img
              src={lockImage.src}
              alt=""
              className="vlc-view-product-locked-state-image"
            />
            <div className="flex flex-col items-center justify-center gap-2 text-center text-sm font-semibold text-black">
              Content is locked
              <div>
                {data.files.length
                  ? `${data.files.length + 1} items`
                  : `1 item`}{' '}
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
