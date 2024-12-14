'use client';

import { IconMail, IconPhone } from '@tabler/icons-react';

const ViewDPOne = ({ data }) => {
  const formatPrice = price => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Purple section with pattern */}
      <div className="absolute right-0 top-0 hidden h-full min-h-screen w-[23%] overflow-hidden bg-violet-600 lg:block xl:w-[26%] 2xl:w-[31%]">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              // background:
              //   'linear-gradient(0deg, transparent 45%, #ececec 45%, #ececec 55%, transparent 55%, transparent 20%, #ececec 20%, #ececec 30%,transparent 30%), linear-gradient(90deg, transparent 45%, #ececec 45%, #ececec 55%, transparent 55%, transparent 20%, #ececec 20%, #ececec 30%,transparent 30%)',
              // backgroundSize: '6em 6em',
              // backgroundColor: '#ffffff',
              opacity: 1,
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 2px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column - Product Details */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-white shadow-sm">
              {/* Creator Info */}
              <div className="space-y-6 p-6">
                <div className="flex items-center space-x-3">
                  {data.creatorDetails.profilePic ? (
                    <img
                      src={data.creatorDetails.profilePic}
                      alt={data.creatorDetails.username}
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <span className="text-xl font-medium text-gray-600">
                        {data.creatorDetails.username?.charAt(
                          0
                        )}
                      </span>
                    </div>
                  )}
                  <span className="font-medium text-gray-800">
                    {data.creatorDetails.username}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-2xl font-medium text-gray-800">
                  {data.title}
                </h1>

                {/* Success Message */}
                <div className="border-l-4 border-green-400 bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-1">
                      Your last purchase was successful!
                      <button className="ml-1 text-blue-600 hover:text-blue-700">
                        View details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="mb-2 text-lg font-medium text-gray-800">
                    Description
                  </h2>
                  <p className="text-gray-600">
                    {data.description}
                  </p>
                </div>

                {/* Refund Policy */}
                <div className="border-t pt-4">
                  <button className="flex items-center text-gray-800 hover:text-gray-600">
                    <span className="mr-2 text-xl">+</span>
                    Refund policy
                  </button>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Contact {data.creatorDetails.username}
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <IconMail size={16} />
                      <span>
                        {data.creatorDetails.supportEmail ||
                          data.creatorDetails.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <IconPhone size={16} />
                      <span>
                        {data.creatorDetails
                          .supportPhoneNumber ||
                          data.creatorDetails.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="border-t pt-4">
                  <button className="flex items-center text-gray-800 hover:text-gray-600">
                    <span className="mr-2 text-xl">+</span>
                    Terms and conditions
                  </button>
                </div>

                {/* Disclaimer */}
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-medium text-gray-800">
                    Disclaimer
                  </h3>
                  <p className="text-sm text-gray-600">
                    Connectpro Technologies Pvt. Ltd. shall
                    not be held liable for any content or
                    materials published, sold, or
                    distributed by content creators on our
                    associated apps or websites.
                    <button className="ml-1 text-blue-600 hover:text-blue-700">
                      Learn more
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Details */}
          <div className="lg:relative lg:col-span-5">
            <div className="lg:sticky lg:top-8">
              <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
                <h2 className="text-xl font-medium text-gray-800">
                  Payment Details
                </h2>

                {/* Payment Form */}
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-lg bg-gray-100 p-2"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-600">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-lg bg-gray-100 p-2"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Amount */}
                  <div className="pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">
                        Amount total
                      </span>
                      <span className="text-xl font-medium">
                        {formatPrice(
                          data.hasDiscountedPrice
                            ? data.discountedPrice
                            : data.price
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <button className="w-full rounded-lg bg-purple-600 py-3 text-white transition-colors hover:bg-purple-700">
                    Make Payment →
                  </button>

                  {/* Security Badge */}
                  <div className="text-center text-sm text-gray-600">
                    Guaranteed safe & secure payment
                  </div>

                  {/* Payment Methods */}
                  <div className="flex justify-center space-x-4">
                    <img
                      src="/api/placeholder/40/24"
                      alt="Visa"
                      className="h-6"
                    />
                    <img
                      src="/api/placeholder/40/24"
                      alt="Mastercard"
                      className="h-6"
                    />
                    <img
                      src="/api/placeholder/40/24"
                      alt="UPI"
                      className="h-6"
                    />
                    <img
                      src="/api/placeholder/40/24"
                      alt="PayTM"
                      className="h-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4 shadow-lg lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-gray-600">
                Amount total
              </span>
              <span className="text-xl font-medium">
                {formatPrice(
                  data.hasDiscountedPrice
                    ? data.discountedPrice
                    : data.price
                )}
              </span>
            </div>
            <button className="w-full rounded-lg bg-purple-600 py-3 text-white transition-colors hover:bg-purple-700">
              Make Payment →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDPOne;
