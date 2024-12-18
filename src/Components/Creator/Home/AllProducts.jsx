/* eslint-disable no-unused-vars */
import CreateProductModal from '@/Components/Common/Modal/CreateProductModal';
import {
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  IconBrandTelegram,
  IconCash,
  IconCertificate,
  IconLockDollar,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

const ListData = [
  {
    title: 'Locked Content',
    icon: IconLockDollar,
    color: 'violet',
    path: '/create/lc',
    productType: 'lc',
  },
  {
    title: 'Courses',
    modal: true,
    icon: IconCertificate,
    color: 'indigo',
    path: '/app/courses',
    productType: 'course',
  },
  {
    title: 'Telegram Community',
    icon: IconBrandTelegram,
    color: 'blue',
    path: '/create/tg',
    productType: 'tg',
  },
  {
    title: 'Digital Products',
    modal: true,
    icon: IconCash,
    color: 'teal',
    path: '/app/dp',
    productType: 'dp',
  },
];

export function AllProducts() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [productType, setProductType] = useState(null);

  return (
    <>
      <div className="flex flex-col space-y-8 rounded-lg">
        <Text className="text-2xl font-bold text-gray-800">
          Create Products
        </Text>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ListData.map(item => (
            <Paper
              key={item.title}
              withBorder
              radius="md"
              className="hover:scale-102 transition duration-300 ease-in-out hover:shadow-lg"
            >
              {item.modal ? (
                <div
                  className="flex transform cursor-pointer flex-col items-center justify-center p-4"
                  onClick={() => {
                    setOpened(true);
                    setProductType(item.productType);
                  }}
                >
                  <item.icon
                    className="mb-4"
                    color={theme.colors[item.color][6]}
                    size="2.5rem"
                    stroke={1.5}
                  />
                  <Text className="text-center text-base font-semibold text-gray-900">
                    {item.title}
                  </Text>
                </div>
              ) : (
                <Link
                  href={item.path}
                  className="flex transform flex-col items-center justify-center p-4"
                >
                  <item.icon
                    className="mb-4"
                    color={theme.colors[item.color][6]}
                    size="2.5rem"
                    stroke={1.5}
                  />
                  <Text className="text-center text-base font-semibold text-gray-900">
                    {item.title}
                  </Text>
                </Link>
              )}
            </Paper>
          ))}
        </div>
      </div>
      {!!opened && (
        <CreateProductModal
          productType={productType}
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
        />
      )}
    </>
  );
}
