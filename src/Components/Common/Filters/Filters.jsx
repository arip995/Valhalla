import {
  StatusArray,
  StatusColorMapping,
  StatusMapping,
  StatusPaymentArray,
  StatusPaymentColorMapping,
  StatusPaymentMapping,
} from '@/Constants/ProductListingContants';
import {
  Avatar,
  Badge,
  CloseButton,
  Group,
  Menu,
  rem,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import {
  IconCheck,
  IconChevronDown,
  IconSearch,
} from '@tabler/icons-react';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import classes from '../../../styles/creator/ProductListing/MenuDropdown.module.css';
import LayoutChangeButton from '../Buttons/LayoutChangeButton';
import Tab from '../Tabs/Tab';

const Filters = ({
  searchText = '',
  onUpdate = () => {},
  setIsGrid = () => {},
  isGrid,
  searchPlaceholder = 'Search title',
  status = [0, 1, 5, 6],
  showSearch = true,
  showStatus = true,
  showLayoutChange = true,
  showTab,
  menuType, //undefined for transaction and 1 for PL
}) => {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(status);
  const menuItems = menuType
    ? StatusArray
    : StatusPaymentArray;
  const menuItemsColor = menuType
    ? StatusColorMapping
    : StatusPaymentColorMapping;
  const [searchValue, setSearchValue] =
    useState(searchText);
  const handleUpdate = useDebouncedCallback(
    (type, value) => {
      onUpdate(type, value);
    },
    500
  );
  const items = useMemo(
    () =>
      menuItems.map(item => {
        return (
          <Menu.Item
            onClick={() => {
              setSelected(prev => {
                if (prev.includes(item)) {
                  prev = prev.filter(val => val !== item);
                } else {
                  prev = [...prev, item];
                }
                handleUpdate('status', prev);
                return prev;
              });
            }}
            key={item}
          >
            <Group justify="space-between">
              <Badge
                variant="dot"
                color={
                  menuType
                    ? StatusColorMapping[item]
                    : StatusPaymentColorMapping[item]
                }
                styles={{
                  root: {
                    border: '0px',
                    background: 'transparent',
                  },
                }}
              >
                {menuType
                  ? StatusMapping[item]
                  : StatusPaymentMapping[item]}
              </Badge>
              {selected.includes(item) ? (
                <IconCheck size="1rem" stroke={1} />
              ) : null}
            </Group>
          </Menu.Item>
        );
      }),
    [selected]
  );

  useEffect(() => {
    if (
      JSON.stringify(selected) !== JSON.stringify(status)
    ) {
      setSelected(status);
    }
    if (searchValue !== searchText) {
      setSearchValue(searchText);
    }
  }, [searchText, status]);

  return (
    <div className="flex w-full flex-wrap items-end justify-end gap-2 md:flex-row md:flex-nowrap">
      {!!showTab && <Tab />}

      {!!showSearch && (
        <TextInput
          maxLength={20}
          placeholder={searchPlaceholder}
          value={searchValue}
          className="w-full md:w-max md:min-w-80"
          rightSectionPointerEvents="all"
          styles={{
            input: {
              border: '1px solid #e9ecef',
              minHeight: '40px',
            },
          }}
          onChange={event => {
            if (event.currentTarget.value) {
              if (event.currentTarget.value.trim() === '') {
                return;
              }
            }
            setSearchValue(event.currentTarget.value);
            handleUpdate(
              'search',
              event.currentTarget.value
            );
          }}
          leftSection={
            <IconSearch
              style={{
                height: rem(20),
                width: rem(20),
              }}
              onClick={() => setSearchValue('')}
            />
          }
          rightSection={
            <CloseButton
              variant="transparent"
              aria-label="Clear input"
              onClick={() => {
                setSearchValue('');
                handleUpdate('search', '');
              }}
              style={{
                display: searchValue ? undefined : 'none',
              }}
            />
          }
        />
      )}

      {!!showStatus && (
        <Menu
          onOpen={() => setOpened(true)}
          onClose={() => setOpened(false)}
          position="bottom-end"
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton
              className={classNames(
                'flex h-full min-h-10 min-w-max items-center justify-between px-2 md:w-40',
                classes.control
              )}
              data-expanded={opened || undefined}
            >
              <Avatar.Group>
                {selected.map(item => (
                  <Avatar
                    key={item}
                    variant="filled"
                    className="hidden:svg"
                    size="xs"
                    color={menuItemsColor[Number(item)]}
                  >
                    {' '}
                  </Avatar>
                ))}
              </Avatar.Group>
              <Badge color="black" variant="transparent">
                Status
              </Badge>
              <IconChevronDown
                size="1rem"
                className={classes.icon}
                stroke={1}
              />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>{items}</Menu.Dropdown>
        </Menu>
      )}
      <div
        className={classNames('hidden', {
          '!block': showLayoutChange,
        })}
      >
        <LayoutChangeButton
          isGrid={isGrid}
          setIsGrid={setIsGrid}
        />
      </div>
    </div>
  );
};

export default React.memo(Filters);
