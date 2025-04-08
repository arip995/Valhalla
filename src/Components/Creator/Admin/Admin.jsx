'use client';

import ProductListing from '@/Components/Apps/ProductListing/ProductListing';
import { formatDate, getFullName } from '@/Utils/Common';
import { Drawer } from '@mantine/core';
import {
  IconBrandRedux,
  IconCalendar,
  IconCoinRupee,
  IconMail,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';
import AdminCreatorDetails from './AdminCreatorDetails';

const TableHeaderItems = [
  {
    title: 'Created on',
    icon: IconCalendar,
    value: 'createdOn',
  },
  { title: 'Name', icon: IconUser, value: 'name' },
  {
    title: 'Fee %',
    icon: IconBrandRedux,
    value: 'platformFee',
  },
  {
    title: 'Earnings',
    icon: IconCoinRupee,
    value: 'totalEarnings',
  },
  {
    title: 'Email',
    icon: IconMail,
    value: 'email',
  },
  {
    title: 'Phone',
    icon: IconPhone,
    value: 'phoneNumber',
  },
];

const renderTableDataCell = ({ type, item }) => {
  if (!item) return null;
  switch (type) {
    case 'name':
      return (
        <td className="flex max-w-72 items-center gap-2">
          <div className="truncate">
            {getFullName(item.firstName, item.lastName) ||
              '---'}
          </div>
        </td>
      );
    case 'email':
      return (
        <td className="min-w-36">{item.email || '---'}</td>
      );
    case 'phoneNumber':
      return (
        <td className="min-w-36">
          {item.phoneNumber || '---'}
        </td>
      );
    case 'createdOn':
      return (
        <td className="min-w-36">
          {formatDate(item.createdAt)}
        </td>
      );
    case 'platformFee':
      return (
        <td className="min-w-36">
          {item.platformFee || '---'}
        </td>
      );
    case 'totalEarnings':
      return (
        <td className="min-w-36">
          {(item?.wallet?.totalEarnings || 0).toFixed(2) ||
            '---'}
        </td>
      );
    default:
      return null;
  }
};

const Admin = () => {
  const [activeCreator, setActiveCreator] = useState(null);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <ProductListing
        renderTableDataCell={renderTableDataCell}
        showOnlyGridViewInMobile={false}
        TableHeaderItems={TableHeaderItems}
        baseUrl="/admin/get_creator_data"
        initialStatus={[1, 2, 3]}
        showSearch={false}
        showStatus={false}
        showLayoutChange={false}
        showActions={false}
        menuType={0}
        searchPlaceholder="Search by name, email, or referral code"
        onRowClick={item => {
          setActiveCreator(item);
          setOpened(true);
        }}
      />
      {/* {!!activeCreator && ( */}
      <Drawer
        trapFocus={false}
        lockScroll={false}
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        title="Creator Details"
        size="xl"
      >
        <AdminCreatorDetails data={activeCreator} />
      </Drawer>
      {/* )} */}
    </>
  );
};

export default Admin;
