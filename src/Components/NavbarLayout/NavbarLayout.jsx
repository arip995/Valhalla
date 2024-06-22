'use client';
import {
  AppShell,
  Burger,
  Divider,
  Group,
  ScrollArea,
  UnstyledButton,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandDiscord,
  IconBrandTelegram,
  IconCalendarEvent,
  IconCash,
  IconCertificate,
  IconCreditCardPay,
  IconHome2,
  IconLockDollar,
  IconLogout,
  IconUser,
  IconWallet,
} from '@tabler/icons-react';
import { useState } from 'react';
import classes from '../../styles/Navbar/NavbarMinimal.module.css';
import { usePathname, useRouter } from 'next/navigation';

function NavbarLink({
  Icon,
  label,
  active,
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
        <UnstyledButton
          onClick={onClick}
          className={classes.link}
          data-active={active || undefined}
        >
          <Icon
            style={{ width: rem(15), height: rem(15) }}
            stroke={1.5}
          />
          <span className={classes.text}>{label}</span>
        </UnstyledButton>
      )}
    </>
  );
}

export function NavbarLayout({ activeTab, children }) {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(activeTab || 'home');
  const theme = useMantineTheme();
  const pathName = usePathname();

  const mockdata = [
    {
      icon: IconHome2,
      label: 'Home',
      value: 'home',
      path: '/creator/home',
      onClick: () => {
        toggle();
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
        router.push('/creator/account');
      },
    },
    { create: true },
    {
      icon: IconBrandTelegram,
      label: 'Telegram',
      value: 'telegram',
      path: '/app/telegram',
      onClick: () => {
        toggle();
        router.push('/app/telegram');
      },
    },
    {
      icon: IconLockDollar,
      label: 'Locked Content',
      value: 'lockedcontent',
      path: '/app/lockedcontent',
      onClick: () => {
        toggle();
        router.push('/app/lockedcontent');
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
    //   icon: IconCash,
    //   label: 'Payment Page',
    //   value: 'paymentPage',
    //   path: '/app/paymentpage',
    //   onClick: () => {
    //     router.push('/app/paymentpage');
    //   },
    // },
    // {
    //   icon: IconCalendarEvent,
    //   label: 'Webinar',
    //   value: 'webinar',
    //   path: '/app/webinar',
    //   onClick: () => {
    //     router.push('/app/webinar');
    //   },
    // },
    // {
    //   icon: IconCertificate,
    //   label: 'Courses',
    //   value: 'courses',
    //   path: '/app/courses',
    //   onClick: () => {
    //     router.push('/app/courses');
    //   },
    // },
  ];

  const links = mockdata.map((link, index) => {
    const { icon: Icon, label, value } = link;

    return (
      <NavbarLink
        create={link.create}
        Icon={Icon}
        label={label}
        key={link.label}
        active={link.path === pathName}
        onClick={() => link.onClick()}
      />
    );
  });

  return (
    <AppShell
      header={{ height: { base: 60, xs: 0 } }}
      navbar={{
        width: { base: '100%', xs: 200 },
        breakpoint: 'xs',
        collapsed: { mobile: !opened },
      }}
      transitionDuration={1000}
    >
      <AppShell.Header className={classes.header}>
        <Group h="100%" px="xs">
          <Burger
            color="white"
            opened={opened}
            onClick={toggle}
            hiddenFrom="xs"
            size="sm"
          />
          Nexify
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section
          py={12}
          pl={16}
          className={classes.company}
        >
          Nexify
        </AppShell.Section>
        <AppShell.Section grow p={8} component={ScrollArea}>
          {links}
        </AppShell.Section>
        <AppShell.Section
          pl={16}
          className={classes.footer}
        >
          <UnstyledButton
            onClick={onClick => {}}
            className={classes.footerButton}
          >
            <IconLogout
              style={{ width: rem(15), height: rem(15) }}
              stroke={1.5}
            />
            <span className={classes.text}>Logout</span>
          </UnstyledButton>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main
        style={
          {
            // backgroundColor: theme.colors.gray[1],
          }
        }
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

export default NavbarLayout;
