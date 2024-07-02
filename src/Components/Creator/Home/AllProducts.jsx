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

export function AllProducts() {
  const router = useRouter();
  const theme = useMantineTheme();
  const mockdata = [
    {
      title: 'Locked Content',
      icon: IconLockDollar,
      color: 'grape',
      onClick: () => {
        router.push('/app/lockedcontent');
      },
    },
    {
      title: 'Telegram Integration',
      icon: IconBrandTelegram,
      color: 'blue',
      onClick: () => {
        router.push('/app/telegram');
      },
    },
    {
      title: 'Paymnent Page',
      icon: IconCreditCard,
      color: 'violet',
      onClick: () => {
        router.push('/app/paymentpage');
      },
    },

    {
      title: 'Courses',
      icon: IconCertificate,
      color: 'indigo',
      onClick: () => {
        router.push('/app/courses');
      },
    },
  ];

  const items = mockdata.map(item => (
    <UnstyledButton
      key={item.title}
      className={classes.item}
      onClick={item.onClick}
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
    </UnstyledButton>
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
