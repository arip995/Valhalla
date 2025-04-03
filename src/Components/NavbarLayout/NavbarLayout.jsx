'use client';

// import OfflineOverlay from '@/Components/Common/OfflineOverlay';
import { SidenavData } from '@/Constants/Navbarlayout';
import { logout } from '@/Utils/getuserData';
import useUser from '@/Utils/Hooks/useUser';
import useIsBrowser from '@/Utils/useIsBrowser';
import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Group,
  Menu,
  NavLink,
  ScrollArea,
  Text,
  rem,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
  IconChevronUp,
  IconEdit,
  IconLogout,
  IconMenu2,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Logo from '../../app/icon.png';
import classes from '../../styles/Navbar/NavbarMinimal.module.css';
import CompleteProfileModal from '../Common/Modal/CompleteProfileModal';
import NavbarLink from './NavbarLink';

const SettingsMenu = ({ showLabel, setOpened, router }) => (
  <Menu shadow="md" width={190} trigger="hover">
    <Menu.Target>
      <NavLink
        variant="subtle"
        style={{ borderRadius: '6px' }}
        fullWidth
        label={
          showLabel ? (
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
          ) : (
            <div className="flex flex-col items-center text-[10px]">
              <IconSettings
                style={{
                  width: rem(20),
                  height: rem(20),
                }}
                stroke={1.5}
              />
              Settings
            </div>
          )
        }
        justify="space-between"
        rightSection={
          showLabel && (
            <IconChevronUp
              style={{
                width: rem(17),
                height: rem(17),
              }}
              stroke={1.5}
            />
          )
        }
      />
    </Menu.Target>
    <Menu.Dropdown>
      <Link
        href={'/account'}
        onClick={() => setOpened(false)}
      >
        <Menu.Item
          leftSection={
            <IconUser
              style={{
                width: rem(17),
                height: rem(17),
              }}
              stroke={1.5}
            />
          }
        >
          Account
        </Menu.Item>
      </Link>
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
        onClick={() => handleLogout(router)}
      >
        Logout
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
);

const LogoSection = ({
  showLabel,
  setShowLabel,
  setOpened,
}) => (
  <AppShell.Section
    withHeader={false}
    py={12}
    px={16}
    className={classes.company}
  >
    {showLabel ? (
      <div className="flex w-full items-center justify-between gap-2">
        <Link
          href="/home"
          prefetch={false}
          className="flex select-none items-center gap-1"
        >
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent">
            Nexify
          </span>
        </Link>
        <ActionIcon
          variant="subtle"
          color="rgba(199, 199, 199, 1)"
          size="lg"
          onClick={() => setShowLabel(prev => !prev)}
        >
          <IconMenu2 stroke={1} color="black" />
        </ActionIcon>
      </div>
    ) : (
      <div className="flex w-full flex-col items-center gap-4">
        <ActionIcon
          variant="subtle"
          color="rgba(199, 199, 199, 1)"
          size="lg"
          onClick={() => setShowLabel(prev => !prev)}
        >
          <IconMenu2 stroke={1} color="black" />
        </ActionIcon>
        <Link href="/home" prefetch={false}>
          <img
            height={28}
            width={28}
            src={Logo.src}
            alt="Nexify Logo"
            onClick={() => setOpened(false)}
          />
        </Link>
      </div>
    )}
  </AppShell.Section>
);

const handleLogout = router => {
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
    onConfirm: () => {
      logout();
      router.push('/signin');
    },
  });
};

export function NavbarLayout({ children }) {
  const router = useRouter();
  const pathName = usePathname();
  const isBrowser = useIsBrowser();
  const isMobile = useMediaQuery('(max-width: 48em)');
  const { user } = useUser(true);
  const [opened, setOpened] = useState(false);
  const [
    openedBecomeCretorModal,
    setOpenedBecomeCretorModal,
  ] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const Links = useMemo(() => {
    const isReferrer =
      user?.referrerInviteCodeDetails?.userId === user?._id;

    let mapData = [];

    if (isReferrer) {
      mapData = SidenavData;
    } else if (user?.isCreator) {
      mapData = SidenavData.filter(
        item => item.value !== 'admin'
      );
    } else {
      mapData = [SidenavData[2]];
    }

    return mapData.map(link => {
      const { icon: Icon, label, path } = link;
      return (
        <NavbarLink
          apps={link.apps}
          showLabel={showLabel}
          Icon={Icon}
          label={label}
          key={link.label}
          path={path}
          active={link.path === pathName}
          onClick={() => setOpened(false)}
        />
      );
    });
  }, [user?._id, pathName, showLabel]);

  useEffect(() => {
    setShowLabel(isMobile);
  }, [isMobile]);

  return (
    <div>
      <AppShell
        header={{ height: { base: 52, sm: 0 } }}
        navbar={{
          width: {
            sm: showLabel ? 200 : 94,
          },
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        transitionDuration={500}
      >
        {/* Header - Mobile only */}
        <AppShell.Header className={classes.header}>
          <Group h="100%" px="xs">
            <Burger
              color="white"
              opened={opened}
              onClick={() => setOpened(prev => !prev)}
              size="md"
            />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent">
              Nexify
            </span>
          </Group>
        </AppShell.Header>

        {/* Navbar */}
        <AppShell.Navbar
          style={{ transition: 'width 0.3s' }}
        >
          {/* Logo Section */}
          <LogoSection
            showLabel={showLabel}
            setShowLabel={setShowLabel}
            setOpened={setOpened}
          />

          {/* Navigation Links */}
          <AppShell.Section
            grow
            p={8}
            component={ScrollArea}
          >
            <div className="flex flex-col gap-2">
              {!!isBrowser && Links}
            </div>
          </AppShell.Section>

          {/* Become Creator Section - Only shown for non-creators when labels are visible */}
          {showLabel && !user.isCreator && (
            <AppShell.Section className={classes.footer}>
              <div className="flex w-full flex-col gap-3 border border-gray-200 p-2 font-semibold">
                Become a creator
                <Button
                  size="xs"
                  variant="default"
                  leftSection={<IconEdit size={16} />}
                  onClick={() =>
                    setOpenedBecomeCretorModal(true)
                  }
                >
                  Creator
                </Button>
              </div>
            </AppShell.Section>
          )}

          {/* Settings Menu Section */}
          <AppShell.Section className={classes.footer}>
            <SettingsMenu
              showLabel={showLabel}
              setOpened={setOpened}
              router={router}
            />
          </AppShell.Section>
        </AppShell.Navbar>

        {/* Main Content */}
        <AppShell.Main className={classes.appshellMain}>
          {children}
        </AppShell.Main>
      </AppShell>

      {/* Modals */}
      {openedBecomeCretorModal && (
        <CompleteProfileModal
          opened={openedBecomeCretorModal}
          onClose={() => setOpenedBecomeCretorModal(false)}
        />
      )}
      {/* <OfflineOverlay /> */}
    </div>
  );
}

export default NavbarLayout;
