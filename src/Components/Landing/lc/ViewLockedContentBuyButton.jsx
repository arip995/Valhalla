'use client';

import BuyButton from '@/Components/Common/Buttons/BuyButton';
import { statusErrorTextMapping } from '@/Constants/ProductListingContants';

const ViewLockedContentBuyButton = ({ data }) => {
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

export default ViewLockedContentBuyButton;