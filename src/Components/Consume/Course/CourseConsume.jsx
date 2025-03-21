'use client';
import ProductHeader from '@/Components/Common/Header/Productheader';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import { SavedLessonContent } from '@/Components/Create/Course/CreateCourseStepTwo/CreateCourseAddEditLesson';
import axiosInstance from '@/Utils/AxiosInstance';
import useUser from '@/Utils/Hooks/useUser';
import {
  Checkbox,
  Popover,
  RingProgress,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconTriangleInverted,
} from '@tabler/icons-react';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import CourseContentList from './CourseContentList';
import ListFiles from '@/Components/Common/ListFiles/ListFiles';
import { checkIfPurchased } from '@/Utils/Common';
import { getUserData } from '@/Utils/getuserData';
import { getClientSideProductData } from '@/Utils/getMetaData';

const CourseConsume = ({ productId }) => {
  // const searchParams = useSearchParams();
  // const moduleId = searchParams.get('moduleId');
  // const lessonId = searchParams.get('lessonId');
  const router = useRouter();
  const { user } = useUser();
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState(false);
  const [completedList, setCompletedList] = useState([]);
  const [activeLesson, setActiveLesson] = useState(false);
  const [activeModule, setActiveModule] = useState(false);
  const isCompleted = useMemo(
    () =>
      completedList.some(
        item => item === activeLesson?._id
      ),
    [completedList, activeLesson?._id]
  );
  const totalLessons = useMemo(() => {
    return courseData?.content?.reduce((total, module) => {
      return total + (module?.lessons?.length || 0);
    }, 0);
  }, [courseData]);

  const redirectToBuyPage = () => {
    const host = process.env.NEXT_PUBLIC_HOST;
    const url = `${host}/course/${productId}`;
    router.push(url);
  };

  const fetchProductData = async () => {
    try {
      setLoading(true);
      if (!getUserData()?._id) {
        redirectToBuyPage();
      }
      const hasPurchased = await checkIfPurchased(
        productId,
        getUserData()?._id
      );
      if (!hasPurchased) {
        redirectToBuyPage();
      }
      const { data } = await getClientSideProductData(
        productId,
        'course'
      );

      const { data: completedData } =
        await axiosInstance.post('/course/completed', {
          productId,
          userId: user._id,
        });
      setCompletedList(prev => {
        return [
          ...prev,
          ...(completedData?.data?.contentCompleted || []),
        ];
      });
      setCourseData(data);
      setActiveLesson(data.content[0].lessons[0]);
      setActiveModule(data.content[0]);
    } catch (error) {
      // toast.error(error?.response?.data?.message || '');
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

  const updatedCompletedCourse = async () => {
    try {
      const { data } = await axiosInstance.post(
        '/course/update/purchased',
        {
          productId,
          userId: user._id,
          lessonId: activeLesson?._id,
          isCompleted,
        }
      );

      if (data?.ok) {
        toast.success(data?.message || '');
        setCompletedList(() => {
          return [...(data?.data?.contentCompleted || [])];
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || '');
    }
  };

  const BasicDetails = () => {
    if (!courseData) return null;
    return (
      <div className="object flex min-w-fit gap-2">
        <img
          src={courseData?.coverImage?.url}
          alt=""
          className="aspect-video rounded-md"
          style={{
            maxHeight: '100px',
            maxWidth: '100px',
          }}
        />
        <div className="border-b-2 pb-2 font-semibold text-gray-900">
          {courseData?.title}
          <div className="flex">
            {completedList?.length == totalLessons ? (
              <IconCheck color="green" />
            ) : (
              <RingProgress
                size={25}
                thickness={3}
                roundCaps
                sections={[
                  {
                    value: completedList?.length
                      ? (completedList?.length /
                          totalLessons) *
                        100
                      : 0,
                    color:
                      completedList?.length == totalLessons
                        ? 'green'
                        : 'gray',
                  },
                ]}
              />
            )}
            <span className="font-normal text-gray-600">
              {completedList?.length || 0}/{totalLessons}{' '}
              completed
            </span>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchProductData();
  }, [user?._id]);

  if (loading) {
    return <LayoutLoading />;
  }
  if (!productId || !user?._id || !courseData) return null;

  return (
    <>
      <ProductHeader data={courseData} />
      <div className="flex w-full justify-center">
        <div className="m-2 flex h-full w-full max-w-7xl justify-center gap-4 lg:m-4">
          <div className="hide-scrollbar hidden max-h-screen w-1/4 overflow-y-auto lg:block">
            <BasicDetails />
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
              opened={opened}
              onChange={setOpened}
              position="bottom"
              width={300}
              withArrow
              shadow="md"
              classNames="lg:hidden block"
            >
              <Popover.Target>
                <div
                  className="mb-3 flex cursor-pointer items-center gap-2 text-wrap text-xl font-semibold lg:hidden"
                  onClick={() => setOpened(o => !o)}
                >
                  {activeLesson?.title}{' '}
                  <IconTriangleInverted size={15} />
                </div>
              </Popover.Target>
              <Popover.Dropdown
                onClick={() => setOpened(o => !o)}
              >
                <BasicDetails />
                <CourseContentList
                  content={courseData?.content}
                  activeLesson={activeLesson}
                  onChange={onChangeActiveLeson}
                />
              </Popover.Dropdown>
            </Popover>

            <SavedLessonContent value={activeLesson} />
            {!!activeLesson.description && (
              <>
                <div className="my-2 text-lg font-bold">
                  Notes
                </div>
                <div className="my-2">
                  {activeLesson.description}
                </div>
              </>
            )}
            {!!activeLesson.supportMaterial?.length && (
              <>
                <div className="my-2 text-lg font-bold">
                  Resources
                </div>
                <ListFiles
                  files={activeLesson.supportMaterial}
                  showDownloadButton={true}
                />
              </>
            )}
            <div className="mt-4 flex gap-6">
              <Checkbox
                className="w-fit rounded-md border border-gray-300 p-2 hover:bg-gray-50"
                color="black"
                size="md"
                checked={isCompleted}
                onChange={() => updatedCompletedCourse()}
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
    </>
  );
};

export default CourseConsume;
