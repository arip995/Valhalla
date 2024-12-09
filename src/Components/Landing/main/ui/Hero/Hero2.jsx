import LandingPageButton from '@/Components/Common/Buttons/LandingPageButton';
import {
  IconBolt,
  IconCheckbox,
  IconGlobe,
  IconUsers,
} from '@tabler/icons-react';

const Hero2 = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100/50 to-transparent" />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-purple-200 opacity-30 blur-3xl" />
      <div className="absolute -left-12 -top-12 h-72 w-72 rounded-full bg-pink-200 opacity-30 blur-3xl" />

      <div className="container relative mx-auto px-4 pb-12 pt-16 sm:px-6">
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
            Consolidate all your digital products, coaching,
            subscriptions, courses, and email marketing into
            one powerful link-in-bio store. Start monetizing
            your content today!
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
  );
};

export default Hero2;
