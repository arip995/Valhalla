'use client';

import React from 'react';
import BuyButton from './BuyButton';
import { getUserData } from '@/Utils/getuserData';
import { statusErrorTextMapping } from '@/Constants/ProductListingContants';

const LockedContentBuyButton = ({ data }) => {
  const user =
    typeof window !== 'undefined' ? getUserData() : '';
  const isCreatorBuyer = user._id == data._id;

  return (
    <BuyButton
      animate={data.status === 1 ? true : false}
      disabled={data.status !== 1}
    >
      {data.status === 1
        ? `${isCreatorBuyer ? 'Edit page' : `Unlock for ₹${data?.price}`}`
        : statusErrorTextMapping[data.status]}{' '}
    </BuyButton>
  );
};

export default LockedContentBuyButton;
