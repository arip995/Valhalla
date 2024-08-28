'use client';

import NewScrollArea from '@/Components/Common/General/NewScrollArea';
import ViewPlans1 from '@/Components/Common/General/ViewPlans1';
import { statusErrorTextMapping } from '@/Constants/ProductListingContants';
import useUser from '@/Utils/Hooks/useUser';
import { Drawer } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BuyButton from '../../lc/BuyButton';

const GLManagePlans = ({ data }) => {
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();
  const isCreatorBuyer = user?._id === data.creatorId;
  const [openBottomSheet, setOpenBottomSheet] =
    useState(false);

  useEffect(() => {
    if (
      window.innerWidth < 768 &&
      !openBottomSheet &&
      data.status === 1
    ) {
      setOpenBottomSheet(true);
    }
  }, []);

  return (
    <>
      <div className="top-[71.5px] hidden flex-col gap-3 p-2 md:sticky md:flex">
        <ViewPlans1
          isCreatorBuyer={isCreatorBuyer}
          data={data}
          onPay={() => {
            if (isCreatorBuyer) {
              router.push(`/dashboard/tg/${params.id}`);
              return;
            }
          }}
          onSelect={plan => {
            console.log(plan);
          }}
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full border-t-2 border-gray-100 bg-white px-2 py-4 shadow-md md:hidden">
        <div className="flex w-full max-w-[768px] items-center gap-8">
          <BuyButton
            animate={false}
            onClick={() => setOpenBottomSheet(true)}
            disabled={data.status !== 1}
          >
            {data.status === 1
              ? 'Select a plan'
              : statusErrorTextMapping[data.status]}
          </BuyButton>
        </div>
      </div>
      <Drawer
        className="tgd-add-plan"
        scrollAreaComponent={NewScrollArea}
        padding="0px"
        opened={openBottomSheet}
        onClose={() => setOpenBottomSheet(false)}
        position="bottom"
        size="100%"
        title="Select a plan"
      >
        <div className="flex flex-col gap-3 p-2">
          <ViewPlans1
            isCreatorBuyer={isCreatorBuyer}
            data={data}
            onPay={() => {
              if (isCreatorBuyer) {
                router.push(`/dashboard/tg/${params.id}`);
                return;
              }
            }}
            onSelect={plan => {
              console.log(plan);
            }}
          />
        </div>
      </Drawer>
    </>
  );
};

export default GLManagePlans;
