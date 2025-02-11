'use client';

import AuthModal from '@/Components/Auth/LandingAuth/AuthModal';
import useUser from '@/Utils/Hooks/useUser';
import {
  Avatar,
  Button,
  Menu,
  rem,
  Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  IconLogout,
  IconShoppingCart,
  IconUserCircle,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SigninOrProfileButton = () => {
  const router = useRouter();
  const { user, removeUser } = useUser();
  const [opened, setOpened] = useState(false);
  //   if (user === -1) return null;
  if (!user?._id)
    return (
      <>
        <Button
          variant="default"
          onClick={() => {
            setOpened(true);
          }}
          leftSection={
            <IconUserCircle size={16} color="black" />
          }
        >
          Signin
        </Button>
        {!!opened && (
          <AuthModal
            opened={opened}
            onClose={() => setOpened(false)}
            onAuthComplete={() => {
              setOpened(false);
            }}
            signin={true}
          />
        )}
      </>
    );
  return (
    <>
      <Menu shadow="md" width={150} trigger="hover">
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
                overlayProps: {
                  blur: 20,
                },
                children: (
                  <div className="pb-4 pt-8">
                    <Text size="md" fw={500}>
                      Do you really want to signout?
                    </Text>
                  </div>
                ),
                labels: {
                  confirm: 'Yes, Sign out',
                  cancel: 'Cancel',
                },
                confirmProps: { color: 'red' },
                onCancel: () => {},
                onConfirm: removeUser,
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
    </>
  );
};

export default SigninOrProfileButton;
