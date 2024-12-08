import LandingPageButton from '@/Components/Common/Buttons/LandingPageButton';
import {
  IconBolt,
  IconBook,
  IconBrandTelegram,
  IconCheckbox,
  IconCreditCard,
  IconGlobe,
  IconLocation,
  IconMail,
  IconUsers,
  IconVideo,
} from '@tabler/icons-react';
import FAQs2 from '../ui/FAQs/FAQs2';

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

const LandingPage = () => {
  // Rest of the features and faqs arrays remain the same...

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation - Enhanced with dropdown hover effects */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 p-2">
                <img
                  src="/icon.png"
                  alt=""
                  className="h-6 w-6 object-contain text-white"
                />
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent">
                Nexify
              </span>
            </div>

            <div className="hidden items-center space-x-8 md:flex">
              <a
                href="#features"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600"
              >
                Features
              </a>
              <a
                href="#faq"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600"
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600"
              >
                Contact
              </a>
              <LandingPageButton type />
            </div>

            <LandingPageButton type className="md:hidden" />
          </div>
        </div>
      </nav>

      {/* Hero Section - Completely revamped */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-100/50 to-transparent" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-purple-200 opacity-30 blur-3xl" />
        <div className="absolute -left-12 -top-12 h-72 w-72 rounded-full bg-pink-200 opacity-30 blur-3xl" />

        <div className="container relative mx-auto px-4 pb-24 pt-16 sm:px-6">
          {/* Main Hero Content */}
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-purple-100 bg-white/90 px-4 py-2 backdrop-blur-sm">
              <IconBolt className="mr-2 h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-800">
                Launch your digital empire today!
              </span>
            </div>

            <h1 className="mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl md:text-6xl">
              The all-in-one platform for your digital
              products and services
            </h1>

            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-700 sm:text-xl">
              Consolidate all your digital products,
              coaching, subscriptions, courses, and email
              marketing into one powerful link-in-bio store.
              Start monetizing your content today!
            </p>

            {/* CTA Buttons */}
            <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <LandingPageButton />
              {/* <button className="flex w-full items-center justify-center rounded-full border-2 border-purple-200 px-8 py-3 font-medium text-purple-600 hover:bg-purple-50 sm:w-auto">
                Watch Demo
                <IconVideo className="ml-2 h-5 w-5" />
              </button> */}
            </div>

            {/* Social Proof */}
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
              <div className="rounded-xl border border-purple-100 bg-white/80 p-4 backdrop-blur-sm">
                <div className="mb-1 text-2xl font-bold text-purple-600">
                  10k+
                </div>
                <div className="text-sm text-gray-600">
                  Active Creators
                </div>
              </div>
              <div className="rounded-xl border border-purple-100 bg-white/80 p-4 backdrop-blur-sm">
                <div className="mb-1 text-2xl font-bold text-purple-600">
                  $2M+
                </div>
                <div className="text-sm text-gray-600">
                  Revenue Generated
                </div>
              </div>
              <div className="rounded-xl border border-purple-100 bg-white/80 p-4 backdrop-blur-sm">
                <div className="mb-1 text-2xl font-bold text-purple-600">
                  98%
                </div>
                <div className="text-sm text-gray-600">
                  Satisfaction Rate
                </div>
              </div>
              <div className="rounded-xl border border-purple-100 bg-white/80 p-4 backdrop-blur-sm">
                <div className="mb-1 text-2xl font-bold text-purple-600">
                  24/7
                </div>
                <div className="text-sm text-gray-600">
                  Customer Support
                </div>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="relative mt-16">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/50 to-transparent" />
            <div className="rounded-2xl border border-purple-100 bg-white/90 p-6 shadow-xl backdrop-blur-sm md:p-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex items-start space-x-3">
                  <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2 text-white">
                    <IconGlobe className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">
                      Global Reach
                    </h3>
                    <p className="text-sm text-gray-600">
                      Sell your products to customers
                      worldwide with multi-currency support
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2 text-white">
                    <IconUsers className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">
                      Community Building
                    </h3>
                    <p className="text-sm text-gray-600">
                      Create and nurture your community with
                      built-in tools
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2 text-white">
                    <IconCheckbox className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">
                      Easy Setup
                    </h3>
                    <p className="text-sm text-gray-600">
                      Get started in minutes with our
                      intuitive dashboard
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            provides everything you need to monetize your
            work efficiently.
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

      {/* FAQ Section */}
      <FAQs2 />

      {/* Contact Section */}
      <div
        id="contact"
        className="container mx-auto px-4 py-12 sm:px-6"
      >
        <div className="mx-auto max-w-2xl rounded-xl bg-white/50 p-8 backdrop-blur-sm">
          <h2 className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
            Contact Us
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <IconLocation className="mt-1 min-h-5 min-w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">
                  FL NO-101-D, 1ST FLOOR, BLOCK-D, SRUSTI
                  ELITE, SUNDARPADA, BHUBANESWAR, KHORDHA,
                  ODISHA, 751002
                </p>
              </div>
            </div>
            {/* <div className="flex items-center space-x-3">
              <IconPhone className="h-5 w-5 text-purple-600" />
              <p className="text-sm text-gray-600">
                7327039736
              </p>
            </div> */}
            <div className="flex items-center space-x-3">
              <IconMail className="h-5 w-5 text-purple-600" />
              <p className="text-sm text-gray-600">
                support@nexify.club
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 sm:px-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-4">
              © 2024 Polmi Software Services Technologies
              Private Limited. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/about"
                className="hover:text-purple-600"
              >
                About Us
              </a>
              <a
                href="/privacy-policy"
                className="hover:text-purple-600"
              >
                Privacy Policy
              </a>
              <a
                href="/refund-and-cancellation"
                className="hover:text-purple-600"
              >
                Refund & Cancellation
              </a>
              <a
                href="terms-and-conditions"
                className="hover:text-purple-600"
              >
                Terms and Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
