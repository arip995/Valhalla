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
import React from 'react';

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
        <Toaster />
      </>
    );
  }

  if (!data?.totalCount && !loading) {
    return (
      <>
        <EmptyStateOne app={app} />
        <Toaster />
      </>
    );
  }

  if (data?.totalCount) {
    return (
      <div className="flex h-[calc(100vh-52px)] w-full flex-col md:h-screen">
        <Header
          title={
            app === 'tg'
              ? 'Telegram'
              : app === 'lc'
                ? 'Locked Content'
                : app === 'course'
                  ? 'Course'
                  : null
          }
          modal={app === 'course' ? true : false}
          path={`/create/${app === 'tg' ? 'telegram' : app === 'lc' ? 'lockedcontent' : null}`}
        />
        <div className="flex flex-1 flex-col items-end gap-4 overflow-y-auto px-4 py-4">
          <Filters
            onUpdate={onUpdate}
            searchText={searchText}
            status={status}
          />
          {data.totalQueryCount == 0 ? (
            <EmptyStateOne
              app={app}
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
      </div>
    );
  }
};

export default React.memo(ProductListing);
