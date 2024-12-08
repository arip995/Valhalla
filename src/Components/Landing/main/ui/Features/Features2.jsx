import {
  IconBook,
  IconBrandTelegram,
  IconCreditCard,
  IconVideo,
} from '@tabler/icons-react';
import React from 'react';
const features = [
  {
    icon: <IconBook className="h-5 w-5" />,
    title: 'Courses',
    description:
      'Create, sell, and manage online courses with our intuitive platform. Perfect for educators and experts.',
  },
  {
    icon: <IconBrandTelegram className="h-5 w-5" />,
    title: 'Telegram Community',
    description:
      'Build and monetize your Telegram community with advanced management tools and analytics.',
  },
  {
    icon: <IconCreditCard className="h-5 w-5" />,
    title: 'Payment Pages',
    description:
      'Accept payments globally with secure, customizable checkout pages for all your digital products.',
  },
  {
    icon: <IconVideo className="h-5 w-5" />,
    title: 'Webinar/Events',
    description:
      'Host engaging webinars and virtual events with built-in monetization and attendance tracking.',
  },
];

const Features2 = () => {
  return (
    <div
      id="features"
      className="container mx-auto px-4 py-12 sm:px-6"
    >
      <div className="mb-12 text-center">
        <h2 className="mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
          Unleash the power of monetization solutions
        </h2>
        <p className="mx-auto max-w-xl text-sm text-gray-600 sm:text-base">
          Turn your content into cash with our seamless,
          integrated solution. Whether {`you're`} creating
          courses or managing webinars, our platform
          provides everything you need to monetize your work
          efficiently.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group rounded-lg border border-gray-100 bg-white/50 p-4 backdrop-blur-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2 text-white">
              {feature.icon}
            </div>
            <h3 className="mb-1 text-base font-semibold">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features2;
