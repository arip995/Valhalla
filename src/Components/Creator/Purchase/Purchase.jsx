'use client';

import ProductListing from '@/Components/Apps/ProductListing/ProductListing';
import PurchasedCard from '@/Components/Common/Card/PurchasedCard';
import EmptyStateTwo from '@/Components/Common/EmptyState/EmptyStateTwo';
import Header from '@/Components/Common/Header/Header';
import { ProductTypeBadgeMapping } from '@/Constants/constants';
import { formatDate } from '@/Utils/Common';
import {
  IconBrandProducthunt,
  IconCalendar,
  IconCategory,
  IconCoinRupee,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const TableHeaderItems = [
  { title: 'Date', icon: IconCalendar, value: 'date' },
  {
    title: 'Product',
    icon: IconBrandProducthunt,
    value: 'product',
  },
  {
    title: 'Type',
    icon: IconCategory,
    value: 'type',
  },
  {
    title: 'Amount',
    icon: IconCoinRupee,
    value: 'amountPaid',
  },
  // {
  //   title: 'Details',
  //   icon: IconNotes,
  //   value: 'details',
  // },
];

const renderTableDataCell = ({ type, item }) => {
  if (!item) return null;
  switch (type) {
    case 'product':
      return (
        <td className="flex max-w-72 items-center gap-2">
          <div className="truncate">
            {item.title ||
              item.productDetails?.title ||
              '---'}
          </div>
        </td>
      );
    case 'type':
      return (
        <td className="min-w-24">
          {ProductTypeBadgeMapping[item.productType] ||
            '---'}
        </td>
      );
    case 'details':
      return (
        <td className="min-w-36 max-w-72 truncate">
          {item.description ||
            item.productDetails?.description ||
            '---'}
        </td>
      );
    case 'date':
      return (
        <td className="min-w-36">
          {formatDate(item.createdAt)}
        </td>
      );
    case 'amountPaid':
      return (
        <td className="min-w-24">
          ₹{item.price || item.amountPaid || 0}
        </td>
      );
    default:
      return null;
  }
};

const Purchase = () => {
  const router = useRouter();

  const handleCardClick = item => {
    const redirectPath = ['course', 'dp'].some(
      type => type === item.productType
    )
      ? `/consume/${item.productType}/${item.productId}`
      : `/${item.productType}/${item.productId}`;

    router.push(redirectPath);
  };

  return (
    <div className="flex h-[calc(100vh-52px)] w-full flex-col md:h-screen">
      <Header title={'Purchase'} />
      <ProductListing
        renderTableDataCell={renderTableDataCell}
        TableHeaderItems={TableHeaderItems}
        baseUrl="/purchase/list"
        showLayoutChange={false}
        showSearch={false}
        showStatus={false}
        showOnlyGridViewInMobile={true}
        Component={PurchasedCard}
        showActions={false}
        onRowClick={handleCardClick}
        customEmptyStateTwo={<EmptyStateTwo />}
      />
    </div>
  );
};

export default Purchase;
