import {
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import {
  IconBrandTelegram,
  IconCertificate,
  IconCreditCard,
  IconLockDollar,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import classes from '../../../styles/creator/Home/AllProducts.module.css';
import Link from 'next/link';

export function AllProducts() {
  const router = useRouter();
  const theme = useMantineTheme();
  const mockdata = [
    {
      title: 'Locked Content',
      icon: IconLockDollar,
      color: 'grape',
      path: '/app/lockedcontent',
      onClick: () => {
        router.push('/app/lockedcontent');
      },
    },
    {
      title: 'Telegram Integration',
      icon: IconBrandTelegram,
      color: 'blue',
      path: '/app/telegram',
      onClick: () => {
        router.push('/app/telegram');
      },
    },
    {
      title: 'Paymnent Page',
      icon: IconCreditCard,
      color: 'violet',
      path: '/app/paymentpage',
      onClick: () => {
        router.push('/app/paymentpage');
      },
    },

    {
      title: 'Courses',
      icon: IconCertificate,
      color: 'indigo',
      path: '/app/courses',
      onClick: () => {
        router.push('/app/courses');
      },
    },
  ];

  const items = mockdata.map(item => (
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
