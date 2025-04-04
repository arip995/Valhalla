import BuyButtonClient from '@/Components/Common/Buttons/BuyButtonClient';
import FooterTwo from '@/Components/Common/Footer/FooterTwo';
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
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons-react';
import RenderModulesAndLessons from './ViewCourseOneModuleAndLessons';

const ViewCourseOne = ({ data, isPreview }) => {
  // const calculateModulesLessonsAndDuration = (content) =>{
  //     let modules = content.length;
  //     let lessons = 0
  //     let duration = 0
  //     content.map((m)=>{
  //         lessons += m?.lessons?.length || 0
  //         m?.lessons?.length && m.lessons.map((l)=>{
  //             duration += l.duration || 0
  //         })
  //     });
  //     return { modules,lessons,duration}
  // }
  const { totalDuration, modules, lessons } =
    calculateCourseContentHighlights(data.content);

  return (
    <>
      {isPreview ? null : <ProductHeader data={data} />}
      <div className="flex w-full max-w-none flex-col items-center px-2 pt-2 md:px-4 md:pt-4">
        <div className="flex max-w-2xl flex-1 flex-col gap-8">
          <h2 className="break-all text-center">
            {data?.title}
          </h2>
          {!!data.coverImage?.url && (
            <img
              src={data.coverImage?.url}
              height={600}
              width={800}
              className="aspect-video md:w-full"
              alt=""
              // priority
            />
          )}
          <BuyButtonClient
            className="hidden md:block"
            size="md"
            animate={false}
            creatorId={data.creatorId}
            creatorDetails={data.creatorDetails}
            productDetails={data}
            price={
              data.hasDiscountedPrice
                ? Number(data.discountedPrice)
                : data.price
            }
          >
            {data.cta || 'Enroll for'} ₹
            <span
              className={`${data.hasDiscountedPrice ? 'line-through' : ''} mr-2`}
            >
              {' '}
              {data.price}
            </span>
            {!!data.hasDiscountedPrice && (
              <span className="mr-2 font-bold">
                {data.discountedPrice}
              </span>
            )}
          </BuyButtonClient>
          <div className="flex w-full flex-col items-center">
            <div className="flex w-full flex-col">
              {!!data?.description && (
                <>
                  <h3 className="mb-2">Description</h3>
                  <Spoiler
                    maxHeight={300}
                    showLabel={
                      <div className="flex items-center gap-1">
                        Show more{' '}
                        <IconChevronDown stroke={0.9} />
                      </div>
                    }
                    hideLabel={
                      <div className="flex items-center gap-1">
                        Hide <IconChevronUp stroke={0.9} />
                      </div>
                    }
                  >
                    <TypographyStylesProvider>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.description,
                        }}
                      />
                    </TypographyStylesProvider>
                  </Spoiler>
                </>
              )}

              <h3 className="mb-2 mt-4">
                Program Structure
              </h3>
              <div className="gap1 mb-2 flex text-sm text-gray-700">
                {modules} Sections • {lessons} Lectures •{' '}
                {convertMinutesToHours(totalDuration, 2)}{' '}
                total length
              </div>
              <Accordion
                chevronPosition="right"
                variant="contained"
                multiple
                defaultValue={[
                  data.content?.[0]?._id ||
                    data.content?.[0]?.id,
                ]}
              >
                <RenderModulesAndLessons
                  content={data.content}
                />
              </Accordion>
            </div>
          </div>
          <ViewSections
            sections={data.sections}
            content={data.content}
          />
        </div>
        <FooterTwo className="mt-8" />
        <div className="fixed bottom-0 z-50 w-full border-t border-t-gray-200 bg-white p-4 md:hidden">
          <BuyButtonClient
            size="md"
            animate={false}
            creatorId={data.creatorId}
            creatorDetails={data.creatorDetails}
            productDetails={data}
            price={
              data.hasDiscountedPrice
                ? Number(data.discountedPrice)
                : data.price
            }
          >
            {data.cta || 'Enroll for'} ₹
            <span
              className={`${data.hasDiscountedPrice ? 'line-through' : ''} mr-2`}
            >
              {data.price ? data.price : ''}
            </span>
            {!!data.hasDiscountedPrice && (
              <span className="mr-2 font-bold">
                (₹{data.discountedPrice})
              </span>
            )}
          </BuyButtonClient>
        </div>
      </div>
    </>
  );
};

export default ViewCourseOne;
