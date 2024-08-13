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
