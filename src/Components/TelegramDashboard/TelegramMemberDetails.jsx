import { TelegramSubscriberStatusMapping } from '@/Constants/constants';
import { formatDate, getFullName } from '@/Utils/Common';
import {
  IconBrandRedux,
  IconCalendar,
  IconLink,
  IconMail,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import CustomCopyButton from '../Common/Buttons/CustomCopyButton';

const TelegramMemberDetails = ({ item }) => {
  const url = `https://t.me/${item.inviteLink}`;
  if (!item) return null;

  return (
    <div className="flex w-full flex-col gap-4 p-4">
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
      {/* <div className="flex items-start justify-between">
        <div className="flex items-center gap-1">
          <IconUser className="h-4 w-4" /> Telegram Name
        </div>
        <div className="text-sm text-gray-600">
          {getFullName(
            item.joineeTelegramDetails?.first_name,
            item.joineeTelegramDetails?.last_name
          )}
        </div>
      </div> */}
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
          <CustomCopyButton value={url} />
        </div>
      </div>
    </div>
  );
};

export default TelegramMemberDetails;
