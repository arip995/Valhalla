'use client';

import EmptyStateTwo from '@/Components/Common/EmptyState/EmptyStateTwo';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import CustomTable from '@/Components/Common/Table/CustomTables/CustomTable';
import {
  PaymentStatusMapping,
  StatusPaymentColorMapping,
} from '@/Constants/ProductListingContants';
import { Badge, Pagination, Select } from '@mantine/core';
import useProductListing from '@/Components/Apps/ProductListing/useProductListing';
import EmptyStateOne from '@/Components/Common/EmptyState/EmptyStateOne';
import Filters from '@/Components/Common/Filters/Filters';
import Header from '@/Components/Common/Header/Header';
import { formatDate } from '@/Utils/Common';
import {
  IconBrandProducthunt,
  IconBrandRedux,
  IconCalendar,
  IconCoinRupee,
  IconMail,
} from '@tabler/icons-react';

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
          {/* <div className="h-10 min-h-max w-10 min-w-max overflow-hidden rounded-md">
            <img
              height={40}
              width={40}
              className={classNames(
                'h-10 rounded-md object-cover transition duration-300 ease-in-out hover:scale-110',
                {
                  hidden:
                    !item.productDetails?.coverImage?.url,
                }
              )}
              src={item.productDetails?.coverImage?.url}
            />
            <img
              height={40}
              width={40}
              className={classNames(
                'h-10 rounded-md transition duration-300 ease-in-out hover:scale-110',
                {
                  hidden:
                    item.productDetails?.coverImage?.url,
                }
              )}
              src={EmptyProductImage2.src}
            />
          </div> */}
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
  const { data, loading, status, limit, pageNo, onUpdate } =
    useProductListing('/transaction/list', [0, 1, 2, 3]);

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
    <div className="flex h-[calc(100vh-52px)] w-full flex-col md:h-screen">
      <Header title={'Payments'} />
      <div className="flex flex-1 flex-col items-end gap-4 overflow-y-auto px-4 py-4">
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
                RenderTableDataCell={renderTableDataCell}
                tableBodyItems={data.data}
                showActions={false}
              />
            )}
          </>
        )}

        <div
          className={`flex flex-wrap-reverse items-center gap-2 ${
            Math.ceil(data.totalQueryCount / 10) == 1 ||
            loading
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
            total={Math.ceil(data.totalQueryCount / limit)}
            value={pageNo}
            onChange={value => {
              onUpdate('page', value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
