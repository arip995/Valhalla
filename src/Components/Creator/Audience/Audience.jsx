'use client';

import useProductListing from '@/Components/Apps/ProductListing/useProductListing';
import EmptyStateOne from '@/Components/Common/EmptyState/EmptyStateOne';
import EmptyStateTwo from '@/Components/Common/EmptyState/EmptyStateTwo';
import Filters from '@/Components/Common/Filters/Filters';
import Header from '@/Components/Common/Header/Header';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import CustomTable from '@/Components/Common/Table/CustomTables/CustomTable';
import { formatDate } from '@/Utils/Common';
import { Drawer, Pagination, Select } from '@mantine/core';
import {
  IconCalendar,
  IconMail,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';
import AudienceDetails from './AudienceDetails';

const TableHeaderItems = [
  { title: 'Name', icon: IconUser, value: 'name' },
  {
    title: 'Email',
    icon: IconMail,
    value: 'email',
  },
  {
    title: 'Phone Number',
    icon: IconPhone,
    value: 'phoneNumber',
  },
  {
    title: 'Created on',
    icon: IconCalendar,
    value: 'createdOn',
  },
];

const renderTableDataCell = ({ type, item }) => {
  if (!item) return null;
  switch (type) {
    case 'name':
      return (
        <td className="flex max-w-72 items-center gap-2">
          <div className="truncate">
            {item.name || '---'}
          </div>
        </td>
      );
    case 'email':
      return (
        <td className="min-w-36">{item.email || '---'}</td>
      );
    case 'phoneNumber':
      return (
        <td className="min-w-36">
          {item.phoneNumber || '---'}
        </td>
      );
    case 'createdOn':
      return (
        <td className="min-w-36">
          {formatDate(item.createdAt)}
        </td>
      );
    default:
      return null;
  }
};

const Audience = () => {
  const {
    data,
    loading,
    limit,
    pageNo,
    onUpdate,
    searchText,
    status,
  } = useProductListing('/audience/list');
  const [activeAudience, setActiveAudience] =
    useState(null);
  const [opened, setOpened] = useState(false);
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
        <EmptyStateTwo
          title="No Audience Yet"
          description="No one have purchased tou product yet. Start selling."
        />
      </>
    );
  }

  if (!data?.totalCount) return null;

  return (
    <>
      <div className="flex h-[calc(100vh-52px)] w-full flex-col md:h-screen">
        <Header title={'Audience'} />
        <div
          className={
            'flex flex-1 flex-col items-end gap-4 overflow-y-auto p-4'
          }
        >
          <Filters
            onUpdate={onUpdate}
            searchText={searchText}
            showStatus={false}
            status={status}
            showLayoutChange={false}
            searchPlaceholder={'Search Name or Email'}
          />
          {data.totalQueryCount === 0 ? (
            <EmptyStateOne
              isFilter
              isAudience
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
                  onRowClick={item => {
                    setActiveAudience(item);
                    setOpened(true);
                  }}
                />
              )}
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
        </div>
      </div>
      <Drawer
        trapFocus={false}
        lockScroll={false}
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        title="Audience Details"
      >
        <AudienceDetails data={activeAudience} />
      </Drawer>
    </>
  );
};

export default Audience;
