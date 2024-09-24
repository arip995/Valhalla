import {
  CloseButton,
  rem,
  Tabs,
  TextInput,
} from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import {
  IconLayout2,
  IconList,
  IconSearch,
} from '@tabler/icons-react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { TAB_OPTIONS } from '../Tabs/Tab';

const FiltersOne = ({
  searchText = '',
  onUpdate = () => {},
  isGrid,
  setIsGrid = () => {},
  activeTab,
}) => {
  const [searchValue, setSearchValue] =
    useState(searchText);
  const handleUpdate = useDebouncedCallback(
    (type, value) => {
      onUpdate(type, value);
    },
    500
  );

  useEffect(() => {
    setSearchValue(searchText);
  }, [searchText]);

  return (
    <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
      <Tabs
        radius="xl"
        color="black"
        value={activeTab.toString()}
        onChange={value => {
          onUpdate('tab', Number(value));
        }}
        variant="pills"
      >
        <Tabs.List grow>
          {TAB_OPTIONS.map((item, i) => {
            return (
              <Tabs.Tab
                key={i}
                value={item.value.toString()}
              >
                {item.label}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
      </Tabs>
      <div className="flex w-full gap-3">
        <TextInput
          placeholder="Search title"
          value={searchValue}
          rightSectionPointerEvents="all"
          className="w-full"
          styles={{
            input: {
              border: '1px solid #ececec',
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
        <div className="flex items-center gap-1 rounded-sm border border-gray-200 p-1">
          <IconList
            onClick={e => {
              e.stopPropagation();
              setIsGrid(false);
            }}
            color="gray"
            stroke={1}
            // size={12}
            className={classNames(
              'cursor-pointer rounded-sm hover:bg-gray-200',
              {
                'bg-gray-200 text-black': !isGrid,
              }
            )}
          />
          <IconLayout2
            onClick={e => {
              e.stopPropagation();
              setIsGrid(true);
            }}
            color="gray"
            stroke={1}
            // size={12}
            className={classNames(
              'cursor-pointer rounded-sm hover:bg-gray-200',
              {
                'bg-gray-200 text-black': isGrid,
              }
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(FiltersOne);
