import {
  IconBrandTelegram,
  IconCash,
  IconCertificate,
  IconCreditCardPay,
  IconHome2,
  IconLockDollar,
  IconShoppingBag,
  IconUser,
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
    label: 'Payment',
    value: 'Payment',
    path: '/payment',
  },
  {
    icon: IconShoppingBag,
    label: 'Purchase',
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
    value: 'lc',
    path: '/app/lc',
  },
  {
    icon: IconBrandTelegram,
    label: 'Telegram',
    value: 'tg',
    path: '/app/tg',
  },
  {
    icon: IconCash,
    label: 'Digital Product',
    value: 'digitalproduct',
    path: '/app/dp',
  },
  {
    icon: IconCertificate,
    label: 'Course',
    value: 'course',
    path: '/app/course',
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
