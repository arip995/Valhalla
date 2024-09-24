'use client';
import { Pagination, Select } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

import EmptyStateOne from '@/Components/Common/EmptyState/EmptyStateOne';
import FiltersOne from '@/Components/Common/Filters/FiltersOne';
import Header from '@/Components/Common/Header/Header';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import CustomTable from '@/Components/Common/Table/CustomTables/CustomTable';
import useProductListing from './useProductListing';

const ProductListing = () => {
  const router = useRouter();
  const {
    app,
    onUpdate,
    data,
    loading,
    searchText,
    activeTab,
    limit,
    pageNo,
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
        return '/create/tg';
      case 'lc':
        return '/create/lc';
      default:
        return null;
    }
  }, [app]);

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
        <EmptyStateOne app={app} />
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
        {/* <Filters
          onUpdate={onUpdate}
          searchText={searchText}
          status={status}
        /> */}
        <FiltersOne
          activeTab={activeTab}
          onUpdate={onUpdate}
          searchText={searchText}
        />
        {data.totalQueryCount === 0 ? (
          <EmptyStateOne
            app={app}
            isFilter
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
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductListing);
