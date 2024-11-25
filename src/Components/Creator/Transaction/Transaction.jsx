'use client';

import useProductListing from '@/Components/Apps/ProductListing/useProductListing';
import EmptyStateOne from '@/Components/Common/EmptyState/EmptyStateOne';
import EmptyStateTwo from '@/Components/Common/EmptyState/EmptyStateTwo';
import Filters from '@/Components/Common/Filters/Filters';
import Header from '@/Components/Common/Header/Header';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import CustomTable from '@/Components/Common/Table/CustomTables/CustomTable';
import { PaymentTabOptions } from '@/Constants/constants';
import {
  PaymentStatusMapping,
  StatusPaymentColorMapping,
} from '@/Constants/ProductListingContants';
import { formatDate } from '@/Utils/Common';
import {
  Badge,
  Drawer,
  Pagination,
  Select,
} from '@mantine/core';
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
            {PaymentStatusMapping[item.status]}
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
      return <div className=""></div>;
  }
};

const Transaction = () => {
  const pathName = usePathname();
  const router = useRouter();
  const {
    data,
    loading,
    status,
    limit,
    pageNo,
    onUpdate,
    tab,
  } = useProductListing('/transaction/list', [1, 2, 3]);
  const [activeTransaction, setActiveTransaction] =
    useState(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    router.push(`${pathName}?tab=transaction`);
  }, []);

  if (loading === -1) {
    return (
      <>
        <LayoutLoading />
      </>
    );
  }

  if (!data?.totalCount && !loading) {
    return (
      <>
        <EmptyStateTwo />
      </>
    );
  }

  if (!data?.totalCount) return null;

  return (
    <>
      <div className="flex h-[calc(100vh-52px)] w-full flex-col md:h-screen">
        <Header
          title={'Payments'}
          tabOptions={PaymentTabOptions}
        />
        <div
          className={
            'flex flex-1 flex-col items-end gap-4 overflow-y-auto p-4'
          }
        >
          {tab === 'transaction' ? (
            <>
              <Filters
                onUpdate={onUpdate}
                status={status}
                showSearch={false}
                showLayoutChange={false}
              />
              {data.totalQueryCount === 0 ? (
                <EmptyStateOne
                  isFilter
                  onClear={() => onUpdate('reset')}
                />
              ) : (
                <>
                  {loading ? (
                    <LayoutLoading />
                  ) : (
                    <CustomTable
                      tableHeaderItems={TableHeaderItems}
                      RenderTableDataCell={
                        renderTableDataCell
                      }
                      tableBodyItems={data.data}
                      showActions={false}
                      onRowClick={item => {
                        setActiveTransaction(item);
                        setOpened(true);
                      }}
                    />
                  )}
                </>
              )}

              <div
                className={`flex flex-wrap-reverse items-center gap-2 ${
                  Math.ceil(data.totalQueryCount / 10) ==
                    1 || loading
                    ? 'hidden'
                    : ''
                }`}
              >
                <Select
                  className="max-w-14"
                  size="xs"
                  withCheckIcon={false}
                  data={['10', '20', '50']}
                  value={limit.toString()}
                  onChange={(_, option) => {
                    if (!option?.value) return;
                    onUpdate('limit', Number(option.value));
                  }}
                />
                <Pagination
                  withEdges
                  total={Math.ceil(
                    data.totalQueryCount / limit
                  )}
                  value={pageNo}
                  onChange={value => {
                    onUpdate('page', value);
                  }}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
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
