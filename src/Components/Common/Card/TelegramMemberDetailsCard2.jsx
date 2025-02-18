import { TelegramSubscriberStatusMapping } from '@/Constants/constants';
import {
  daysToMonthAndWeeks,
  formatDate,
  getFullName,
} from '@/Utils/Common';
import { Badge, Card } from '@mantine/core';
import { IconPhone, IconUser } from '@tabler/icons-react';

const TelegramMemberDetailsCard2 = ({
  item,
  onItemClick = () => {},
}) => {
  //   const url = `https://t.me/${item.inviteLink}`;
  const days = item.subscriptions?.[0].days;
  const amountPaid = item.subscriptions?.[0].amountPaid;
  console.log(item);
  if (!item || !days || !amountPaid) return null;

  return (
    <Card
      padding="md"
      radius="md"
      shadow="md"
      withBorder
      className="cursor-pointer hover:bg-gray-50"
      onClick={() => onItemClick(item)}
    >
      <div className="flex w-full flex-col gap-3 text-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <IconUser className="h-4 w-4" />{' '}
            {getFullName(
              item.userDetails.firstName,
              item.userDetails.lastName
            )}
          </div>
          <span className="text-sm text-gray-600">
            {formatDate(item.subscriptionRenewedAt, false)}
          </span>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div className="ellipsis flex items-center gap-1 text-sm text-gray-600">
                <IconPhone className="h-4 w-4" />{' '}
                <span>+91 {item.phoneNumber}</span>
              </div>
              <div className="ellipsis text-xs text-gray-600"></div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1">
                <Badge
                  variant="light"
                  color="yellow"
                  size="md"
                >
                  {daysToMonthAndWeeks(days)}
                </Badge>
                {
                  TelegramSubscriberStatusMapping[
                    item.status
                  ]
                }
              </div>
              <div className="ellipsis text-xs text-gray-600"></div>
            </div>
          </div>
          <div className="text-base font-semibold">
            ₹{amountPaid}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TelegramMemberDetailsCard2;
