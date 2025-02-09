'use client';

import ProductListing from '@/Components/Apps/ProductListing/ProductListing';
import { TelegramSubscriberStatusMapping } from '@/Constants/constants';
import { formatDate, getFullName } from '@/Utils/Common';
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
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';
import TelegramMemberDetailsCard from '../Common/Card/TelegramMemberDetailsCard';
import {
  ActionIcon,
  CopyButton,
  Drawer,
  rem,
  Tooltip,
} from '@mantine/core';
import TelegramMemberDetails from './TelegramMemberDetails';

const TableHeaderItems = [
  { title: 'Name', icon: IconUser, value: 'name' },
  {
    title: 'Invite Link',
    icon: IconLink,
    value: 'inviteLink',
  },
  {
    title: 'Status',
    icon: IconBrandRedux,
    value: 'status',
  },
  {
    title: 'Email',
    icon: IconMail,
    value: 'email',
  },
  {
    title: 'Phone Number',
    icon: IconPhone,
    value: 'phoneNumber',
  },
  {
    title: 'Start Date',
    icon: IconCalendar,
    value: 'startDate',
  },
  {
    title: 'Expiry Date',
    icon: IconCalendar,
    value: 'expiryDate',
  },
];

const renderTableDataCell = ({ type, item }) => {
  if (!item) return null;
  switch (type) {
    case 'name':
      return (
        <td className="flex max-w-72 items-center gap-2">
          <div className="truncate">
            {getFullName(
              item.userDetails.firstName,
              item.userDetails.firstName
            )}
          </div>
        </td>
      );
    case 'inviteLink':
      return (
        <td className="min-w-36">
          <div className="flex items-center text-sm text-gray-600">
            {`https://t.me/${item.inviteLink}`}
            <CopyButton
              value={`https://t.me/${item.inviteLink}`}
              timeout={2000}
            >
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
                      copy();
                      e.stopPropagation();
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
        </td>
      );
    case 'status':
      return (
        <td className="min-w-40">
          {TelegramSubscriberStatusMapping[item.status]}
        </td>
      );
    case 'email':
      return (
        <td className="min-w-36">
          <div className="flex w-full flex-col gap-1">
            {item.userDetails?.email || '---'}
          </div>
        </td>
      );
    case 'phoneNumber':
      return (
        <td className="min-w-44">
          <div className="flex w-full flex-col gap-1">
            +91 {item.userDetails?.phoneNumber || '---'}
          </div>
        </td>
      );
    case 'startDate':
      return (
        <td className="min-w-36">
          {formatDate(item.subscriptionRenewedAt)}
        </td>
      );
    case 'expiryDate':
      return (
        <td className="min-w-36">
          {formatDate(item.subscriptionExpiredAt)}
        </td>
      );
    default:
      return null;
  }
};

const TelegramDashboardMemberDetails = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const [activeSubscriber, setActiveSubscriber] =
    useState(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!tab) router.replace(`${pathName}?tab=transaction`);
  }, [tab]);

  if (!tab) return null;

  return (
    <>
      <div className="flex h-[calc(100vh-52px)] w-full flex-col md:h-screen">
        <ProductListing
          renderTableDataCell={renderTableDataCell}
          TableHeaderItems={TableHeaderItems}
          baseUrl="/telegram/member_list"
          initialStatus={[1, 2]}
          showStatus={false}
          showHeader={false}
          showActions={false}
          showLayoutChange={false}
          menuType={0}
          onRowClick={item => {
            setActiveSubscriber(item);
            setOpened(true);
          }}
          showOnlyGridViewInMobile
          searchPlaceholder={'Search email or phone number'}
          customEmptyStateOne={
            <h2 className="mt-5 text-center font-semibold text-gray-800">
              No subscribers found
            </h2>
          }
          Component={TelegramMemberDetailsCard}
        />
      </div>
      <Drawer
        trapFocus={false}
        lockScroll={false}
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        title="Subscriber Details"
      >
        <TelegramMemberDetails item={activeSubscriber} />
      </Drawer>
    </>
  );
};

export default TelegramDashboardMemberDetails;
