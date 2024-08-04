'use client';
import { getUserData } from '@/Utils/getusrData';
import useIsBrowser from '@/Utils/useIsBrowser';
import { Avatar, Menu, rem, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  IconLogout,
  IconShoppingCart,
} from '@tabler/icons-react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const GLProductheader = ({ data }) => {
  const isBrowser = useIsBrowser();
  const [user, setUser] = useState(null);

  const updateUser = () => {
    if (isBrowser) {
      console.log('first');
      setUser(getUserData());
    }
  };

  const onConfirm = () => {
    Cookies.remove('accesstoken');
    localStorage.removeItem('user');
    updateUser();
  };

  useEffect(() => {
    updateUser();
  }, [isBrowser]);

  return (
    <div className="sticky top-0 flex w-full justify-center border-2 border-b-gray-100 bg-white px-2 py-2 md:px-0">
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
        {user?._id ? (
          <Menu shadow="md" width={200} trigger="hover">
            <Menu.Target>
              <Avatar
                color="initials"
                className="h-[36px] w-[36px] cursor-pointer"
                name={`${user?.firstName || ''} ${
                  user?.lastName || ''
                }`}
              />
            </Menu.Target>
            <Menu.Dropdown
              style={{
                dropdown: {
                  width: '50px',
                },
              }}
            >
              <Menu.Item
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
                    title: <Text fw={600}>Sign Out</Text>,
                    children: (
                      <Text size="sm">
                        Do you really want to signout?
                      </Text>
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
      </div>
    </div>
  );
};

export default GLProductheader;
