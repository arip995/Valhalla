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
  IconBrandTelegram,
  IconCreditCardPay,
  IconHome2,
  IconLockDollar,
  IconLogout,
  IconUser,
  IconWallet,
  IconCertificate,
  IconCash,
  IconBrandDiscord,
  IconCalendarEvent,
} from '@tabler/icons-react';
import { useState } from 'react';
import classes from '../../styles/creator/NavbarMinimal.module.css';

const mockdata = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconCreditCardPay, label: 'Transactions' },
  { icon: IconWallet, label: 'Billing' },
  { icon: IconUser, label: 'Account' },
  { create: true },
  { icon: IconBrandTelegram, label: 'Telegram' },
  { icon: IconBrandDiscord, label: 'Discord' },
  { icon: IconLockDollar, label: 'Premium Content' },
  { icon: IconCash, label: 'Payment Page' },
  { icon: IconCalendarEvent, label: 'Webinar' },
  { icon: IconCertificate, label: 'Courses' },
];

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

export function Creator() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(2);
  const theme = useMantineTheme();

  const links = mockdata.map((link, index) => {
    const { icon: Icon, label } = link;

    return (
      <NavbarLink
        create={link.create}
        Icon={Icon}
        label={label}
        key={link.label}
        active={index === active}
        onClick={() => setActive(index)}
      />
    );
  });

  return (
    <AppShell
      header={{ height: { base: 40, xs: 0 } }}
      navbar={{
        width: { base: '100%', xs: 200 },
        breakpoint: 'xs',
        collapsed: { mobile: !opened },
      }}
      transitionDuration={1000}
      padding="xs"
    >
      <AppShell.Header>
        <Group h="100%" px="xs">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="xs"
            size="sm"
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section
          py={8}
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
        style={{
          backgroundColor: theme.colors.gray[1],
        }}
      >
        Panda
      </AppShell.Main>
    </AppShell>
  );
}

export default Creator;
