import { Button } from '@mantine/core';
import React from 'react';
export const TAB_OPTIONS = [
  {
    label: 'Published',
    value: 1,
  },
  {
    label: 'Unpublished',
    value: 5,
  },
  {
    label: 'Draft',
    value: 0,
  },
];

const Tab = ({
  activeTab,
  setActiveTab = () => {},
  tabsOptions = TAB_OPTIONS,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {tabsOptions.map((item, index) => {
        return (
          <Button
            key={index}
            color={item.value === activeTab ? 'black' : ''}
            variant={
              item.value === activeTab
                ? 'filled'
                : 'default'
            }
            onClick={() => {
              setActiveTab(item.value);
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};

export default Tab;
