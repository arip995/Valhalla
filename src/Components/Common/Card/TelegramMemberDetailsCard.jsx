import { TelegramSubscriberStatusMapping } from '@/Constants/constants';
import { formatDate, getFullName } from '@/Utils/Common';
import {
  ActionIcon,
  Card,
  CopyButton,
  rem,
  Tooltip,
} from '@mantine/core';
import {
  IconBrandRedux,
  IconCalendar,
  IconCheck,
  IconCopy,
  IconLink,
  IconMail,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';

const TelegramMemberDetailsCard = ({
  item,
  onItemClick = () => {},
}) => {
  const url = `https://telegram.me/${item.inviteLink}`;

  if (!item) return null;

  return (
    <Card
      padding="md"
      radius="lg"
      shadow="md"
      withBorder
      className="min-w-96 cursor-pointer hover:bg-gray-50"
      onClick={() => onItemClick(item)}
    >
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <IconUser className="h-4 w-4" /> Name
          </div>
          <div className="text-sm text-gray-600">
            {getFullName(
              item.userDetails.firstName,
              item.userDetails.lastName
            )}
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <IconMail className="h-4 w-4" /> Mail
          </div>
          <div className="text-sm text-gray-600">
            <span>{item.email}</span>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <IconPhone className="h-4 w-4" /> Phone Number
          </div>
          <div className="text-sm text-gray-600">
            <span>+91 {item.phoneNumber}</span>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <IconUser className="h-4 w-4" /> Telegram Name
          </div>
          <div className="text-sm text-gray-600">
            {getFullName(
              item.joineeTelegramDetails?.first_name,
              item.joineeTelegramDetails?.last_name
            )}
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <IconCalendar className="h-4 w-4" /> Join date
          </div>
          <div className="text-sm text-gray-600">
            <span>
              {formatDate(item.subscriptionRenewedAt)}
            </span>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <IconCalendar className="h-4 w-4" /> Expiry date
          </div>
          <div className="text-sm text-red-600">
            <span>
              {formatDate(item.subscriptionExpiredAt)}
            </span>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <IconBrandRedux className="h-4 w-4" /> Status
          </div>
          <div className="text-sm text-gray-600">
            {TelegramSubscriberStatusMapping[item.status]}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-1">
            <IconLink className="h-4 w-4" /> Invite link
          </div>
          <div className="flex items-center text-sm text-gray-600">
            {url}
            <CopyButton value={url} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? 'Copied' : 'Copy'}
                  events={{
                    hover: true,
                    focus: true,
                    touch: true,
                  }}
                >
                  <ActionIcon
                    color={copied ? 'teal' : 'gray'}
                    variant="subtle"
                    onClick={e => {
                      e.stopPropagation();
                      copy();
                    }}
                  >
                    {copied ? (
                      <IconCheck
                        style={{ width: rem(16) }}
                      />
                    ) : (
                      <IconCopy
                        style={{ width: rem(16) }}
                      />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TelegramMemberDetailsCard;
