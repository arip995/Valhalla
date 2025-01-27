import { formatDate } from '@/Utils/Common';
import { Card } from '@mantine/core';
import {
  IconCalendar,
  IconCertificate,
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
      radius="md"
      withBorder
      className="cursor-pointer hover:bg-gray-50"
      onClick={() => onItemClick(item)}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <IconCertificate size={24} />
          {item.status == 1
            ? item.productType === 'tg'
              ? 'Purchased subscription'
              : 'Purchase successful'
            : 'Purchase failed'}
        </span>
        <div className="text-xl font-bold text-gray-900">
          ₹{item.amountPaid}
        </div>
      </div>

      {/* Date Section */}
      <div className="mt-4 flex items-center space-x-2 text-gray-600">
        <IconCalendar size={20} className="text-gray-500" />
        <span className="text-sm">
          {formatDate(item.createdAt)}
        </span>
      </div>

      {/* User Section */}
      <div className="mt-6 flex flex-col gap-4">
        <button className="text-md flex items-center font-medium">
          <IconUser size={20} className="mr-2" />
          <span className="text-violet-800">View user</span>
        </button>
        <button className="text-md flex items-center font-medium">
          <IconListDetails size={20} className="mr-2" />
          <span className="text-violet-800">
            View breakup
          </span>
        </button>
      </div>
    </Card>
  );
};

export default TransactionCard;
