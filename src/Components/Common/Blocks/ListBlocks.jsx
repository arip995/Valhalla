import { ActionIcon, Anchor } from '@mantine/core';
import {
  IconBook,
  IconInfoCircle,
  IconLayoutGrid,
} from '@tabler/icons-react';
import React from 'react';

const navigations = [
  {
    icon: (
      <ActionIcon variant="light" radius="lg" size="lg">
        <IconLayoutGrid />
      </ActionIcon>
    ),
    title: 'Resources',
    desc: 'Lorem Ipsum is simply dummy text of the printing',
    href: 'javascript:void(0)',
  },
  {
    icon: (
      <ActionIcon variant="light" radius="lg" size="lg">
        <IconBook />
      </ActionIcon>
    ),
    title: 'Guides',
    desc: 'Lorem Ipsum is simply dummy text of the printing',
    href: 'javascript:void(0)',
  },
  {
    icon: (
      <ActionIcon variant="light" radius="lg" size="lg">
        <IconInfoCircle />
      </ActionIcon>
    ),
    title: 'Support',
    desc: 'Lorem Ipsum is simply dummy text of the printing',
    href: 'javascript:void(0)',
  },
];

const ListBlocks = () => {
  return (
    <ul className="divide-y">
      {navigations.map((item, idx) => (
        <li key={idx} className="flex gap-x-4 py-6">
          <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full text-indigo-600">
            {item.icon}
          </div>
          <div className="space-y-1">
            <h4 className="font-medium text-gray-800">
              {item.title}
            </h4>
            <p>{item.desc}</p>
            <Anchor
              href={item.href}
              className="inline-flex items-center gap-x-1 text-sm font-medium duration-150"
            >
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Anchor>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListBlocks;
