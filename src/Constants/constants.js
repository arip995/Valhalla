import Share from '@/Components/Common/General/Share';
import { removeHtmlTags } from '@/Utils/Common';
import { Badge } from '@mantine/core';
import { modals } from '@mantine/modals';
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
  IconAlertCircle,
  IconCircleDot,
  IconCheck,
  IconX,
  IconHelpCircle,
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
  // { label: 'Billing', value: 'billing' },
];

export const PaymentTabOptions = [
  { label: 'Transaction', value: 'transaction' },
  { label: 'Wallet', value: 'wallet' },
];

export const PAYMENT_METHOD_MAPPING = {
  nb: 'Net Banking',
  upi: 'UPI',
  cc: 'Credit Card',
  dc: 'Debit Card',
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

export const isAlphanumeric = str => {
  return /^[a-zA-Z0-9]+$/.test(str);
};

export const RegistrationQuestionTypes = [
  { value: 'text', label: 'Text' },
  { value: 'largeText', label: 'Large Text' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date Picker' },
];

export const TelegramSubscriberStatusMapping = {
  1: (
    <Badge color="green" variant="light" size="md">
      Active
    </Badge>
  ),
  2: (
    <Badge color="red" variant="light" size="md">
      Expired
    </Badge>
  ),
  3: (
    <Badge color="red" variant="light" size="md">
      Deleted
    </Badge>
  ),
  4: (
    <Badge color="red" variant="light" size="md">
      Left
    </Badge>
  ),
};

export const returnMetaForLandingPages = (
  data,
  pageUrl,
  previousImages,
  type
) => {
  const lcImage =
    type === 'lc'
      ? {
          url: 'https://nexify-prod.s3.ap-south-1.amazonaws.com/e14ad803-d93f-439e-88e2-c0f35d7030a2.jpeg',
          width: 500,
          height: 500,
        }
      : {
          url: data?.coverImage?.url,
          width: 500,
          height: 500,
        };

  return {
    title:
      data?.title ||
      'Nexify: all-in-one platform for your digital products and services',
    description:
      removeHtmlTags(data?.description) ||
      'Monetize your content',
    keywords: [
      'Nexify',
      'Creator',
      'Course',
      'Telegram',
      'Discord',
      'Digital Product',
      'Payment',
    ],
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title:
        data?.title ||
        'Nexify: all-in-one platform for your digital products and services',
      description:
        removeHtmlTags(data?.description) ||
        'Monetize your content',
      domain: process.env.NEXT_PUBLIC_HOST,
      type: 'website',
      url: pageUrl,
      author: data?.creatorDetails?.username || '',
      sitename: 'Nexify',
      images: [
        lcImage,
        {
          url: data?.creatorDetails?.profilePic,
          width: 500,
          height: 500,
        },
        ...previousImages,
      ],
    },

    twitter: {
      title:
        data?.title ||
        'Nexify: all-in-one platform for your digital products and services',
      description:
        removeHtmlTags(data?.description) ||
        'Monetize your content',
      type: 'website',
      url: pageUrl,
      author: data?.creatorDetails?.username || '',
      sitename: 'Nexify',
      images: [
        lcImage,
        {
          url: data?.creatorDetails?.profilePic,
          width: 500,
          height: 500,
        },
        ...previousImages,
      ],
    },
  };
};

export const handleShare = productUrl => {
  modals.open({
    title: 'Share on Social',
    children: (
      <div className="pb-4 pt-8">
        <Share url={productUrl} />
      </div>
    ),
  });
};

// Wallet Transaction Status Utilities
export const GetWalletStatusColor = status => {
  switch (status) {
    case 0:
      return 'yellow'; // Pending
    case 1:
      return 'blue'; // Processing
    case 2:
      return 'blue'; // Completed
    case 3:
      return 'green'; // Failed
    case 4:
      return 'red'; // Cancelled
    case 5:
      return 'red'; // Cancelled
    default:
      return 'gray';
  }
};

export const GetWalletStatusText = status => {
  switch (status) {
    case 0:
      return 'Pending';
    case 1:
      return 'Processing';
    case 2:
      return 'Initiated';
    case 3:
      return 'Completed';
    case 4:
      return 'Failed';
    case 5:
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

export const GetWalletStatusIcon = status => {
  switch (status) {
    case 0:
      return <IconAlertCircle size={20} />;
    case 1:
      return <IconCircleDot size={20} />;
    case 2:
      return <IconCircleDot size={20} />;
    case 3:
      return <IconCheck size={20} />;
    case 4:
      return <IconX size={20} />;
    case 5:
      return <IconX size={20} />;
    default:
      return <IconHelpCircle size={20} />;
  }
};
