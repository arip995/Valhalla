import {
  StatusArray,
  StatusColorMapping,
  StatusMapping,
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

const Filters = ({
  searchText = '',
  onUpdate = () => {},
  status = [0, 1, 5, 6],
}) => {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(status);
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
      StatusArray.map(item => {
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
                color={StatusColorMapping[item]}
                styles={{
                  root: {
                    border: '0px',
                    background: 'transparent',
                  },
                }}
              >
                {StatusMapping[item]}
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
    setSelected(status);
    setSearchValue(searchText);
  }, [searchText, status]);

  return (
    <div className="flex w-full items-end gap-2 md:flex-row md:justify-end">
      <TextInput
        placeholder="Search title"
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
          handleUpdate('search', event.currentTarget.value);
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
                  color={StatusColorMapping[Number(item)]}
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
    </div>
  );
};

export default React.memo(Filters);
