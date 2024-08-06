'use client';
import NewScrollArea from '@/Components/Common/General/NewScrollArea';
import ViewPlans1 from '@/Components/Common/General/ViewPlans1';
import { Button, Drawer } from '@mantine/core';
import { IconLayoutBottombarCollapse } from '@tabler/icons-react';
import { useState } from 'react';

const GLManagePlans = ({ data }) => {
  const [openBottomSheet, setOpenBottomSheet] =
    useState(false);

  // useEffect(() => {
  //   if (window.innerWidth < 768 && !openBottomSheet) {
  //     setOpenBottomSheet(true);
  //   }
  // }, []);

  return (
    <>
      <div className="top-[71.5px] hidden flex-col gap-3 p-2 md:sticky md:flex">
        <ViewPlans1
          plans={data.subscriptionPlans}
          defaultSelect={data.subscriptionPlans[0]._id}
          onSelect={plan => {
            console.log(plan);
          }}
        />
      </div>

      <div className="block w-full border-t-2 border-gray-100 bg-white px-2 py-4 md:hidden">
        <div className="sticky bottom-0 flex w-full max-w-[768px] items-center gap-8">
          <Button
            fullWidth
            onClick={() => setOpenBottomSheet(true)}
          >
            Select a plan
          </Button>
        </div>
      </div>
      <Drawer
        opened={openBottomSheet}
        onClose={() => setOpenBottomSheet(false)}
        position="bottom"
        size="100%"
        title="Select a plan"
        scrollAreaComponent={NewScrollArea}
        padding="0px"
        closeButtonProps={{
          icon: (
            <IconLayoutBottombarCollapse
              stroke={1.5}
              size={24}
            />
          ),
        }}
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
