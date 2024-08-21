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
    path: '/creator/home',
  },
  {
    icon: IconCreditCardPay,
    label: 'Transactions',
    value: 'transaction',
    path: '/creator/transaction',
  },
  {
    icon: IconWallet,
    label: 'Billing',
    value: 'billing',
    path: '/creator/billing',
  },
  {
    icon: IconShoppingBag,
    label: 'Purchases',
    value: 'purchases',
    path: '/purchases',
  },
  {
    icon: IconUser,
    label: 'Account',
    value: 'account',
    path: '/creator/account',
  },
  { create: true },
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
    label: 'Payment Page',
    value: 'paymentPage',
    path: '/app/paymentpage',
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
