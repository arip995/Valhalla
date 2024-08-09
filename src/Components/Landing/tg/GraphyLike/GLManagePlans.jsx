'use client';
import NewScrollArea from '@/Components/Common/General/NewScrollArea';
import ViewPlans1 from '@/Components/Common/General/ViewPlans1';
import { Button, Drawer } from '@mantine/core';
// import { getUserData } from '@/Utils/getuserData';
// import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const GLManagePlans = ({ data }) => {
  // const user =
  //   typeof window !== 'undefined' ? getUserData() : '';
  // const router = useRouter();
  // const params = useParams();
  // const idCreatorBuyer = user._id === data.creatorId;
  const [openBottomSheet, setOpenBottomSheet] =
    useState(false);

  useEffect(() => {
    if (window.innerWidth < 768 && !openBottomSheet) {
      setOpenBottomSheet(true);
    }
  }, []);

  return (
    <>
      <div className="top-[71.5px] hidden flex-col gap-3 p-2 md:sticky md:flex">
        <ViewPlans1
          plans={data.subscriptionPlans}
          defaultSelect={data.subscriptionPlans[0]._id}
          // btnText={idCreatorBuyer ? 'Edit page' : ''}
          onPay={() => {
            // if (idCreatorBuyer) {
            //   router.push(`/dashboard/tg/${params.id}`);
            //   return;
            // }
          }}
          onSelect={plan => {
            console.log(plan);
          }}
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full border-t-2 border-gray-100 bg-white px-2 py-4 md:hidden">
        <div className="flex w-full max-w-[768px] items-center gap-8">
          <Button
            fullWidth
            onClick={() => setOpenBottomSheet(true)}
          >
            Select a plan
          </Button>
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
            plans={data.subscriptionPlans}
            defaultSelect={data.subscriptionPlans[0]._id}
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
