'use client';
import EmptyStateOne from '@/Components/Common/EmptyState/EmptyStateOne';
import Header from '@/Components/Common/Header/Header';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import CustomTable from '@/Components/Common/Table/CustomTables/CustomTable';
import { Pagination } from '@mantine/core';
import classNames from 'classnames';
import Filters from './Filters';
import useProductListing from './useProductListing';

const ProductListing = () => {
  const { app, pagination, updateFilters, data, loading } =
    useProductListing();
  console.log(pagination, updateFilters);
  if (loading === -1) {
    return (
      <>
        <LayoutLoading />
      </>
    );
  }

  if (!data?.totalCount && !loading) {
    return (
      <EmptyStateOne
        isTelegram={app === 'tg' ? true : false}
      />
    );
  }

  if (data?.totalCount) {
    return (
      <>
        <Header
          title={
            app === 'tg' ? 'Telegram' : 'Locked Content'
          }
          path={`/create/${app === 'tg' ? 'telegram' : 'lockedcontent'}`}
        />
        <div
          className={classNames(
            'mx-4 mt-2 flex flex-col items-end gap-2 md:mt-4',
            {
              hidden: loading === -1,
            }
          )}
        >
          <Filters />
          {data.totalQueryCount == 0 ? (
            <EmptyStateOne app={app} />
          ) : (
            <>
              {loading ? (
                <LayoutLoading />
              ) : (
                <CustomTable
                  tableBodyItems={data.data || []}
                  app={app}
                />
              )}
              <Pagination
                total={Math.ceil(data.totalQueryCount / 10)}
                withEdges
                className={`${Math.ceil(data.totalQueryCount / 10) == 1 || loading ? 'hidden' : ''}`}
              />
            </>
          )}
        </div>
      </>
    );
  }
};

export default ProductListing;
