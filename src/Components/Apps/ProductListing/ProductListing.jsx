'use client';
import EmptyStateOne from '@/Components/Common/EmptyState/EmptyStateOne';
import Header from '@/Components/Common/Header/Header';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import CustomTable from '@/Components/Common/Table/CustomTables/CustomTable';
import { Pagination } from '@mantine/core';
import Filters from './Filters';
import useProductListing from './useProductListing';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ProductListing = () => {
  const router = useRouter();
  const {
    app,
    onUpdate,
    data,
    loading,
    searchText,
    status,
  } = useProductListing();

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
        <div className="mx-4 my-2 flex flex-col items-end gap-4 md:my-4">
          <Filters
            onUpdate={onUpdate}
            searchText={searchText}
            status={status}
          />
          {data.totalQueryCount == 0 ? (
            <EmptyStateOne
              isTelegram={app === 'tg' ? true : false}
              isfilter
              onClear={() => {
                onUpdate('reset');
              }}
            />
          ) : (
            <>
              {loading ? (
                <LayoutLoading />
              ) : (
                <CustomTable
                  tableBodyItems={data.data || []}
                  onUpdate={onUpdate}
                  onRowClick={row => {
                    router.push(
                      `/dashboard/${app}/${row._id}`
                    );
                  }}
                  app={app}
                />
              )}
              <Pagination
                withEdges
                total={Math.ceil(data.totalQueryCount / 10)}
                onChange={value => {
                  onUpdate('page', value);
                }}
                className={`${Math.ceil(data.totalQueryCount / 10) == 1 || loading ? 'hidden' : ''}`}
              />
            </>
          )}
        </div>
        <Toaster />
      </>
    );
  }
};

export default ProductListing;
