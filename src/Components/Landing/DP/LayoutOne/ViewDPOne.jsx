import ViewProfile from '@/Components/Common/General/ViewProfile';
import NotFoundOne from '@/Components/Common/NotFoundOne/NotFoundOne';
import ViewSections2 from '@/Components/Common/ViewSections/ViewSection2';
import { formatPrice } from '@/Utils/Common';
import { TypographyStylesProvider } from '@mantine/core';
import { IconMail, IconPhone } from '@tabler/icons-react';
import Image from 'next/image';
import ViewDPForm from './ViewDPForm';
import ViewDPOneButtonModal from './ViewDPOneButtonModal';
import ViewOrLoginDPOne from './ViewOrLoginDPOne';

const ViewDPOne = ({ data }) => {
  if (!data) return <NotFoundOne />;

  return (
    <div className="relative min-h-screen bg-white">
      {/* Purple section with pattern */}
      <div
        className={`absolute right-0 top-0 hidden h-full min-h-screen w-[23%] overflow-hidden lg:block xl:w-[26%] 2xl:w-[31%]`}
        style={{ backgroundColor: data.themeColor }}
      >
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
      <div className="relative mx-auto max-w-6xl px-2 py-4 md:px-4 md:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column - Product Details */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-white shadow-sm">
              {/* Creator Info */}
              <div className="space-y-6 p-3 md:p-6">
                <div className="flex items-center space-x-3">
                  <ViewProfile
                    name={
                      data.creatorDetails.name ||
                      `${data.creatorDetails.firstName} ${data.creatorDetails.lastName}`
                    }
                    profilePic={
                      data.creatorDetails.profilePic
                    }
                  />
                </div>

                {/* Product Title */}
                <h1 className="text-2xl font-medium text-gray-900">
                  {data.title}
                </h1>

                {/* Cover Image */}
                <div className="aspect-video overflow-hidden rounded-md">
                  <Image
                    src={data.coverImage?.url}
                    height={300}
                    width={400}
                    className="h-full w-full object-cover"
                    alt={data.title}
                    priority
                  />
                </div>

                {/* Success Message */}
                <ViewOrLoginDPOne productId={data._id} />

                {/* Description */}
                <div>
                  <h2 className="mb-2 text-lg font-medium text-gray-900">
                    Description
                  </h2>
                  <TypographyStylesProvider>
                    <div
                      className="prose prose-lg prose-headings:font-bold prose-a:text-blue-600 max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: data.description,
                      }}
                    />
                  </TypographyStylesProvider>
                </div>

                {/* Sections */}
                {data?.sections?.length ? (
                  <ViewSections2
                    sections={data?.sections}
                    content={data?.content}
                  />
                ) : null}

                {/* Refund Policy */}
                {/* <div className="border-t pt-4">
                  <button className="flex items-center text-gray-800 hover:text-gray-600">
                    <span className="mr-2 text-xl">+</span>
                    Refund policy
                  </button>
                </div> */}

                {/* Contact Info */}
                <div className="border-t pt-4">
                  <h2 className="mb-2 text-lg font-medium text-gray-800">
                    Contact
                  </h2>
                  <div className="space-y-2">
                    {data.supportEmail ? (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <IconMail size={16} />
                        <span>{data.supportEmail}</span>
                      </div>
                    ) : null}
                    {data.supportPhoneNumber ? (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <IconPhone size={16} />
                        <span>
                          {data.supportPhoneNumber}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="rounded-lg bg-gray-50 p-2">
                  <h3 className="mb-2 text-sm font-medium text-gray-800">
                    Terms and Conditions
                  </h3>
                  <p className="text-xs text-gray-600">
                    You agree to share information entered
                    on this page with{' '}
                    {data.creatorDetails.name} (owner of
                    this page) and Cosmofeed, adhering to
                    applicable laws.
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="rounded-lg bg-gray-50 p-2">
                  <h3 className="mb-2 text-sm font-medium text-gray-800">
                    Disclaimer
                  </h3>
                  <p className="text-xs text-gray-600">
                    Polmi Software Services Technologies
                    Pvt. Ltd. shall not be held liable for
                    any content or materials published,
                    sold, or distributed by content creators
                    on our associated apps or websites.
                    <a
                      href="/disclaimer"
                      className="ml-1 text-blue-600 hover:text-blue-700"
                    >
                      Learn more
                    </a>
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-1">
                    <img src="/icon.png" className="h-8" />
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-lg font-semibold text-transparent">
                      Nexify
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Want to create your own payment page?
                    Experience hassle-free payouts and
                    premium support.
                    <a
                      href="/home"
                      className="ml-1 text-blue-600 hover:text-blue-700"
                    >
                      Get started now!
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Details */}
          <div className="hidden lg:relative lg:col-span-5 lg:block">
            <div className="lg:sticky lg:top-14">
              <ViewDPForm
                formatPrice={formatPrice}
                data={data}
              />
            </div>
          </div>

          {/* Signin button or profile button */}
          {/* <div className="fixed right-2 top-2">
            <SigninOrProfileButton />
          </div> */}

          <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4 shadow-lg lg:hidden">
            {/* <div className="mb-4 flex items-center justify-between">
              <span className="text-gray-600">
                Amount total
              </span>
              <span className="text-xl font-medium">
                {data.hasDiscountedPrice ? (
                  <>
                    <span className="mr-2 text-gray-500 line-through">
                      {formatPrice(data.price)}
                    </span>
                    <span className="text-green-600">
                      {formatPrice(data.discountedPrice)}
                    </span>
                  </>
                ) : (
                  <span>{formatPrice(data.price)}</span>
                )}
              </span>
            </div> */}
            <ViewDPOneButtonModal data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDPOne;
