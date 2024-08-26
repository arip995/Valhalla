import {
  IconBrandTelegram,
  IconCash,
  IconCertificate,
  IconCreditCardPay,
  IconHome2,
  IconLockDollar,
  IconShoppingBag,
  IconUser,
  IconWallet,
} from '@tabler/icons-react';

export const SidenavData = [
  {
    icon: IconHome2,
    label: 'Home',
    value: 'home',
    path: '/home',
  },
  {
    icon: IconCreditCardPay,
    label: 'Transactions',
    value: 'transaction',
    path: '/transaction',
  },
  {
    icon: IconWallet,
    label: 'Billing',
    value: 'billing',
    path: '/billing',
  },
  {
    icon: IconShoppingBag,
    label: 'Purchases',
    value: 'purchase',
    path: '/purchase',
  },
  {
    icon: IconUser,
    label: 'Audience',
    value: 'audience',
    path: '/audience',
  },
  { apps: true },
  {
    icon: IconLockDollar,
    label: 'Locked Content',
    value: 'lockedcontent',
    path: '/app/lc',
  },
  {
    icon: IconBrandTelegram,
    label: 'Telegram',
    value: 'telegram',
    path: '/app/tg',
  },
  {
    icon: IconCash,
    label: 'Digital Products',
    value: 'digitalproduct',
    path: '/app/digitalproduct',
  },
  {
    icon: IconCertificate,
    label: 'Courses',
    value: 'courses',
    path: '/app/courses',
  },
  // {
  //   icon: IconBrandDiscord,
  //   label: 'Discord',
  //   value: 'discord',
  //   path: '/app/discord',
  // },
  // {
  //   icon: IconBrandWhatsapp,
  //   label: 'whatsapp',
  //   value: 'whatsapp',
  //   path: '/app/whatsapp',
  // },
  // {
  //   icon: IconBrandMeta,
  //   label: 'meta',
  //   value: 'meta',
  //   path: '/app/meta',
  // },
  // {
  //   icon: IconCalendarEvent,
  //   label: 'Webinar',
  //   value: 'webinar',
  //   path: '/app/webinar',
  // },
];
