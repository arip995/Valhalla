'use client';
/* eslint-disable @next/next/no-img-element */
import Table from '@/Components/Common/Table/Table';
import TableBody from '@/Components/Common/Table/TableBody';
import TableFixedCell from '@/Components/Common/Table/TableFixedCell';
import TableHeader from '@/Components/Common/Table/TableHeader';
import TableWrapper from '@/Components/Common/Table/TableWrapper';
import { ActionIcon, rem } from '@mantine/core';
import {
  IconDotsVertical,
  IconPresentation,
  IconReceipt2,
  IconReportAnalytics,
  IconUsers,
} from '@tabler/icons-react';

const page = () => {
  const tableHeaderItems = [
    { title: 'Title', icon: IconUsers },
    { title: 'Price', icon: IconReceipt2 },
    { title: 'Revenue', icon: IconPresentation },
    { title: 'Sales', icon: IconReportAnalytics },
    { title: '', icon: '' },
  ];
  const tableBodyItems = [
    {
      src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      title: 'Arthur Melo',
      price: 999,
      sales: 444,
      revenue: 9876,
    },
    {
      src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      title: 'Arthur Melo',
      price: 499,
      sales: 198,
      revenue: 65298,
    },
    {
      src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      title: 'Arthur Melo',
      price: 799,
      sales: 234,
      revenue: 9784,
    },
    {
      src: 'https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      title: 'Arthur Melo',
      price: 9999,
      sales: 221,
      revenue: 88765,
    },
    {
      src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      title: 'Arthur Melo',
      price: 8999,
      sales: 435,
      revenue: 99456,
    },
  ];
  return (
    <TableWrapper>
      <Table>
        <TableHeader
          headerItems={tableHeaderItems}
          fixedElement={
            <TableFixedCell className="audiance-table-fixed audiance-table-fixed-header"></TableFixedCell>
          }
          renderItem={header => {
            return (
              <div className="flex items-center gap-2">
                {!!header.icon && (
                  <header.icon
                    style={{
                      width: rem(16),
                      height: rem(16),
                    }}
                  />
                )}

                {!!header.title && header.title}
              </div>
            );
          }}
        />
        <TableBody>
          {tableBodyItems.map(item => {
            return (
              <tr
                key={item.sales + item.src}
                className="cursor-pointer hover:bg-gray-50 [&>td]:whitespace-nowrap [&>td]:px-4 [&>td]:py-4 [&>td]:text-sm [&>td]:text-gray-500"
              >
                <td className="flex items-center gap-2">
                  <div className="h-10 w-10 overflow-hidden rounded-md">
                    <img
                      height={40}
                      width={40}
                      className="rounded-md transition duration-300 ease-in-out hover:scale-110"
                      src={item.src}
                    />
                  </div>
                  {item.title}
                </td>
                <td>₹{item.price}</td>
                <td>₹{item.revenue}</td>
                <td>{item.sales}</td>
                <td>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDotsVertical
                      style={{
                        width: rem(16),
                        height: rem(16),
                      }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </td>
              </tr>
            );
          })}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default page;

/* <TableWrapper>
        <Table tableElementRef={tableRef}>
          <TableHeader
            headerItems={tableHeaderItems}
            tableElementRef={tableRef}
            setIsCellHeightFitContent={setIsViewHeightFull}
            fixedElement={
              <TableFixedCell className='audiance-table-fixed audiance-table-fixed-header'>
              </TableFixedCell>
            }
            className='audience-customers-table-header'
            renderItem={(header) => {
              return (
                <div className='audience-customers-table-header-content'>
                  <img
                    src={header.icon.src}
                    alt=''
                    className='audience-customers-table-header-image'
                  />
                  {header.title}
                </div>
              )
            }}
          />
          <TableBody isCellHeightFitContent={isViewHeightFull}>
            {audienceTableData.map((row) => {
              if (!row?.totalSpending) return null

              return (
                <tr>
                  <td className='customers-data-table-column-one'>
                    {row.customerName || '-- -- --'}
                  </td>
                  <td className='customers-data-table-column-two'>
                    {row.email || '-- -- --'}
                  </td>
                  <td className='customers-data-table-column-three'>
                    {row.phoneNumber || '-- -- --'}
                  </td>
                  <td className='customers-data-table-column-four'>
                    <div className='audience-pills'>
                      {row.productTypeCounts?.map((pill) => {
                        return (
                          <div
                            style={{
                              background: `${ProductMappingColor[pill.name]}`,
                              borderRadius: '4px',
                              padding: '4px 6px',
                            }}>
                            {ProductMapping[pill?.name]}&nbsp;({pill?.count})
                          </div>
                        )
                      })}
                    </div>
                  </td>
                  <td className='customers-data-table-column-five'>
                    <div className='customers-data-table-column-five-child'>
                      <img src={MoneyIcon.src} alt='' />
                      <div>
                        {getNumberWithCommas(
                          roundNumberToDecimalPlaces(row.totalSpending, 2),
                        )}
                      </div>
                    </div>
                  </td>
                  <td className='customers-data-table-column-six'>
                    {row.totalActiveSubscriptions}
                  </td>
                  <TableFixedCell
                    onClick={() => {
                      setSelectedAudienceId(row.audienceId)
                      setShow(true)
                    }}
                    className='audiance-table-fixed-row'>
                    <img src={ShowAudienceIcon.src} alt='' />
                  </TableFixedCell>
                </tr>
              )
            })}
          </TableBody>
        </Table>
      </TableWrapper> */
