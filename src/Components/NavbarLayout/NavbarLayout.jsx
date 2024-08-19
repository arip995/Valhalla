/* eslint-disable @next/next/no-img-element */
'use client';

import useIsBrowser from '@/Utils/useIsBrowser';
import {
  AppShell,
  Burger,
  Divider,
  Group,
  Menu,
  NavLink,
  ScrollArea,
  Text,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
  // IconBrandDiscord,
  // IconBrandMeta,
  IconBrandTelegram,
  // IconBrandWhatsapp,
  // IconCalendarEvent,
  IconCash,
  IconCertificate,
  IconChevronUp,
  IconCreditCardPay,
  IconHome2,
  IconLockDollar,
  IconLogout,
  IconSettings,
  IconUser,
  IconWallet,
} from '@tabler/icons-react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from '../../app/icon.png';
import classes from '../../styles/Navbar/NavbarMinimal.module.css';
import OfflineOverlay from '@/Common/OfflineOverlay';

function NavbarLink({
  Icon,
  label,
  active,
  path,
  onClick,
  create = false,
}) {
  return (
    <>
      {create ? (
        <Divider
          label={`Create`}
          labelPosition="center"
          my="sm"
        />
      ) : (
        <Link href={path}>
          <NavLink
            // variant="filled"
            style={{ borderRadius: '20px' }}
            onClick={onClick}
            label={label}
            leftSection={
              <Icon
                style={{ width: rem(15), height: rem(15) }}
                stroke={1.5}
              />
            }
            active={active}
          ></NavLink>
        </Link>
      )}
    </>
  );
}

export function NavbarLayout({ children }) {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  // const theme = useMantineTheme();
  const pathName = usePathname();
  const [active, setActive] = useState(pathName);
  const isBrowser = useIsBrowser();
  const sidenavData = [
    {
      icon: IconHome2,
      label: 'Home',
      value: 'home',
      path: '/creator/home',
      onClick: () => {
        toggle();
        // setActive('/creator/home');
        router.push('/creator/home');
      },
    },
    {
      icon: IconCreditCardPay,
      label: 'Transactions',
      value: 'transaction',
      path: '/creator/transaction',
      onClick: () => {
        toggle();
        // setActive('/creator/transaction');
        router.push('/creator/transaction');
      },
    },
    {
      icon: IconWallet,
      label: 'Billing',
      value: 'billing',
      path: '/creator/billing',
      onClick: () => {
        toggle();
        // setActive('/creator/billing');
        router.push('/creator/billing');
      },
    },
    {
      icon: IconUser,
      label: 'Account',
      value: 'account',
      path: '/creator/account',
      onClick: () => {
        toggle();
        // setActive('/creator/account');
        router.push('/creator/account');
      },
    },
    { create: true },
    {
      icon: IconLockDollar,
      label: 'Locked Content',
      value: 'lockedcontent',
      path: '/app/lc',
      onClick: () => {
        toggle();
        // setActive('/app/lockedcontent');
        router.push('/app/lc');
      },
    },
    {
      icon: IconBrandTelegram,
      label: 'Telegram',
      value: 'telegram',
      path: '/app/tg',
      onClick: () => {
        toggle();
        // setActive('/app/tg');
        router.push('/app/tg');
      },
    },
    // {
    //   icon: IconBrandDiscord,
    //   label: 'Discord',
    //   value: 'discord',
    //   path: '/app/discord',
    //   onClick: () => {
    //     router.push('/app/discord');
    //   },
    // },
    // {
    //   icon: IconBrandWhatsapp,
    //   label: 'whatsapp',
    //   value: 'whatsapp',
    //   path: '/app/whatsapp',
    //   onClick: () => {
    //     router.push('/app/whatsapp');
    //   },
    // },
    // {
    //   icon: IconBrandMeta,
    //   label: 'meta',
    //   value: 'meta',
    //   path: '/app/meta',
    //   onClick: () => {
    //     router.push('/app/meta');
    //   },
    // },
    {
      icon: IconCash,
      label: 'Payment Page',
      value: 'paymentPage',
      path: '/app/paymentpage',
      onClick: () => {
        toggle();
        // setActive('/app/paymentpage');
        router.push('/app/paymentpage');
      },
    },
    // {
    //   icon: IconCalendarEvent,
    //   label: 'Webinar',
    //   value: 'webinar',
    //   path: '/app/webinar',
    //   onClick: () => {
    //     router.push('/app/webinar');
    //   },
    // },
    {
      icon: IconCertificate,
      label: 'Courses',
      value: 'courses',
      path: '/app/courses',
      onClick: () => {
        toggle();
        // setActive('/app/courses');
        router.push('/app/courses');
      },
    },
  ];
  const links = sidenavData.map(link => {
    const { icon: Icon, label, path } = link;

    return (
      <NavbarLink
        create={link.create}
        Icon={Icon}
        label={label}
        key={link.label}
        path={path}
        active={link.path === active}
        onClick={() => link.onClick()}
      />
    );
  });

  useEffect(() => {
    setActive(pathName);
  }, [pathName]);

  return (
    <>
      <AppShell
        header={{ height: { base: 52, xs: 0 } }}
        navbar={{
          width: { base: '100%', xs: 200 },
          breakpoint: 'xs',
          collapsed: { mobile: !opened },
        }}
        transitionDuration={500}
      >
        <AppShell.Header className={classes.header}>
          <Group h="100%" px="xs">
            <Burger
              color="white"
              opened={opened}
              onClick={toggle}
              // hiddenFrom="xs"
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
                toggle();
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
              {!!isBrowser && links}
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
        <AppShell.Main
          className={classes.appshellMain}
          style={
            {
              // backgroundColor: theme.colors.gray[1],
            }
          }
        >
          {children}
        </AppShell.Main>
      </AppShell>
      <OfflineOverlay />
    </>
  );
}

export default NavbarLayout;
