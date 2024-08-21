import { Text, useMantineTheme } from '@mantine/core';
import {
  IconBrandTelegram,
  IconCertificate,
  IconCreditCard,
  IconLockDollar,
} from '@tabler/icons-react';
import Link from 'next/link';
import classes from '../../../styles/creator/Home/AllProducts.module.css';

const ListData = [
  {
    title: 'Locked Content',
    icon: IconLockDollar,
    color: 'grape',
    path: '/app/lc',
  },
  {
    title: 'Telegram Community',
    icon: IconBrandTelegram,
    color: 'blue',
    path: '/app/tg',
  },
  {
    title: 'Paymnent Page',
    icon: IconCreditCard,
    color: 'violet',
    path: '/app/paymentpage',
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

  const items = ListData.map(item => (
    <Link
      href={item.path}
      key={item.title}
      className={classes.item}
    >
      <item.icon
        className=""
        color={theme.colors[item.color][6]}
        size="2rem"
      />
      <Text
        size="xs"
        mt={7}
        className={classes.productTitle}
      >
        {item.title}
      </Text>
    </Link>
  ));

  return (
    <div
      className={`flex flex-col gap-2`}
      color={theme.colors[6]}
    >
      <Text className={classes.title}>Create Products</Text>
      <div className="flex flex-col gap-4 md:flex-row">
        {items}
      </div>
    </div>
  );
}
