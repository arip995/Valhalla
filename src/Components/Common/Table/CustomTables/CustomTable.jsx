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
import {
  ActionIcon,
  Badge,
  Menu,
  rem,
} from '@mantine/core';
import {
  IconBrandRedux,
  IconCreditCardOff,
  IconDotsVertical,
  IconEdit,
  IconExternalLink,
  IconPresentation,
  IconReceipt2,
  IconReportAnalytics,
  IconSquareRoundedCheck,
  IconSquareRoundedX,
  IconTrash,
  IconUsers,
} from '@tabler/icons-react';
import classNames from 'classnames';
import Link from 'next/link';
import EmptyProductImage2 from '../../../../../public/images/common/emptystateproductimage2.jpeg';

const TableHeaderItems = [
  { title: 'Title', icon: IconUsers },
  { title: 'Status', icon: IconBrandRedux },
  { title: 'Price', icon: IconReceipt2 },
  { title: 'Revenue', icon: IconPresentation },
  { title: 'Sales', icon: IconReportAnalytics },
  { title: '', icon: '' },
];

const CustomTable = ({
  app = 'tg',
  tableHeaderItems = TableHeaderItems,
  tableBodyItems = [],
  onRowClick = () => {},
  showShare = true,
  showMenu = true,
  onUpdate = () => {},
}) => {
  if (!tableBodyItems) return null;
  return (
    <TableWrapper>
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
                        'h-10 rounded-md transition duration-300 ease-in-out hover:scale-110',
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
                      <Menu
                        shadow="md"
                        radius="md"
                        position="bottom-end"
                      >
                        <Menu.Target>
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={e =>
                              e.stopPropagation()
                            }
                          >
                            <IconDotsVertical
                              style={{
                                width: rem(16),
                                height: rem(16),
                              }}
                              stroke={1.5}
                            />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Link
                            href={`/dashboard/${app}/${item._id}`}
                          >
                            <Menu.Item
                              onClick={e =>
                                e.stopPropagation()
                              }
                              className="my-1"
                              disabled={item.status === 3}
                              leftSection={
                                <IconEdit
                                  style={{
                                    width: rem(16),
                                    height: rem(16),
                                  }}
                                  stroke={1.5}
                                />
                              }
                            >
                              Edit
                            </Menu.Item>
                          </Link>
                          <Link
                            href={`/${app}/${item._id}`}
                            prefetch={false}
                          >
                            <Menu.Item
                              onClick={e =>
                                e.stopPropagation()
                              }
                              className="my-1"
                              disabled={item.status === 3}
                              leftSection={
                                <IconExternalLink
                                  style={{
                                    width: rem(16),
                                    height: rem(16),
                                  }}
                                  stroke={1.5}
                                />
                              }
                            >
                              Open Page
                            </Menu.Item>
                          </Link>

                          {
                            // !item.isKycDone ||
                            item.status === 3 ||
                            item.status === 4 ? null : (
                              <>
                                <Menu.Item
                                  className="my-1"
                                  onClick={e => {
                                    e.stopPropagation();
                                    onUpdate(
                                      'edit',
                                      item.status === 1
                                        ? 5
                                        : 1,
                                      item._id
                                    );
                                  }}
                                  leftSection={
                                    item.status === 1 ? (
                                      <IconSquareRoundedX
                                        style={{
                                          width: rem(16),
                                          height: rem(16),
                                        }}
                                        stroke={1.5}
                                      />
                                    ) : (
                                      <IconSquareRoundedCheck
                                        style={{
                                          width: rem(16),
                                          height: rem(16),
                                        }}
                                        stroke={1.5}
                                      />
                                    )
                                  }
                                >
                                  {item.status === 1
                                    ? 'Unpublish'
                                    : 'Publish'}
                                </Menu.Item>
                                {item.status ===
                                5 ? null : (
                                  <Menu.Item
                                    className="my-1"
                                    onClick={e => {
                                      e.stopPropagation();
                                      onUpdate(
                                        'edit',
                                        item.status === 6
                                          ? 1
                                          : 6,
                                        item._id
                                      );
                                    }}
                                    leftSection={
                                      <IconCreditCardOff
                                        style={{
                                          width: rem(16),
                                          height: rem(16),
                                        }}
                                        stroke={1.5}
                                      />
                                    }
                                  >
                                    {item.status === 6
                                      ? 'Enable Sale'
                                      : 'Disable Sale'}
                                  </Menu.Item>
                                )}
                              </>
                            )
                          }

                          <Menu.Item
                            className="my-1"
                            color="red"
                            onClick={e => {
                              e.stopPropagation();
                              onUpdate('edit', 2, item._id);
                            }}
                            leftSection={
                              <IconTrash
                                style={{
                                  width: rem(16),
                                  height: rem(16),
                                }}
                                stroke={1.5}
                              />
                            }
                          >
                            Delete
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
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
