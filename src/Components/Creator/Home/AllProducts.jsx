import { Text, useMantineTheme } from '@mantine/core';
import {
  IconBrandTelegram,
  IconCertificate,
  IconCreditCard,
  IconLockDollar,
} from '@tabler/icons-react';
import Link from 'next/link';

const ListData = [
  {
    title: 'Locked Content',
    icon: IconLockDollar,
    color: 'violet',
    path: '/app/lc',
  },
  {
    title: 'Telegram Community',
    icon: IconBrandTelegram,
    color: 'blue',
    path: '/app/tg',
  },
  {
    title: 'Digital Products',
    icon: IconCreditCard,
    color: 'teal',
    path: '/app/dp',
  },

  {
    title: 'Courses',
    icon: IconCertificate,
    color: 'indigo',
    path: '/app/courses',
  },
];

export function AllProducts() {
  const theme = useMantineTheme();

  return (
    <div className="flex flex-col space-y-8 rounded-lg">
      <Text className="pb-4 text-3xl font-bold text-gray-800">
        Create Products
      </Text>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ListData.map(item => (
          <Link
            href={item.path}
            key={item.title}
            className="flex transform flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-50 hover:shadow-lg"
          >
            <item.icon
              className="mb-4"
              color={theme.colors[item.color][6]}
              size="2.5rem"
              stroke={1}
            />
            <Text className="text-center text-base font-semibold text-gray-700">
              {item.title}
            </Text>
          </Link>
        ))}
      </div>
    </div>
  );
}
