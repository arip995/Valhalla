'use client';

import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';
import { Button } from '@mantine/core';
// import Member from '@/Components/Test/Member';
// import axiosInstance from '@/Utils/AxiosInstance';
// import { Button } from '@mantine/core';

// const handleClick = async () => {
//   const res = await axiosInstance.post(
//     '/webhook/settlement',
//     {
//       data: {
//         settlement: {
//           settlement_id: 3230270,
//           status: 'SUCCESS',
//           utr: 'AXISCN0957167283',
//           payment_amount: null,
//           settlement_initiated_on:
//             '2025-04-08T11:00:57+05:30',
//           settled_on: '2025-04-08T11:42:06+05:30',
//           reason: null,
//           adjustment: 0,
//           settlement_amount: 35397.94,
//           service_charge: 0,
//           service_tax: 0,
//           amount_settled: 35397.94,
//           payment_from: '2025-04-07T00:07:31+05:30',
//           payment_till: '2025-04-07T17:26:48+05:30',
//           settlement_type: null,
//           remarks: null,
//           settlement_charge: null,
//           settlement_tax: null,
//         },
//       },
//       event_time: '2025-04-08T11:42:07+05:30',
//       type: 'VENDOR_SETTLEMENT_SUCCESS',
//     }
//   );
//   console.log(res);
// };
// const page = () => {
//   return (
// <div className="flex h-screen flex-col items-center justify-center">
//   <Button onClick={handleClick}>Click me</Button>
// </div>
//   );
// };

// export default page;

const handleClick = async user => {
  axiosInstance
    .post('/vendor/adjust_balance', {
      amount: 10,
      userId: user?._id,
      remarks: 'Test',
    })
    .then(res => {
      console.log(res);
    });
};

const page = () => {
  const { user } = useUser();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Button onClick={() => handleClick(user)}>
        Click me
      </Button>
    </div>
  );
};

export default page;
