'use client';

import NewScrollArea from '@/Components/Common/General/NewScrollArea';
import ViewPlans1 from '@/Components/Common/General/ViewPlans1';
import { statusErrorTextMapping } from '@/Constants/ProductListingContants';
import { Button, Drawer } from '@mantine/core';
import { useState } from 'react';

const GLManagePlans = ({ data }) => {
  const [openBottomSheet, setOpenBottomSheet] =
    useState(false);

  // useEffect(() => {
  //   if (
  //     window.innerWidth < 768 &&
  //     !openBottomSheet &&
  //     data.status === 1
  //   ) {
  //     setOpenBottomSheet(true);
  //   }
  // }, []);

  return (
    <>
      <div className="top-4 hidden flex-col gap-3 md:sticky md:flex">
        <ViewPlans1
          data={data}
          onPay={() => {}}
          onSelect={plan => {
            console.log(plan);
          }}
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full border-t-2 border-gray-100 bg-white px-2 py-4 shadow-md md:hidden">
        <div className="flex w-full max-w-[768px] items-center gap-8">
          <Button
            onClick={() => setOpenBottomSheet(true)}
            disabled={data.status !== 1}
            fullWidth
          >
            {data.status === 1
              ? 'Select a plan'
              : statusErrorTextMapping[data.status]}
          </Button>
        </div>
      </div>

      <Drawer
        trapFocus={false}
        lockScroll={false}
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
            data={data}
            onPay={() => {}}
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
