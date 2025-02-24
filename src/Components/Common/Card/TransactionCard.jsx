import { formatDate } from '@/Utils/Common';
import { Card } from '@mantine/core';
import {
  IconAward,
  IconCalendar,
  IconListDetails,
  IconUser,
} from '@tabler/icons-react';

const TransactionCard = ({
  item,
  onItemClick = () => {},
}) => {
  return (
    <Card
      padding="md"
      radius="lg"
      shadow="md"
      withBorder
      className="cursor-pointer hover:bg-gray-50"
      onClick={() => onItemClick(item)}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-base font-semibold text-gray-800">
          <IconAward size={20} className="text-gray-600" />
          {item.status == 1
            ? item.productType === 'tg'
              ? 'Purchased subscription'
              : 'Purchase successful'
            : 'Purchase cancelled'}
        </span>
        <div className="text-base font-semibold text-gray-800">
          ₹{item.amountPaid}
        </div>
      </div>

      {/* Date Section */}
      <div className="mt-4 flex items-center space-x-2 text-gray-600">
        <IconCalendar size={20} className="text-gray-600" />
        <span className="text-sm">
          {formatDate(item.createdAt)}
        </span>
      </div>

      {/* User Section */}
      <div className="mt-4 flex flex-col gap-4">
        <button className="text-md flex items-center">
          <IconUser
            size={20}
            className="mr-2 text-gray-600"
          />
          <span className="text-violet-800">View user</span>
        </button>
        <button className="text-md flex items-center">
          <IconListDetails
            size={20}
            className="mr-2 text-gray-600"
          />
          <span className="text-violet-800">
            View breakup
          </span>
        </button>
      </div>
    </Card>
  );
};

export default TransactionCard;
