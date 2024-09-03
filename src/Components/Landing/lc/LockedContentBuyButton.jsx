'use client';

import { statusErrorTextMapping } from '@/Constants/ProductListingContants';
import { getUserData } from '@/Utils/getuserData';
import { useParams, useRouter } from 'next/navigation';
import BuyButton from './BuyButton';

const LockedContentBuyButton = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const user =
    typeof window !== 'undefined' ? getUserData() : '';
  const isCreatorBuyer = user._id == data.creatorId;

  return (
    <BuyButton
      animate={data.status === 1 ? true : false}
      disabled={data.status !== 1}
      onClick={() => {
        if (isCreatorBuyer) {
          router.push(`/dashboard/tg/${params.id}`);
          return;
        }
      }}
    >
      {data.status === 1
        ? `${isCreatorBuyer ? 'Edit page' : `Unlock for ₹${data?.price}`}`
        : statusErrorTextMapping[data.status]}{' '}
    </BuyButton>
  );
};

export default LockedContentBuyButton;
