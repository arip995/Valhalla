'use client';

import OfflineOverlay from '@/Common/OfflineOverlay';
import { SidenavData } from '@/Constants/Navbarlayout';
import { getUserData } from '@/Utils/getuserData';
import useIsBrowser from '@/Utils/useIsBrowser';
import {
  AppShell,
  Burger,
  Group,
  Menu,
  NavLink,
  ScrollArea,
  Text,
  rem,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  IconChevronUp,
  IconLogout,
  IconSettings,
} from '@tabler/icons-react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Logo from '../../app/icon.png';
import classes from '../../styles/Navbar/NavbarMinimal.module.css';
import NavbarLink from './NavbarLink';

export function NavbarLayout({ children }) {
  const pathName = usePathname();
  const isBrowser = useIsBrowser();
  const user =
    typeof window !== 'undefined' ? getUserData() : null;
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState(pathName);

  const Links = useMemo(() => {
    const mapdata = !user?.isCreator
      ? SidenavData
      : [SidenavData[3], SidenavData[4]];
    return mapdata.map(link => {
      const { icon: Icon, label, path } = link;
      return (
        <NavbarLink
          create={link.create}
          Icon={Icon}
          label={label}
          key={link.label}
          path={path}
          active={link.path === active}
          onClick={() => {
            setOpened(false);
          }}
        />
      );
    });
  }, [user?._id, active]);

  useEffect(() => {
    setActive(pathName);
  }, [pathName]);

  return (
    <>
      <AppShell
        header={{ height: { base: 52, sm: 0 } }}
        navbar={{
          width: { base: '100%', sm: 200 },
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        transitionDuration={500}
      >
        <AppShell.Header className={classes.header}>
          <Group h="100%" px="xs">
            <Burger
              color="white"
              opened={opened}
              onClick={() => {
                setOpened(prev => !prev);
              }}
              size="md"
            />
            Nexify
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <Link href={'/creator/home'}>
            <AppShell.Section
              withHeader={false}
              py={12}
              pl={16}
              className={classes.company}
              onClick={() => {
                setOpened(false);
                setActive('/creator/home');
                router.push('/creator/home');
              }}
            >
              <img height={30} width={30} src={Logo.src} />{' '}
              Nexify
            </AppShell.Section>
          </Link>
          <AppShell.Section
            grow
            p={8}
            component={ScrollArea}
          >
            <div className="flex flex-col gap-2">
              {!!isBrowser && Links}
            </div>
          </AppShell.Section>
          <AppShell.Section className={classes.footer}>
            <Menu shadow="md" width={190}>
              <Menu.Target>
                <NavLink
                  variant="subtle"
                  style={{ borderRadius: '20px' }}
                  fullWidth
                  label={
                    <div className="flex items-center gap-2">
                      <IconSettings
                        style={{
                          width: rem(17),
                          height: rem(17),
                        }}
                        stroke={1.5}
                      />
                      Settings
                    </div>
                  }
                  justify="space-between"
                  rightSection={
                    <IconChevronUp
                      style={{
                        width: rem(17),
                        height: rem(17),
                      }}
                      stroke={1.5}
                    />
                  }
                ></NavLink>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconLogout
                      style={{
                        width: rem(17),
                        height: rem(17),
                      }}
                      stroke={1.5}
                    />
                  }
                  onClick={() => {
                    modals.openConfirmModal({
                      title: 'Sign Out',
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
                      onConfirm: () => {
                        Cookies.remove('accesstoken');
                        localStorage.removeItem('user');
                        router.push('/signin');
                      },
                    });
                  }}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main className={classes.appshellMain}>
          {children}
        </AppShell.Main>
      </AppShell>
      <OfflineOverlay />
    </>
  );
}

export default NavbarLayout;
