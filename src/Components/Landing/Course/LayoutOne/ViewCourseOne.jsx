import { Accordion, Spoiler } from '@mantine/core';
import RenderModulesAndLessons from './ViewCourseModuleAndLessons';

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
    <div className="flex w-full max-w-none flex-col gap-4">
      <h2 className="mx-auto mt-4 max-w-2xl px-2 text-center">
        {data?.title}
      </h2>
      {!!data.coverImage && (
        <div className="mx-auto mb-4 aspect-video w-full lg:max-w-2xl">
          <img
            src={data.coverImage}
            className="h-auto w-full object-cover"
            alt="Cover"
          />
        </div>
      )}
      <div className="flex w-full flex-col items-center px-2">
        <div className="flex max-w-2xl flex-col">
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

          <h3 className="mb-2 mt-4">Course content</h3>
          <div className="gap1 mb-2 flex text-gray-700">
            44 sections • 373 lectures • 61h 44m total
            length
          </div>
          <Accordion
            chevronPosition="right"
            variant="contained"
          >
            <RenderModulesAndLessons
              content={data.content}
            />
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ViewCourseOne;
