'use client';

import ProductListing from '@/Components/Apps/ProductListing/ProductListing';
import CustomCopyButton from '@/Components/Common/Buttons/CustomCopyButton';
import CreateCouponModal from '@/Components/Common/Coupon/CreateCoupon';
import Header from '@/Components/Common/Header/Header';
import { delay } from '@/Utils/Common';
import { Text } from '@mantine/core';
import {
  IconBrandProducthunt,
  IconCode,
  IconCurrencyRupee,
  IconDiscountCheck,
  IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';

const TableHeaderItems = [
  { title: 'Code', icon: IconCode, value: 'code' },
  { title: 'Type', icon: IconDiscountCheck, value: 'type' },
  {
    title: 'Product',
    icon: IconBrandProducthunt,
    value: 'product',
  },
  { title: 'Used count', icon: IconUser, value: 'used' },
  {
    title: 'Revenue',
    icon: IconCurrencyRupee,
    value: 'revenue',
  },
];

const renderTableDataCell = ({ type, item }) => {
  if (!item) return null;
  switch (type) {
    case 'code':
      return (
        <td className="flex max-w-72 items-center gap-2">
          <div className="truncate font-semibold text-gray-800">
            {item.code || '---'}
          </div>
          <CustomCopyButton value={item.code} />
        </td>
      );
    case 'type':
      return (
        <td className="min-w-36">
          <Text className="font-medium text-gray-700">
            {item.discountType === 1
              ? `${item.discountValue}% OFF`
              : `₹${item.discountValue} OFF`}
          </Text>
        </td>
      );
    case 'product':
      return (
        <td className="flex max-w-72 items-center gap-2">
          <div className="truncate">
            {item.product?.title || '---'}
          </div>
        </td>
      );
    case 'used':
      return (
        <td className="min-w-36">{item.usedCount || 0}</td>
      );
    case 'revenue':
      return (
        <td className="min-w-36">{item.revenue || `₹0`}</td>
      );
    default:
      return null;
  }
};

const Coupon = () => {
  const [opened, setOpened] = useState(false);
  const [reset, setReset] = useState(true);
  const [couponDetails, setCouponDetails] = useState(null);

  const handleUpdate = async () => {
    setCouponDetails(null);
    setOpened(false);
    setReset(false);
    await delay(1);
    setReset(prev => !prev);
  };

  return (
    <>
      <Header
        title="Coupon"
        modal={true}
        Component={CreateCouponModal}
        onClose={handleUpdate}
      />
      {reset && (
        <ProductListing
          showHeader={false}
          renderTableDataCell={renderTableDataCell}
          TableHeaderItems={TableHeaderItems}
          baseUrl="/coupon/list_all"
          initialStatus={[1, 2]}
          showSearch={false}
          showStatus={false}
          showLayoutChange={false}
          showActions={false}
          menuType={0}
          onRowClick={item => {
            setCouponDetails(item);
            setOpened(true);
          }}
        />
      )}
      {!!opened && (
        <CreateCouponModal
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
          data={couponDetails}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default Coupon;
