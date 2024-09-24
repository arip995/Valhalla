import {
  CloseButton,
  rem,
  Tabs,
  TextInput,
} from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { TAB_OPTIONS } from '../Tabs/Tab';

const FiltersOne = ({
  searchText = '',
  onUpdate = () => {},
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
      {/* <Tab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabOptions={tabOptions}
      /> */}
      <TextInput
        placeholder="Search title"
        value={searchValue}
        rightSectionPointerEvents="all"
        styles={{
          input: {
            border: '1px solid #ececec',
            // minHeight: '40px',
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
    </div>
  );
};

export default React.memo(FiltersOne);
