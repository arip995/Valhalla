'use client';
import { IconMapping } from '@/Constants/constants';
import {
  calculateModuleHighlights,
  convertMinutesToHours,
} from '@/Utils/Common';
import { Accordion, Button, Modal } from '@mantine/core';
import {
  IconClock,
  IconLock,
  IconPlayerPlay,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import ViewCourseTwoPreviewLessons from './ViewCourseTwoPreviewLesson';

const RenderLesson = ({
  lesson,
  index,
  onPreviewClick,
}) => {
  const Icon = IconMapping[lesson.lessonType];

  return (
    <div
      className="group relative flex flex-col items-start justify-between gap-4 rounded-lg p-4 transition-all hover:bg-gray-50 sm:flex-row sm:items-center sm:gap-2"
      key={index}
    >
      <div className="flex w-full items-start gap-4 sm:w-auto sm:items-center">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="break-words text-sm font-medium text-gray-700">
            {lesson.title}
          </h4>
          <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <IconClock
              size={14}
              className="flex-shrink-0"
            />
            {convertMinutesToHours(lesson.duration || 0, 3)}
          </p>
        </div>
      </div>

      <div className="w-full sm:w-auto">
        {lesson.status === 2 ? (
          <Button
            onClick={() => onPreviewClick(lesson)}
            color="black"
            variant="light"
            className="w-full transition-all hover:bg-gray-200 sm:w-auto"
            leftIcon={<IconPlayerPlay size={16} />}
            size="sm"
          >
            Preview
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-sm text-gray-400 sm:justify-start">
            <IconLock size={16} className="flex-shrink-0" />
            <span>Locked</span>
          </div>
        )}
      </div>
    </div>
  );
};

const RenderModulesAndLessons = ({ content }) => {
  const [opened, setOpened] = useState(false);
  const [previewList, setPreviewList] = useState([]);
  const [currentPreview, setCurrentPreview] = useState();

  const onPreviewClick = lesson => {
    setCurrentPreview(lesson);
    setOpened(true);
  };

  useEffect(() => {
    const list = content.reduce((acc, module) => {
      if (!module?.lessons?.length) return acc;
      const previewLessons = module.lessons.filter(
        lesson => lesson && lesson.status === 2
      );
      return [...acc, ...previewLessons];
    }, []);
    setPreviewList(list);
  }, [content]);

  return (
    <>
      {content.map(module => {
        if (module.status === 0 || module.status === 3)
          return null;
        const data = calculateModuleHighlights(module);
        if (!module.lessons.length) return null;

        return (
          <Accordion.Item
            key={module._id || module.id}
            value={module._id || module.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <Accordion.Control className="bg-gray-50">
              <div className="flex items-center justify-between p-4">
                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-lg font-semibold text-gray-900">
                    {module.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <IconPlayerPlay
                        size={18}
                        className="text-blue-600"
                      />
                      <span>{data?.lessons} lectures</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconClock
                        size={18}
                        className="text-blue-600"
                      />
                      <span>
                        {convertMinutesToHours(
                          data?.totalDuration,
                          2
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion.Control>

            <Accordion.Panel>
              <div className="divide-y divide-gray-200">
                {module.lessons.map((lesson, index) => {
                  if (
                    lesson.status === 0 ||
                    lesson.status === 3
                  )
                    return null;
                  return (
                    <RenderLesson
                      lesson={lesson}
                      index={index}
                      key={lesson._id || lesson.id}
                      onPreviewClick={onPreviewClick}
                    />
                  );
                })}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}

      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setCurrentPreview(null);
        }}
        title={
          <div className="space-y-1 p-2">
            <h3 className="break-words text-xl font-bold text-gray-900">
              {currentPreview?.title}
            </h3>
            <p className="text-sm text-gray-500">
              Preview Lesson
            </p>
          </div>
        }
        size="xl"
        lockScroll={false}
        closeOnEscape={false}
        trapFocus={false}
        styles={{
          body: {
            padding: 0,
          },
          header: {
            padding: '1rem',
            marginBottom: 0,
            borderBottom: '1px solid #e5e7eb',
          },
          inner: {
            padding: '16px',
          },
        }}
        classNames={{
          modal: 'rounded-xl max-w-4xl mx-auto w-full',
        }}
      >
        <ViewCourseTwoPreviewLessons
          activeLesson={currentPreview}
          setActiveLesson={setCurrentPreview}
          previewList={previewList}
        />
      </Modal>
    </>
  );
};

export default RenderModulesAndLessons;
