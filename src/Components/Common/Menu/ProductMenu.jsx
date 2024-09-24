import { Menu, rem } from '@mantine/core';
import {
  IconCreditCardOff,
  IconDotsVertical,
  IconEdit,
  IconExternalLink,
  IconSquareRoundedCheck,
  IconSquareRoundedX,
  IconTrash,
} from '@tabler/icons-react';
import Link from 'next/link';

const ProductMenu = ({
  item,
  app,
  onUpdate = () => {},
}) => {
  return (
    <Menu shadow="md" radius="md" position="bottom-end">
      <Menu.Target>
        <span
          className="flex cursor-pointer items-center rounded-full border border-gray-300 bg-white p-1.5"
          onClick={e => e.stopPropagation()}
        >
          <IconDotsVertical color="black" size={12} />
        </span>
        {/* <ActionIcon
          variant="subtle"
          color="gray"
          onClick={e => e.stopPropagation()}
        >
          <IconDotsVertical
            style={{
              width: rem(12),
              height: rem(12),
            }}
            stroke={1.5}
          />
        </ActionIcon> */}
      </Menu.Target>
      <Menu.Dropdown>
        <Link href={`/dashboard/${app}/${item._id}`}>
          <Menu.Item
            onClick={e => e.stopPropagation()}
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
        <Link href={`/${app}/${item._id}`} prefetch={false}>
          <Menu.Item
            onClick={e => e.stopPropagation()}
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
          item.status === 3 || item.status === 4 ? null : (
            <>
              <Menu.Item
                className="my-1"
                onClick={e => {
                  e.stopPropagation();
                  onUpdate(
                    'edit',
                    item.status === 1 ? 5 : 1,
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
              {item.status === 5 ? null : (
                <Menu.Item
                  className="my-1"
                  onClick={e => {
                    e.stopPropagation();
                    onUpdate(
                      'edit',
                      item.status === 6 ? 1 : 6,
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
  );
};

export default ProductMenu;
