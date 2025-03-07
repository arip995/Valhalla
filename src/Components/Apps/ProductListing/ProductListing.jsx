/* eslint-disable no-unused-vars */
'use client';
import {
  Pagination,
  Select,
  SimpleGrid,
} from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

import ProductCard from '@/Components/Common/Card/ProductCard';
import EmptyStateOne from '@/Components/Common/EmptyState/EmptyStateOne';
import FiltersOne from '@/Components/Common/Filters/FiltersOne';
import Header from '@/Components/Common/Header/Header';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import CustomTable from '@/Components/Common/Table/CustomTables/CustomTable';
import useProductListing from './useProductListing';
import classNames from 'classnames';
import Filters from '@/Components/Common/Filters/Filters';
import EmptyStateTwo from '@/Components/Common/EmptyState/EmptyStateTwo';
import TransactionCard from '@/Components/Common/Card/TransactionCard';

const ProductListing = ({
  renderTableDataCell,
  TableHeaderItems,
  baseUrl = '/product/get_listing_data',
  initialStatus = [0, 1, 3, 4, 5, 6],
  showSearch = true,
  showStatus = true,
  showLayoutChange = true,
  showHeader = true,
  showActions = true,
  menuType = 1,
  showOnlyGridViewInMobile = true,
  onRowClick,
  customEmptyStateOne,
  customEmptyStateTwo,
  searchPlaceholder,
  Component = ProductCard,
}) => {
  const router = useRouter();
  const routeName = usePathname().split('/')[1];
  const {
    app,
    onUpdate,
    data,
    loading,
    searchText,
    status,
    limit,
    pageNo,
    isGrid,
    setIsGrid,
    isMobile,
  } = useProductListing(baseUrl, initialStatus);
  const onDefaultRowClick = row => {
    router.push(`/dashboard/${app}/${row._id}`);
  };

  const headerTitle = useMemo(() => {
    switch (app) {
      case 'tg':
        return 'Telegram';
      case 'lc':
        return 'Locked Content';
      case 'dp':
        return 'Digital Product';
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
        {customEmptyStateOne ? (
          <>{customEmptyStateOne}</>
        ) : (
          <EmptyStateOne
            app={app}
            isApp={routeName === 'app'}
            title={
              routeName === 'app'
                ? null
                : routeName === 'dashboard'
                  ? 'No subscribers yet'
                  : `No ${routeName} Yet`
            }
            description={
              routeName === 'app'
                ? null
                : routeName === 'payment'
                  ? `You have no transactions yet!`
                  : routeName === 'dashboard'
                    ? 'No one have purchased this product yet!'
                    : 'You have not sold any products yet!'
            }
          />
        )}
      </>
    );
  }

  if (!data?.totalCount) return null;

  return (
    <>
      {!!showHeader && (
        <Header
          title={
            routeName === 'app'
              ? headerTitle
              : routeName.charAt(0).toUpperCase() +
                routeName.slice(1)
          }
          modal={app === 'course' || app === 'dp'}
          path={createPath}
        />
      )}
      <div className="flex w-full flex-1 flex-col items-end gap-4 overflow-y-auto p-4">
        <Filters
          onUpdate={onUpdate}
          searchText={searchText}
          searchPlaceholder={searchPlaceholder}
          status={status}
          isGrid={
            showOnlyGridViewInMobile && isMobile
              ? true
              : isGrid
          }
          setIsGrid={setIsGrid}
          showSearch={showSearch}
          showStatus={showStatus}
          showLayoutChange={
            showOnlyGridViewInMobile && isMobile
              ? false
              : showLayoutChange
          }
          menuType={menuType}
        />
        {data.totalQueryCount === 0 ? (
          <EmptyStateOne
            app={app}
            isApp={routeName === 'app'}
            title={
              routeName === 'payment'
                ? 'No transactions yet!'
                : routeName === 'audience'
                  ? 'No audience yet!'
                  : routeName === 'dashboard'
                    ? 'No subscribers yet!'
                    : null
            }
            isFilter
            onClear={() => onUpdate('reset')}
          />
        ) : (
          <>
            {loading ? (
              <LayoutLoading />
            ) : (
              <>
                <div
                  className={classNames('hidden', {
                    '!block w-full':
                      showOnlyGridViewInMobile &&
                      isMobile &&
                      routeName !== 'audience'
                        ? true
                        : isGrid,
                  })}
                >
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4">
                    {data.data.map(item => (
                      <div key={item._id}>
                        <Component
                          onItemClick={
                            onRowClick || onDefaultRowClick
                          }
                          item={item}
                          app={app}
                          onUpdate={onUpdate}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <CustomTable
                  tableBodyItems={data.data || []}
                  RenderTableDataCell={renderTableDataCell}
                  tableHeaderItems={TableHeaderItems}
                  onUpdate={onUpdate}
                  onRowClick={
                    onRowClick || onDefaultRowClick
                  }
                  className={classNames('block', {
                    hidden:
                      showOnlyGridViewInMobile &&
                      isMobile &&
                      routeName !== 'audience'
                        ? true
                        : isGrid,
                  })}
                  app={app}
                  showActions={showActions}
                />
              </>
            )}
            <div
              className={`flex flex-wrap-reverse items-center gap-2 ${
                !data.totalQueryCount ||
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
    </>
  );
};

export default React.memo(ProductListing);
