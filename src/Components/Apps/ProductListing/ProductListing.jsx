'use client';
import React from 'react';
import useProductListing from './useProductListing';
import Header from '@/Components/Common/Header/Header';
import CustomTable from '@/Components/Common/Table/CustomTables/CustomTable';
import classNames from 'classnames';
import loading from '@/app/loading';

const ProductListing = ({ app }) => {
  const { pagination, updateFilters, data } =
    useProductListing(app);
  console.log(pagination, data);
  return (
    <div>
      <Header title="Telegram" path="/create/telegram" />
      <div
        className={classNames('mt-2 md:mt-4', {
          hidden: loading === -1,
        })}
      >
        <CustomTable tableBodyItems={data} />
      </div>
    </div>
  );
};

export default ProductListing;
