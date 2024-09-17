'use client';
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Pagination } from '@mantine/core';
import { Toaster } from 'react-hot-toast';

import EmptyStateOne from '@/Components/Common/EmptyState/EmptyStateOne';
import Header from '@/Components/Common/Header/Header';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import CustomTable from '@/Components/Common/Table/CustomTables/CustomTable';
import Filters from './Filters';
import useProductListing from './useProductListing';

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

  const headerTitle = useMemo(() => {
    switch (app) {
      case 'tg':
        return 'Telegram';
      case 'lc':
        return 'Locked Content';
      case 'course':
        return 'Course';
      default:
        return null;
    }
  }, [app]);

  const createPath = useMemo(() => {
    switch (app) {
      case 'tg':
        return '/create/telegram';
      case 'lc':
        return '/create/lockedcontent';
      default:
        return null;
    }
  }, [app]);

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

  if (!data?.totalCount) return null;

  return (
    <div className="flex h-[calc(100vh-52px)] w-full flex-col md:h-screen">
      <Header
        title={headerTitle}
        modal={app === 'course'}
        path={createPath}
      />
      <div className="flex flex-1 flex-col items-end gap-4 overflow-y-auto px-4 py-4">
        <Filters
          onUpdate={onUpdate}
          searchText={searchText}
          status={status}
        />
        {data.totalQueryCount === 0 ? (
          <EmptyStateOne
            app={app}
            isfilter
            onClear={() => onUpdate('reset')}
          />
        ) : (
          <>
            {loading ? (
              <LayoutLoading />
            ) : (
              <CustomTable
                tableBodyItems={data.data || []}
                onUpdate={onUpdate}
                onRowClick={row =>
                  router.push(
                    `/dashboard/${app}/${row._id}`
                  )
                }
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
};

export default React.memo(ProductListing);
