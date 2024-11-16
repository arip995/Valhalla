'use client';

import { redirectAfterPurchased } from '@/Utils/CommonClient';
import BuyButton from '../Payment/BuyButton';

const BuyButtonClient = ({ children, ...props }) => {
  return (
    <BuyButton
      onSuccess={redirectAfterPurchased}
      {...props}
    >
      {children}
    </BuyButton>
  );
};

export default BuyButtonClient;
