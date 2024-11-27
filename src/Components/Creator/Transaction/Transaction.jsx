'use client';

import ProductListing from '@/Components/Apps/ProductListing/ProductListing';
import {
  StatusPaymentMapping,
  StatusPaymentColorMapping,
} from '@/Constants/ProductListingContants';
import { formatDate } from '@/Utils/Common';
import { Badge, Drawer } from '@mantine/core';
import {
  IconBrandProducthunt,
  IconBrandRedux,
  IconCalendar,
  IconCoinRupee,
  IconMail,
} from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TransactionDetails from './TransactionDetails';

const TableHeaderItems = [
  { title: 'Date', icon: IconCalendar, value: 'date' },
  {
    title: 'Product',
    icon: IconBrandProducthunt,
    value: 'product',
  },
  {
    title: 'Status',
    icon: IconBrandRedux,
    value: 'status',
  },
  {
    title: 'Amount',
    icon: IconCoinRupee,
    value: 'amount',
  },
  {
    title: 'Customer Email',
    icon: IconMail,
    value: 'email',
  },
];

const renderTableDataCell = ({ type, item }) => {
  if (!item) return null;
  switch (type) {
    case 'product':
      return (
        <td className="flex max-w-72 items-center gap-2">
          <div className="truncate">
            {item.productDetails?.title}
          </div>
        </td>
      );
    case 'status':
      return (
        <td className="min-w-40">
          <Badge
            variant="dot"
            color={StatusPaymentColorMapping[item.status]}
            size="md"
          >
            {StatusPaymentMapping[item.status]}
          </Badge>
        </td>
      );
    case 'email':
      return (
        <td className="min-w-36">
          {item.buyerDetails?.email || '---'}
        </td>
      );
    case 'date':
      return (
        <td className="min-w-36">
          {formatDate(item.createdAt)}
        </td>
      );
    case 'amount':
      return (
        <td className="min-w-36">₹{item.amountPaid}</td>
      );
    default:
      return null;
  }
};

const Transaction = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [activeTransaction, setActiveTransaction] =
    useState(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    router.push(`${pathName}?tab=transaction`);
  }, []);

  return (
    <>
      <ProductListing
        renderTableDataCell={renderTableDataCell}
        TableHeaderItems={TableHeaderItems}
        baseUrl="/transaction/list"
        initialStatus={[1, 2, 3]}
        showSearch={false}
        showStatus={true}
        showLayoutChange={false}
        menuType={0}
        onRowClick={item => {
          setActiveTransaction(item);
          setOpened(true);
        }}
      />
      <Drawer
        trapFocus={false}
        lockScroll={false}
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        title="Transaction Details"
      >
        <TransactionDetails data={activeTransaction} />
      </Drawer>
    </>
  );
};

export default Transaction;
