'use client';
import useUser from '@/Utils/Hooks/useUser';
import { Avatar, Menu, rem, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  IconLogout,
  IconShoppingCart,
} from '@tabler/icons-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const GLProductheader = ({ data }) => {
  const router = useRouter();
  const { user, removeUser } = useUser();

  const onConfirm = () => {
    Cookies.remove('accesstoken');
    localStorage.removeItem('user');
    removeUser();
  };

  return (
    <>
      <div className="flex w-full justify-center border-2 border-b-gray-100 bg-white px-2 py-2 md:px-0">
        <div className="flex w-full max-w-[768px] items-center justify-between gap-8">
          <div className="flex items-center gap-2 font-semibold">
            <Avatar
              color="gray"
              className="h-[36px] w-[36px]"
              name={`${data.creatorDetails?.firstName || ''} ${
                data.creatorDetails?.lastName || ''
              }`}
            />
            {data.creatorDetails.username}
          </div>
          {user === -1 ? null : (
            <>
              {user?._id ? (
                <Menu
                  shadow="md"
                  width={150}
                  trigger="hover"
                >
                  <Menu.Target>
                    <Avatar
                      color="violet"
                      className="h-[36px] w-[36px] cursor-pointer"
                      name={`${user?.firstName || ''} ${
                        user?.lastName || ''
                      }`}
                    />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => {
                        router.push('/purchase');
                      }}
                      leftSection={
                        <IconShoppingCart
                          style={{
                            width: rem(14),
                            height: rem(14),
                          }}
                        />
                      }
                    >
                      Purchases
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      onClick={() => {
                        modals.openConfirmModal({
                          title: 'Sign Out',
                          children: (
                            <div className="pb-4 pt-8">
                              <Text size="md" fw={500}>
                                Do you really want to
                                signout?
                              </Text>
                            </div>
                          ),
                          labels: {
                            confirm: 'Yes, Sign out',
                            cancel: 'Cancel',
                          },
                          confirmProps: { color: 'red' },
                          onCancel: () => {},
                          onConfirm: onConfirm,
                        });
                      }}
                      leftSection={
                        <IconLogout
                          style={{
                            width: rem(14),
                            height: rem(14),
                          }}
                        />
                      }
                    >
                      Sign Out
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <div className="cursor-pointer">Login</div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GLProductheader;
