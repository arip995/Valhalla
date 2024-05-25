"use client";
import {
  AppShell,
  Burger,
  Group,
  ScrollArea,
  Tooltip,
  UnstyledButton,
  rem,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { MantineLogo } from "@mantinex/mantine-logo";
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import classes from "./NavbarMinimal.module.css";

const mockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconGauge, label: "Dashboard" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics" },
  { icon: IconCalendarStats, label: "Releases" },
  { icon: IconUser, label: "Account" },
  { icon: IconFingerprint, label: "Security" },
  { icon: IconSettings, label: "Settings" },
];

function NavbarLink({ Icon, label, active, onClick }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export function page() {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(2);
  const theme = useMantineTheme();

  const links = mockdata.map((link, index) => {
    const { icon: Icon, label } = link;

    return (
      <NavbarLink
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
      header={{ height: { base: 60, xs: 0 } }}
      navbar={{
        width: "fit-content",
        breakpoint: "xs",
        collapsed: { mobile: !opened },
      }}
      padding="xs"
    >
      <AppShell.Header>
        <Group h="100%" px="xs">
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          {/* <Group>
            <Button onClick={() => setColorScheme("light")}>Light</Button>
            <Button onClick={() => setColorScheme("dark")}>Dark</Button>
            <Button onClick={() => setColorScheme("auto")}>Auto</Button>
            <Button onClick={clearColorScheme}>Clear</Button>
          </Group> */}
          {/* <MantineLogo size={30} /> */}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="xs">
        {/* <AppShell.Section>Navbar header</AppShell.Section> */}
        <AppShell.Section grow my="xs" component={ScrollArea}>
          {links}
          {/* 60 links in a scrollable section
          {Array(60)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="xs" animate={false} />
            ))} */}
        </AppShell.Section>
        {/* <AppShell.Section>Navbar footer –</AppShell.Section> */}
      </AppShell.Navbar>
      <AppShell.Main
        style={{
          backgroundColor: theme.colors.gray[1],
          color: theme.colors.blue[9],
        }}
      >
        Main
      </AppShell.Main>
    </AppShell>
  );
}

export default page;
