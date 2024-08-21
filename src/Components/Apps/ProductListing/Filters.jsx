import {
  StatusColorMapping,
  StatusMapping,
} from '@/Constants/ProductListingContants';
import {
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
  IconChevronDown,
  IconSearch,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import classes from '../../../styles/creator/ProductListing/MenuDropdown.module.css';
import classNames from 'classnames';

const Filters = ({
  searchText = '',
  onUpdate = () => {},
  status = 1,
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
  const items = Object.keys(StatusMapping || {}).map(
    item => {
      if (Number(item) === Number(selected)) return null;
      return (
        <Menu.Item
          onClick={() => {
            setSelected(item);
            handleUpdate('status', item);
          }}
          key={item}
        >
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
        </Menu.Item>
      );
    }
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
          setSearchValue(event.currentTarget.value);
          handleUpdate('search', event.target.value);
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
            <Group gap="xs">
              <Badge
                variant="dot"
                color={StatusColorMapping[selected]}
                styles={{
                  root: {
                    border: '0px',
                    background: 'transparent',
                  },
                }}
              >
                {StatusMapping[selected]}
              </Badge>
            </Group>
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

export default Filters;
