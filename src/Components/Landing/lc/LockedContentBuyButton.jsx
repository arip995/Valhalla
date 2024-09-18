'use client';

import { statusErrorTextMapping } from '@/Constants/ProductListingContants';
import BuyButton from './BuyButton';

const LockedContentBuyButton = ({ data }) => {
  return (
    <BuyButton
      animate={data.status === 1 ? true : false}
      disabled={data.status !== 1}
      onClick={() => {}}
    >
      {data.status === 1
        ? `${`Unlock for ₹${data?.price}`}`
        : statusErrorTextMapping[data.status]}{' '}
    </BuyButton>
  );
};

export default LockedContentBuyButton;
