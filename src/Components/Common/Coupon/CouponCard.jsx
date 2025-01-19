// import React from 'react';
// import {
//   Card,
//   Text,
//   Switch,
//   Button,
//   Group,
//   Stack,
//   Paper,
//   Badge,
// } from '@mantine/core';
// import {
//   IconEdit,
//   IconShare,
//   IconTicket,
// } from '@tabler/icons-react';

// const CouponCard = ({
//   code = 'SUMMER2025',
//   discountType = 1,
//   discountValue = 20,
//   usedCount = 0,
//   salesGenerated = 0,
//   enabled = true,
// }) => {
//   const formatDiscountType = (type, value) => {
//     if (type === 1) {
//       return `${value}% OFF`;
//     } else if (type === 2) {
//       return `₹${value} OFF`;
//     }
//     return '';
//   };

//   const discount = formatDiscountType(
//     discountType,
//     discountValue
//   );

//   return (
//     <div className="w-full">
//       <Card className="relative overflow-hidden border-l-4 border-blue-500 p-3">
//         {/* New modern edge design */}
//         <div className="absolute -left-1 top-0 h-full w-1">
//           <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-blue-500/20 to-transparent" />
//           <div className="absolute left-0 h-full w-0.5 bg-blue-500/10" />
//         </div>

//         <Stack className="space-y-3">
//           {/* Header Section */}
//           <div className="flex items-start justify-between">
//             <div className="space-y-0.5">
//               <Badge
//                 size="lg"
//                 radius="sm"
//                 className="px-2 py-1 text-xl"
//                 variant="outline"
//               >
//                 {discount}
//               </Badge>
//               <Text size="xs" className="text-gray-500">
//                 Limited time offer
//               </Text>
//             </div>
//             <Switch
//               checked={enabled}
//               size="sm"
//               onLabel="ON"
//               offLabel="OFF"
//             />
//           </div>

//           {/* Coupon Code Section */}
//           <Paper className="rounded-md bg-gray-50 p-2">
//             <div className="space-y-0.5">
//               <div className="flex items-center space-x-1">
//                 <IconTicket
//                   size={14}
//                   className="text-gray-500"
//                 />
//                 <Text size="xs" className="text-gray-500">
//                   Coupon Code
//                 </Text>
//               </div>
//               <Text className="font-mono text-lg font-bold">
//                 {code}
//               </Text>
//             </div>
//           </Paper>

//           {/* Stats Section */}
//           <div className="grid grid-cols-2 gap-2">
//             <Paper className="rounded-md bg-blue-50 p-2">
//               <div className="space-y-0.5">
//                 <Text size="xs" className="text-gray-600">
//                   Times Used
//                 </Text>
//                 <Text className="text-base font-bold text-blue-700">
//                   {usedCount}
//                 </Text>
//               </div>
//             </Paper>
//             <Paper className="rounded-md bg-green-50 p-2">
//               <div className="space-y-0.5">
//                 <Text size="xs" className="text-gray-600">
//                   Sales Generated
//                 </Text>
//                 <Text className="text-base font-bold text-green-700">
//                   ₹{salesGenerated}
//                 </Text>
//               </div>
//             </Paper>
//           </div>

//           {/* Actions */}
//           <Group position="right" spacing="xs">
//             <Button
//               variant="default"
//               leftSection={<IconEdit size={14} />}
//               className="hover:bg-gray-50"
//               size="xs"
//               compact
//             >
//               Edit
//             </Button>
//             <Button
//               variant="default"
//               leftSection={<IconShare size={14} />}
//               className="hover:bg-gray-50"
//               size="xs"
//               compact
//             >
//               Share
//             </Button>
//           </Group>
//         </Stack>
//       </Card>
//     </div>
//   );
// };

// export default CouponCard;

import React from 'react';
import {
  Card,
  Text,
  Switch,
  Button,
  Group,
} from '@mantine/core';
import { IconEdit, IconShare } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import Share from '../General/Share';

const CouponCard = ({
  coupon,
  onChangeStatus = () => {},
  onEdit = () => {},
}) => {
  if (!coupon || !coupon?.code) return null;

  return (
    <Card className="border-2 border-gray-100 p-2">
      <div className="flex flex-col space-y-2">
        {/* Header with discount and switch */}
        <div className="flex items-center justify-between">
          <Text className="text-lg font-bold">
            {coupon.code}
          </Text>
          <Switch
            checked={coupon.status == 1}
            size="sm"
            onChange={event =>
              onChangeStatus(
                coupon._id,
                event.currentTarget.checked
              )
            }
          />
        </div>

        {/* Coupon code */}
        <div className="flex items-center justify-between">
          <Text className="font-medium text-gray-700">
            {coupon.discountType === 1
              ? `${coupon.discountValue}% OFF`
              : `₹${coupon.discountValue} OFF`}
          </Text>
          <Text size="sm" className="text-gray-500">
            Times Used: {coupon.usedCount || 0}
          </Text>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <Group spacing="xs">
            <Button
              variant="subtle"
              size="xs"
              compact
              leftSection={<IconEdit size={14} />}
              onClick={() => onEdit(coupon)}
            >
              Edit
            </Button>
            <Button
              variant="subtle"
              size="xs"
              compact
              leftSection={<IconShare size={14} />}
              onClick={() => {
                modals.open({
                  title: 'Share on Social',
                  children: (
                    <div className="pb-4 pt-8">
                      <Share
                        url={`${process.env.NEXT_PUBLIC_HOST}/${coupon.productType || 'tg'}/${coupon.productId}`}
                      />
                    </div>
                  ),
                });
              }}
            >
              Share
            </Button>
          </Group>
        </div>
      </div>
    </Card>
  );
};

export default CouponCard;
