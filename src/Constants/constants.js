import { Badge } from '@mantine/core';
import {
  IconBrandTelegram,
  IconCash,
  IconCertificate,
  IconFileText,
  IconFileTypography,
  IconLink,
  IconLock,
  IconMusic,
  IconPhoto,
  IconVideo,
} from '@tabler/icons-react';

export const Categories = [
  {
    value: 'Finance',
    label: 'Finance',
  },
  {
    value: 'Education',
    label: 'Education',
  },
  {
    value: 'Food',
    label: 'Food',
  },
  {
    value: 'Jobs',
    label: 'Jobs',
  },
  {
    value: 'Entertainment',
    label: 'Entertainment',
  },
  {
    value: 'Travel',
    label: 'Travel',
  },
  {
    value: 'Marketing',
    label: 'Marketing',
  },
  {
    value: 'Fitness',
    label: 'Fitness',
  },
  {
    value: 'Photography',
    label: 'Photography',
  },
  {
    value: 'Astrology',
    label: 'Astrology',
  },
  {
    value: 'Lifestyle',
    label: 'Lifestyle',
  },
  {
    value: 'Comedy',
    label: 'Comedy',
  },
  {
    value: 'Environment',
    label: 'Environment',
  },
  {
    value: 'Relationships',
    label: 'Relationships',
  },
  {
    value: 'Beauty and Makeup',
    label: 'Beauty and Makeup',
  },
  {
    value: 'Crypto',
    label: 'Crypto',
  },
  {
    value: 'Gaming',
    label: 'Gaming',
  },
  {
    value: 'Health',
    label: 'Health',
  },
  {
    value: 'Fashion & Lifestyle',
    label: 'Fashion & Lifestyle',
  },
  {
    value: 'Motivation',
    label: 'Motivation',
  },
  {
    value: 'Parenting',
    label: 'Parenting',
  },
  {
    value: 'Music',
    label: 'Music',
  },
  {
    value: 'Spirituality',
    label: 'Spirituality',
  },
  {
    value: 'Startups',
    label: 'Startups',
  },
  {
    value: 'Technology',
    label: 'Technology',
  },
];

export const CategoriesList = [
  'Finance',
  'Education',
  'Food',
  'Jobs',
  'Entertainment',
  'Travel',
  'Marketing',
  'Fitness',
  'Photography',
  'Astrology',
  'Lifestyle',
  'Comedy',
  'Environment',
  'Relationships',
  'Beauty and Makeup',
  'Crypto',
  'Gaming',
  'Health',
  'Fashion & Lifestyle',
  'Motivation',
  'Parenting',
  'Music',
  'Spirituality',
  'Startups',
  'Technology',
];

