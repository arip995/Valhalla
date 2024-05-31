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
import { useRouter } from 'next/navigation';

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

  const mockdata = [
    {
      icon: IconHome2,
      label: 'Home',
      value: 'home',
      onClick: () => {
        router.push('/creator/home');
      },
    },
    {
      icon: IconCreditCardPay,
      label: 'Transactions',
      value: 'transaction',
      onClick: () => {
        router.push('/creator/transaction');
      },
    },
    {
      icon: IconWallet,
      label: 'Billing',
      value: 'billing',
      onClick: () => {
        router.push('/creator/billing');
      },
    },
    {
      icon: IconUser,
      label: 'Account',
      value: 'account',
      onClick: () => {
        router.push('/creator/account');
      },
    },
    { create: true },
    {
      icon: IconBrandTelegram,
      label: 'Telegram',
      value: 'telegram',
      onClick: () => {
        router.push('/app/telegram');
      },
    },
    {
      icon: IconLockDollar,
      label: 'Locked Content',
      value: 'lockedcontent',
      onClick: () => {
        router.push('/app/lockedcontent');
      },
    },
    // {
    //   icon: IconBrandDiscord,
    //   label: 'Discord',
    //   value: 'discord',
    //   onClick: () => {
    //     router.push('/app/discord');
    //   },
    // },
    // {
    //   icon: IconCash,
    //   label: 'Payment Page',
    //   value: 'paymentPage',
    //   onClick: () => {
    //     router.push('/app/paymentpage');
    //   },
    // },
    // {
    //   icon: IconCalendarEvent,
    //   label: 'Webinar',
    //   value: 'webinar',
    //   onClick: () => {
    //     router.push('/app/webinar');
    //   },
    // },
    // {
    //   icon: IconCertificate,
    //   label: 'Courses',
    //   value: 'courses',
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
        active={link.value === activeTab}
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
