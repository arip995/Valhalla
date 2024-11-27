'use client';

import ProductListing from '@/Components/Apps/ProductListing/ProductListing';
import { formatDate } from '@/Utils/Common';
import { Drawer } from '@mantine/core';
import {
  IconCalendar,
  IconMail,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';
import AudienceDetails from './AudienceDetails';

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
            {item.name || '---'}
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

const Audience = () => {
  const [activeAudience, setActiveAudience] =
    useState(null);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <ProductListing
        renderTableDataCell={renderTableDataCell}
        TableHeaderItems={TableHeaderItems}
        baseUrl="/audience/list"
        initialStatus={[1, 2, 3]}
        showSearch={true}
        showStatus={false}
        showLayoutChange={false}
        menuType={0}
        onRowClick={item => {
          setActiveAudience(item);
          setOpened(true);
        }}
      />
      <Drawer
        trapFocus={false}
        lockScroll={false}
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        title="Audience Details"
      >
        <AudienceDetails data={activeAudience} />
      </Drawer>
    </>
  );
};

export default Audience;
