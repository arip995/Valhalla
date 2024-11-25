import { Button } from '@mantine/core';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
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
  pushToRouter,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePushQuery = tab => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('tab', tab);
    router.push(`${pathname}?${currentParams.toString()}`);
  };

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
              if (pushToRouter) {
                handlePushQuery(item.value);
              }
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