export const UserTypes = [
  {
    label: 'Social Media Creator',
    value: 'socialMediaCreator',
  },
  {
    label: 'Professional',
    value: 'professional',
  },
  {
    label: 'Student',
    value: 'student',
  },
  {
    label: 'Artist',
    value: 'artist',
  },
  {
    label: 'Freelancer',
    value: 'freelancer',
  },
  {
    label: 'Brand',
    value: 'brand',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

export const PeriodTypeOptions = [
  { label: 'Days', value: 'Daily', days: 1 },
  { label: 'Weeks', value: 'Weekly', days: 7 },
  { label: 'Months', value: 'Monthly', days: 30 },
  { label: 'Years', value: 'Yearly', days: 365 },
  { label: 'Lifetime', value: 'Lifetime', days: 36500 },
];

export const PeriodTypeOptionsSelect = [
  { label: 'Days', value: 'Daily', days: 1 },
  { label: 'Weeks', value: 'Weekly', days: 7 },
  { label: 'Months', value: 'Monthly', days: 30 },
  { label: 'Years', value: 'Yearly', days: 365 },
  { label: 'Lifetime', value: 'Lifetime', days: 36500 },
];

export const PriceTypes = [
  {
    heading: 'Fixed Price',
    text: 'Charge a one-time fixed pay',
    value: 'Lifetime',
  },
  {
    heading: 'Subscription',
    text: 'Charge weekly, monthly, annually',
    value: 'Subscription',
  },
];

export const DurationOptions = [
  {
    label: 'Days',
    value: 'Daily',
    days: 1,
  },
  {
    label: 'Weeks',
    value: 'Weekly',
    days: 7,
  },
  {
    label: 'Months',
    value: 'Monthly',
    days: 30,
  },
  {
    label: 'Years',
    value: 'Yearly',
    days: 365,
  },
];

export const PeriodTypeOptionsMapping = {
  Daily: 'days',
  Weekly: 'weeks',
  Monthly: 'months',
  Yearly: 'years',
  Lifetime: 'Lifetime',
};

export const CalculatePeriod = (periodType, value) => {
  switch (periodType) {
    case 'Daily':
      return value;
    case 'Weekly':
      return value / 7;
    case 'Monthly':
      return value / 30;
    case 'Yearly':
      return value / 365;
    case 'Lifetime':
      return '';
  }
};

export const CalculatePeriodString = (
  periodType,
  value
) => {
  switch (periodType) {
    case 'Daily':
      return `${value} ${value === 1 ? 'day' : 'days'}`;
    case 'Weekly':
      return `${value / 7} ${value === 7 ? 'week' : 'weeks'}`;
    case 'Monthly':
      return `${value / 30} ${value === 30 ? 'month' : 'months'}`;
    case 'Yearly':
      return `${value / 365} ${value === 365 ? 'year' : 'years'}`;
    case 'Lifetime':
      return 'Lifetime';
  }
};

export const CurrencySymbolMapping = {
  rupees: '₹',
};

export const IconMapping = {
  file: IconFileText,
  image: IconPhoto,
  video: IconVideo,
  link: IconLink,
  audio: IconMusic,
  textImage: IconFileTypography,
};

export const ProductTypeBadgeMapping = {
  tg: (
    <Badge
      leftSection={<IconBrandTelegram size={12} />}
      color="blue"
      variant="light"
      size="xs"
    >
      Telegram
    </Badge>
  ),
  lc: (
    <Badge
      leftSection={<IconLock size={12} />}
      color="violet"
      variant="light"
      size="xs"
    >
      Locked Content
    </Badge>
  ),
  course: (
    <Badge
      leftSection={<IconCertificate size={12} />}
      color="yellow"
      variant="light"
      size="xs"
    >
      Course
    </Badge>
  ),
  dp: (
    <Badge
      leftSection={<IconCash size={12} />}
      color="yellow"
      variant="light"
      size="xs"
    >
      Digital Product
    </Badge>
  ),
};

export const AccountTabOptions = [
  { label: 'Profile', value: 'profile' },
];

export const AccountCreatorTabOptions = [
  { label: 'Profile', value: 'profile' },
  { label: 'Payment', value: 'payment' },
  { label: 'Billing', value: 'billing' },
];

export const PaymentTabOptions = [
  { label: 'Transaction', value: 'transaction' },
  { label: 'Wallet', value: 'wallet' },
];

export const PAYMENT_METHOD_MAPPING = {
  nb: 'Net Banking',
  upi: 'UPI',
  cc: 'Credit Card',
  wallet: 'Wallet',
  cce: 'Credit Card EMI',
  dce: 'Debit Card EMI',
  ce: 'Cardless EMI',
  pl: 'Pay Later',
};

export const sectionTypes = app => {
  switch (app) {
    case 'dp':
      return [
        { type: 'testimonial', isEnabled: false },
        { type: 'faq', isEnabled: false },
        { type: 'benifit', isEnabled: false },
        { type: 'social', isEnabled: false },
        { type: 'gallery', isEnabled: false },
      ];
    default:
      return [
        { type: 'testimonial', isEnabled: false },
        { type: 'faq', isEnabled: false },
        { type: 'benifit', isEnabled: false },
        { type: 'social', isEnabled: false },
        { type: 'gallery', isEnabled: false },
        { type: 'about', isEnabled: false },
        { type: 'highlight', isEnabled: false },
      ];
  }
};

export const PRICE_TYPES = [
  {
    value: 'fixed',
    title: 'Fixed price',
    description: 'Charge a one-time fixed pay',
  },
  {
    value: 'customerDecided',
    title: 'Customers decide price',
    description: 'Let customers pay any price',
  },
];

export const validateLink = link => {
  const regex =
    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/;
  return regex.test(link);
};

export const RegistrationQuestionTypes = [
  { value: 'text', label: 'Text' },
  { value: 'largeText', label: 'Large Text' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date Picker' },
];
