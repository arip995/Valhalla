import { Accordion, Spoiler } from '@mantine/core';
import RenderModulesAndLessons from './ViewCourseModuleAndLessons';
import Image from 'next/image';
import ViewSections from '@/Components/Common/ViewSections/ViewSections';
import BuyButton from '@/Components/Common/Buttons/BuyButton';

const ViewCourseOne = ({ data }) => {
  console.log(data);
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

  return (
    <div className="flex w-full max-w-none flex-col items-center p-2 md:p-4">
      <div className="flex max-w-2xl flex-col gap-8">
        <h2 className="text-center">{data?.title}</h2>
        {!!data.coverImage && (
          <Image
            src={data.coverImage}
            height={600}
            width={800}
            className="aspect-video w-screen md:w-full"
            alt=""
            priority
          />
        )}
        <BuyButton size="md" animate={false}>
          {!!data.discountedPrice && 'Actual Price'} ₹
          <span
            className={`${data.discountedPrice ? 'line-through' : ''} mr-2`}
          >
            {data.price ? data.price : ''}
          </span>
          {!!data.discountedPrice && (
            <span className="mr-2 font-bold">
              (₹{data.discountedPrice})
            </span>
          )}
          {data.cta}
        </BuyButton>
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full flex-col">
            {!!data?.description && (
              <>
                <h3 className="mb-2">Description</h3>
                <Spoiler maxHeight={300}>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                  ></div>
                </Spoiler>
              </>
            )}

            <h3 className="mb-2 mt-4">Program Structure</h3>
            <div className="gap1 mb-2 flex text-sm text-gray-700">
              44 sections • 373 lectures • 61h 44m total
              length
            </div>
            <Accordion
              chevronPosition="right"
              variant="contained"
              multiple
              defaultValue={[
                data.content[0]._id || data.content[0].id,
              ]}
            >
              <RenderModulesAndLessons
                content={data.content}
              />
            </Accordion>
          </div>
        </div>
        <ViewSections sections={data.sections} />
      </div>
    </div>
  );
};

export default ViewCourseOne;
