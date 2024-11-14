'use client';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import { SavedLessonContent } from '@/Components/Create/Course/CreateCourseStepTwo/CreateCourseAddEditLesson';
import { getMetaData } from '@/Utils/getMetaData';
import {
  Checkbox,
  Popover,
  RingProgress,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconArrowRight,
  IconTriangleInverted,
} from '@tabler/icons-react';
import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CourseContentList from './CourseContentList';

const CourseConsume = ({ productId }) => {
  const searchParams = useSearchParams();
  const moduleId = searchParams.get('moduleId');
  const lessonId = searchParams.get('lessonId');
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState(false);
  const [activeLesson, setActiveLesson] = useState(false);
  const [activeModule, setActiveModule] = useState(false);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const { data } = await getMetaData(
        productId,
        'course'
      );
      setCourseData(data);
      setActiveLesson(data.content[0].lessons[0]);
      setActiveModule(data.content[0]);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Check your internet connection'
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeActiveLeson = (lesson, module, action) => {
    // Handle "next" action
    if (action === 'next') {
      const currentLessonIndex =
        activeModule.lessons.findIndex(
          l => l._id === activeLesson._id
        );

      // Check if it's the last lesson in the current module
      if (
        currentLessonIndex ===
        activeModule.lessons.length - 1
      ) {
        // Move to the next module, if available
        const currentModuleIndex =
          courseData.content.findIndex(
            m => m._id === activeModule._id
          );

        if (
          currentModuleIndex <
          courseData.content.length - 1
        ) {
          const nextModule =
            courseData.content[currentModuleIndex + 1];
          setActiveModule(nextModule);
          setActiveLesson(nextModule.lessons[0]);
        }
      } else {
        // Move to the next lesson within the same module
        setActiveLesson(
          activeModule.lessons[currentLessonIndex + 1]
        );
      }
      return;
    }

    // Handle "previous" action
    else if (action === 'previous') {
      const currentLessonIndex =
        activeModule.lessons.findIndex(
          l => l._id === activeLesson._id
        );

      // Check if it's the first lesson in the current module
      if (currentLessonIndex === 0) {
        // Move to the previous module, if available
        const currentModuleIndex =
          courseData.content.findIndex(
            m => m._id === activeModule._id
          );

        if (currentModuleIndex > 0) {
          const previousModule =
            courseData.content[currentModuleIndex - 1];
          setActiveModule(previousModule);
          setActiveLesson(
            previousModule.lessons[
              previousModule.lessons.length - 1
            ]
          );
        }
      } else {
        // Move to the previous lesson within the same module
        setActiveLesson(
          activeModule.lessons[currentLessonIndex - 1]
        );
      }
      return;
    }

    // Set the lesson and module when neither "next" nor "previous" is specified
    setActiveLesson(lesson);
    setActiveModule(module);
  };

  const checkActionButtonDisabled = isNext => {
    const data = courseData?.content;
    const lastModule = data?.[data?.length - 1];
    if (!data) return;

    if (isNext) {
      return (
        activeLesson._id ===
        lastModule?.lessons?.[lastModule.lessons.length - 1]
          ?._id
      );
    } else {
      return (
        activeLesson._id === data[0]?.lessons?.[0]?._id
      );
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  if (loading) {
    return <LayoutLoading />;
  }

  if (!productId || !moduleId || !lessonId) return null;

  return (
    <div className="flex w-full justify-center">
      <div className="m-4 flex h-full w-full max-w-7xl justify-center gap-4">
        <div className="hide-scrollbar hidden max-h-screen w-1/4 overflow-y-auto lg:block">
          <div className="flex gap-2">
            <img
              src={courseData?.coverImage?.url}
              alt=""
              className="overflow-hidden rounded-md"
              height={100}
              width={100}
            />
            <div className="font-semibold text-gray-900">
              {courseData?.title}
              <div className="flex">
                <RingProgress
                  size={25}
                  thickness={3}
                  roundCaps
                  sections={[{ value: 40, color: 'gray' }]}
                />
                <span>1/79 completed</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <CourseContentList
              content={courseData?.content}
              activeLesson={activeLesson}
              onChange={onChangeActiveLeson}
            />
          </div>
        </div>
        <div
          className={classNames(
            'hide-scrollbar h-full w-full overflow-y-auto lg:w-3/4'
          )}
        >
          <div className="mb-3 hidden text-wrap text-xl font-semibold lg:block">
            {activeLesson?.title}
          </div>
          <Popover
            position="bottom"
            width={300}
            withArrow
            shadow="md"
            classNames="lg:hidden block"
          >
            <Popover.Target>
              <div className="mb-3 flex cursor-pointer items-center gap-2 text-wrap text-xl font-semibold lg:hidden">
                {activeLesson?.title}{' '}
                <IconTriangleInverted size={15} />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <CourseContentList
                content={courseData?.content}
                activeLesson={activeLesson}
                onChange={onChangeActiveLeson}
              />
            </Popover.Dropdown>
          </Popover>

          <SavedLessonContent value={activeLesson} />
          <div className="mt-4 flex gap-6">
            <Checkbox
              className="w-fit rounded-md border border-gray-300 p-2 hover:bg-gray-50"
              color="black"
              size="md"
              label={
                <div className="font-semibold">
                  Complete
                </div>
              }
            />
            <div className="flex h-full gap-2">
              <IconArrowLeft
                className={classNames(
                  'h-full w-fit cursor-pointer rounded-md border border-gray-300 p-2 hover:bg-gray-50',
                  {
                    'opacity-30 hover:cursor-default hover:bg-white':
                      checkActionButtonDisabled(false),
                  }
                )}
                onClick={() => {
                  if (checkActionButtonDisabled(false))
                    return;
                  onChangeActiveLeson(
                    null,
                    null,
                    'previous'
                  );
                }}
              />
              <IconArrowRight
                className={classNames(
                  'h-full w-fit cursor-pointer rounded-md border border-gray-300 p-2 hover:bg-gray-50',
                  {
                    'opacity-30 hover:cursor-default hover:bg-white':
                      checkActionButtonDisabled(true),
                  }
                )}
                onClick={() => {
                  if (checkActionButtonDisabled(true))
                    return;
                  onChangeActiveLeson(null, null, 'next');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseConsume;
