'use client';

import ProductListing from '@/Components/Apps/ProductListing/ProductListing';
import Header from '@/Components/Common/Header/Header';
import { PaymentTabOptions } from '@/Constants/constants';
import {
  StatusPaymentColorMapping,
  StatusPaymentMapping,
} from '@/Constants/ProductListingContants';
import { formatDate, getUserId } from '@/Utils/Common';
import { Badge, Drawer } from '@mantine/core';
import {
  IconBrandProducthunt,
  IconBrandRedux,
  IconCalendar,
  IconCoinRupee,
  IconMail,
} from '@tabler/icons-react';
import classNames from 'classnames';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';
import TransactionDetails from './TransactionDetails';
import Wallet from './Wallet';
import TransactionCard from '@/Components/Common/Card/TransactionCard';

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
          {item.userDetails?.email || '---'}
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
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const [activeTransaction, setActiveTransaction] =
    useState(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!tab) router.replace(`${pathName}?tab=transaction`);
  }, [tab]);

  if (!tab) return null;

  return (
    <>
      <div className="flex h-[calc(100vh-52px)] w-full flex-col md:h-screen">
        <Header
          title={'Transactions'}
          tabOptions={PaymentTabOptions}
        />
        <div
          className={classNames({
            hidden: tab === 'transaction',
          })}
        >
          <Wallet />
        </div>
        <div
          className={classNames({
            hidden: tab === 'wallet',
          })}
        >
          {/* <Alert
            color="yellow"
            title="Important Notice"
            className="mx-4 my-2"
            radius="md"
          >
            Due to recent changes in our data storage
            system, transaction records displayed here will
            only show entries from today onwards. Previous
            transaction data has been processed, so there is
            no need to worry.
          </Alert> */}
          <ProductListing
            renderTableDataCell={renderTableDataCell}
            TableHeaderItems={TableHeaderItems}
            baseUrl="/transaction/list"
            initialStatus={[1, 2]}
            showSearch={false}
            showStatus={true}
            showHeader={false}
            showActions={false}
            menuType={0}
            onRowClick={item => {
              setActiveTransaction(item);
              setOpened(true);
            }}
            showOnlyGridViewInMobile
            Component={TransactionCard}
          />
        </div>
      </div>
      {getUserId() !== '67c87d932d02f0d24d5fa0b1' && (
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
      )}
    </>
  );
};

export default Transaction;
