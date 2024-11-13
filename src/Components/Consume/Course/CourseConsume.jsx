'use client';
import { getMetaData } from '@/Utils/getMetaData';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CourseContentList from './CourseContentList';
import { SavedLessonContent } from '@/Components/Create/Course/CreateCourseStepTwo/CreateCourseAddEditLesson';
import classNames from 'classnames';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import { Checkbox, RingProgress } from '@mantine/core';

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

  const onChangeActiveLeson = (lesson, module) => {
    setActiveLesson(lesson);
    setActiveModule(module);
    console.log(activeModule);
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
        <div className="hide-scrollbar max-h-screen w-1/4 overflow-y-auto">
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
          <CourseContentList
            content={courseData?.content}
            activeLesson={activeLesson}
            onChange={onChangeActiveLeson}
          />
        </div>
        <div
          className={classNames(
            'hide-scrollbar h-full w-3/4 overflow-y-auto'
          )}
        >
          <div className="mb-3 text-wrap text-xl font-semibold">
            {activeLesson?.title}
          </div>
          <SavedLessonContent value={activeLesson} />
          <Checkbox
            className="mt-2 w-fit rounded-md border border-gray-300 p-2 hover:bg-gray-50"
            color="black"
            size="md"
            label={
              <div className="font-semibold">Complete</div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CourseConsume;
