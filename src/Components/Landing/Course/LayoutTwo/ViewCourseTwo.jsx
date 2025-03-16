import BuyButtonClient from '@/Components/Common/Buttons/BuyButtonClient';
import Disclaimer from '@/Components/Common/Footer/Disclaimer';
import ProductHeader from '@/Components/Common/Header/Productheader';
import ViewSections from '@/Components/Common/ViewSections/ViewSections';
import {
  calculateCourseContentHighlights,
  convertMinutesToHours,
} from '@/Utils/Common';
import {
  Accordion,
  Spoiler,
  TypographyStylesProvider,
} from '@mantine/core';
import {
  IconBook,
  IconChevronDown,
  IconChevronUp,
  IconClock,
  IconLayoutGrid,
} from '@tabler/icons-react';
import Image from 'next/image';
import RenderModulesAndLessons from './ViewCourseTwoModuleAndLessons';

const ViewCourseTwo = ({ data, isPreview }) => {
  const { totalDuration, modules, lessons } =
    calculateCourseContentHighlights(data?.content || []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {!isPreview && <ProductHeader data={data} />}

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 2px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2">
              {data?.coverImage?.url && (
                <div className="relative">
                  <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src={data.coverImage.url}
                      height={600}
                      width={800}
                      className="object-cover transition duration-700 hover:scale-105"
                      alt={data.title}
                      priority
                    />
                  </div>
                  {/* <div className="absolute -bottom-6 left-6 right-6 rounded-xl bg-white p-4 shadow-lg backdrop-blur-sm">
                    <div className="flex items-center justify-between text-sm md:text-base">
                      <div className="flex items-center gap-1">
                        <IconStarFilled className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium text-gray-900">
                          4.9 Rating
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconCertificate className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-900">
                          Certificate Included
                        </span>
                      </div>
                    </div>
                  </div> */}
                </div>
              )}
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  {/* <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-800">
                    {data.category}
                  </div> */}
                  <h1 className="text-2xl font-bold leading-tight text-white md:text-3xl">
                    {data?.title}
                  </h1>
                </div>

                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  <div className="rounded-xl bg-white bg-opacity-10 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <IconLayoutGrid className="h-6 w-6 text-blue-300" />
                      <div>
                        <p className="text-sm text-blue-200">
                          Modules
                        </p>
                        <p className="text-xl font-bold text-white">
                          {modules}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white bg-opacity-10 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <IconBook className="h-6 w-6 text-blue-300" />
                      <div>
                        <p className="text-sm text-blue-200">
                          Lessons
                        </p>
                        <p className="text-xl font-bold text-white">
                          {lessons}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white bg-opacity-10 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <IconClock className="h-6 w-6 text-blue-300" />
                      <div>
                        <p className="text-sm text-blue-200">
                          Duration
                        </p>
                        <p className="text-xl font-bold text-white">
                          {convertMinutesToHours(
                            totalDuration,
                            2
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden max-h-12 flex-col gap-4 sm:flex-row md:flex">
                  <BuyButtonClient
                    className="py-auto group relative h-[50px] overflow-hidden rounded-xl bg-white px-8 text-lg font-semibold text-blue-900 shadow-lg transition hover:bg-white hover:text-blue-900 hover:shadow-xl"
                    loaderProps={{ color: 'violet' }}
                    style={{
                      backgroundColor: 'white',
                    }}
                    size="lg"
                    animate={false}
                    creatorId={data?.creatorId}
                    creatorDetails={data?.creatorDetails}
                    productDetails={data}
                    price={
                      data?.hasDiscountedPrice
                        ? Number(data?.discountedPrice)
                        : data?.price
                    }
                  >
                    <span className="relative z-10 text-gray-700">
                      {data?.cta || 'Enroll for'} ₹
                      <span
                        className={`${data?.hasDiscountedPrice ? 'line-through' : ''} mr-2`}
                      >
                        {data?.price}
                      </span>
                      {data?.hasDiscountedPrice && (
                        <span className="ml-2 font-bold text-green-600">
                          ₹{data?.discountedPrice}
                        </span>
                      )}
                    </span>
                  </BuyButtonClient>

                  {/* <button className="py-auto h-[50px] rounded-xl border-2 border-white/30 bg-white bg-opacity-10 px-8 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                    Preview
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-24">
        {/* Description Section */}
        {data?.description && (
          <>
            {/* <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">
            <IconStars className="h-8 w-8 text-yellow-600" />
          </div> */}
            <h2 className="mb-2 text-center text-xl font-bold text-gray-900 md:text-3xl">
              Course Description
            </h2>
            <div className="mb-16 overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100">
              <div className="p-4 md:p-8">
                <Spoiler
                  maxHeight={300}
                  showLabel={
                    <div className="mt-4 flex items-center gap-2 font-medium text-blue-600 transition hover:text-blue-700 hover:underline">
                      Show more{' '}
                      <IconChevronDown className="h-4 w-4" />
                    </div>
                  }
                  hideLabel={
                    <div className="mt-4 flex items-center gap-2 font-medium text-blue-600 transition hover:text-blue-700 hover:underline">
                      Show less{' '}
                      <IconChevronUp className="h-4 w-4" />
                    </div>
                  }
                >
                  <TypographyStylesProvider>
                    <div
                      className="prose prose-lg prose-headings:font-bold prose-a:text-blue-600 max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: data.description,
                      }}
                    />
                  </TypographyStylesProvider>
                </Spoiler>
              </div>
            </div>
          </>
        )}

        {/* Course Content Section */}
        <>
          <h2 className="mb-2 text-center text-xl font-bold text-gray-900 md:text-3xl">
            Course Content
          </h2>
          <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100">
            <div className="p-4 md:p-8">
              <Accordion
                chevronPosition="right"
                variant="separated"
                multiple
                defaultValue={[
                  data.content?.[0]?._id ||
                    data.content?.[0]?.id,
                ]}
                className="divide-y divide-gray-100"
              >
                <RenderModulesAndLessons
                  content={data?.content}
                />
              </Accordion>
            </div>
          </div>
        </>

        {/* Additional Sections */}
        <div className="mt-16">
          <ViewSections
            sections={data?.sections}
            content={data?.content}
          />
        </div>
        <div className="mt-4 flex w-full flex-col gap-4 md:gap-8">
          <Disclaimer showTitle={false} />
        </div>
      </div>

      {/* <FooterTwo /> */}

      {/* Mobile CTA */}
      <div className="fixed bottom-0 z-50 flex w-full gap-4 border-t border-gray-200 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 p-4 shadow-xl md:hidden">
        <BuyButtonClient
          className="py-auto group relative h-[50px] overflow-hidden rounded-xl bg-white px-8 text-lg font-semibold text-blue-900 shadow-lg transition hover:bg-white hover:text-blue-900 hover:shadow-xl"
          size="lg"
          loaderProps={{ color: 'violet' }}
          style={{
            backgroundColor: 'white',
          }}
          animate={false}
          creatorId={data?.creatorId}
          creatorDetails={data?.creatorDetails}
          productDetails={data}
          price={
            data?.hasDiscountedPrice
              ? Number(data?.discountedPrice)
              : data?.price
          }
        >
          <span className="relative z-10 text-gray-700">
            {data?.cta || 'Enroll for'} ₹
            <span
              className={`${data?.hasDiscountedPrice ? 'line-through' : ''} mr-2`}
            >
              {data?.price}
            </span>
            {data?.hasDiscountedPrice && (
              <span className="ml-2 font-bold text-green-600">
                ₹{data?.discountedPrice}
              </span>
            )}
          </span>
          {/* <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform group-hover:translate-x-full" /> */}
        </BuyButtonClient>
        {/* <button className="py-auto h-[50px] rounded-xl border-2 border-white/30 bg-white bg-opacity-10 px-8 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
          Preview
        </button> */}
      </div>
    </div>
  );
};

export default ViewCourseTwo;
