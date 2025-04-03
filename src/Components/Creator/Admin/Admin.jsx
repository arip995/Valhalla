'use client';

import ProductListing from '@/Components/Apps/ProductListing/ProductListing';
import { formatDate, getFullName } from '@/Utils/Common';
import { Drawer } from '@mantine/core';
import {
  IconCalendar,
  IconMail,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';
import AdminCreatorDetails from './AdminCreatorDetails';

const TableHeaderItems = [
  { title: 'Name', icon: IconUser, value: 'name' },
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
    title: 'Created on',
    icon: IconCalendar,
    value: 'createdOn',
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
          const creatorData = {
            _id: item._id,
            name: getFullName(
              item.firstName,
              item.lastName
            ),
            email: item.email,
            phoneNumber: item.phoneNumber,
            username: item.username,
            referrerUsedCodeDetails:
              item.referrerUsedCodeDetails,
            wallet: item.wallet,
          };
          setActiveCreator(creatorData);
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
