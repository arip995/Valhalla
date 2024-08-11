/* eslint-disable @next/next/no-img-element */
import { ActionIcon } from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import React from 'react';

const page = () => {
  return (
    <div className="mt-20">
      <section className="container mx-auto px-4">
        <div className="flex flex-col">
          <div className="mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right"
                      >
                        Date
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="relative px-4 py-3.5"
                      >
                        <span className="sr-only">
                          Actions
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-x-2">
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                            alt=""
                          />
                          <div>
                            <h2 className="text-sm font-medium text-gray-800">
                              Arthur Melo
                            </h2>
                            <p className="text-xs font-normal text-gray-600">
                              authurmelo@example.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                        Jan 6, 2022
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                        <div className="inline-flex items-center gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-emerald-500">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <h2 className="text-sm font-normal">
                            Paid
                          </h2>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm">
                        <ActionIcon
                          variant="subtle"
                          color="gray"
                          aria-label="Settings"
                        >
                          <IconDotsVertical
                            style={{
                              width: '70%',
                              height: '70%',
                            }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </td>
                    </tr>

                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-x-2">
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                            alt=""
                          />
                          <div>
                            <h2 className="text-sm font-medium text-gray-800">
                              Andi Lane Andi LaneAndi
                            </h2>
                            <p className="text-xs font-normal text-gray-600">
                              andi@example.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                        Jan 5, 2022
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                        <div className="inline-flex items-center gap-x-2 rounded-full bg-red-100/60 px-3 py-1 text-red-500">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 3L3 9M3 3L9 9"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <h2 className="text-sm font-normal">
                            Cancelled
                          </h2>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm">
                        <ActionIcon
                          variant="subtle"
                          color="gray"
                          aria-label="Settings"
                        >
                          <IconDotsVertical
                            style={{
                              width: '70%',
                              height: '70%',
                            }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </td>
                    </tr>

                    <tr>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-x-2">
                          <img
                            className="h-8 w-8 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=644&q=80"
                            alt=""
                          />
                          <div>
                            <h2 className="text-sm font-medium text-gray-800">
                              Orlando Diggs
                            </h2>
                            <p className="text-xs font-normal text-gray-600">
                              orlando@example.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                        Jan 4, 2022
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                        <div className="inline-flex items-center gap-x-2 rounded-full bg-gray-100/60 px-3 py-1 text-gray-500">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10"
                              stroke="#667085"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <h2 className="text-sm font-normal">
                            Refunded
                          </h2>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm">
                        <ActionIcon
                          variant="subtle"
                          color="gray"
                          aria-label="Settings"
                        >
                          <IconDotsVertical
                            style={{
                              width: '70%',
                              height: '70%',
                            }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>

            <span>previous</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100"
          >
            <span>Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 rtl:-scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default page;

{
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
}
