/* eslint-disable no-unused-vars */
'use client';
import ShareButton from '@/Components/Common/Buttons/ShareButton';
import Table from '@/Components/Common/Table/Table';
import TableBody from '@/Components/Common/Table/TableBody';
import TableHeader from '@/Components/Common/Table/TableHeader';
import TableWrapper from '@/Components/Common/Table/TableWrapper';
import {
  StatusColorMapping,
  StatusMapping,
} from '@/Constants/ProductListingContants';
import { Badge, rem } from '@mantine/core';
import {
  IconBrandRedux,
  IconPresentation,
  IconReceipt2,
  IconReportAnalytics,
  IconUsers,
} from '@tabler/icons-react';
import classNames from 'classnames';
import EmptyProductImage2 from '../../../../../public/images/common/emptystateproductimage2.jpeg';
import ProductMenu from '../../Menu/ProductMenu';

const TableHeaderItems = [
  { title: 'Title', icon: IconUsers },
  { title: 'Status', icon: IconBrandRedux },
  { title: 'Price', icon: IconReceipt2 },
  { title: 'Revenue', icon: IconPresentation },
  { title: 'Sales', icon: IconReportAnalytics },
];

const CustomTable = ({
  app = 'tg',
  tableHeaderItems = TableHeaderItems,
  tableBodyItems = [],
  onRowClick = () => {},
  showShare = true,
  showMenu = true,
  onUpdate = () => {},
  className,
}) => {
  if (!tableBodyItems) return null;
  return (
    <TableWrapper className={className}>
      <Table>
        <TableHeader
          headerItems={tableHeaderItems}
          renderItem={(header, index) => {
            return (
              <>
                {!showMenu &&
                !showShare &&
                tableHeaderItems.length - 1 ===
                  index ? null : (
                  <div className="flex max-w-96 items-center gap-2">
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
                )}
              </>
            );
          }}
        />
        <TableBody>
          {tableBodyItems.map(item => {
            return (
              <tr
                key={item._id}
                onClick={() => onRowClick(item)}
                className="cursor-pointer hover:bg-gray-50 [&>td]:whitespace-nowrap [&>td]:px-4 [&>td]:py-4 [&>td]:text-sm [&>td]:text-gray-500"
              >
                <td className="flex max-w-96 items-center gap-2">
                  <div className="h-10 min-h-max w-10 min-w-max overflow-hidden rounded-md">
                    <img
                      height={40}
                      width={40}
                      className={classNames(
                        'h-10 rounded-md object-cover transition duration-300 ease-in-out hover:scale-110',
                        { hidden: !item.coverImage }
                      )}
                      src={item.coverImage}
                    />
                    <img
                      height={40}
                      width={40}
                      className={classNames(
                        'h-10 rounded-md transition duration-300 ease-in-out hover:scale-110',
                        { hidden: item.coverImage }
                      )}
                      src={EmptyProductImage2.src}
                    />
                  </div>
                  <div className="truncate">
                    {item.title}
                  </div>
                </td>
                <td className="min-w-40">
                  <Badge
                    variant="dot"
                    color={StatusColorMapping[item.status]}
                    size="md"
                  >
                    {StatusMapping[item.status]}
                  </Badge>
                </td>
                <td className="min-w-36">₹{item.price}</td>
                <td className="min-w-36">
                  ₹{item.totalRevenue}
                </td>
                <td className="min-w-36">
                  {item.totalSalesCount}
                </td>
                <td className="min-w-36">
                  <div className="flex items-center gap-2">
                    {!!showShare && (
                      <ShareButton
                        link={`${process.env.NEXT_PUBLIC_HOST}${app}/${item._id}`}
                      />
                    )}
                    {!!showMenu && (
                      <ProductMenu
                        app={app}
                        onUpdate={onUpdate}
                        item={item}
                      />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default CustomTable;
