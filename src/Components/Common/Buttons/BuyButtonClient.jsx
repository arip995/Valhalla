'use client';

import { useRedirectAfterPurchased } from '@/Utils/Hooks/hooks';
import BuyButton from '../Payment/BuyButton';

const BuyButtonClient = ({ children, ...props }) => {
  const redirectAfterPurchased =
    useRedirectAfterPurchased();
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
