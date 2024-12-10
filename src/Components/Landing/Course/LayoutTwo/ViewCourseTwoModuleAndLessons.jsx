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
      className="group relative flex items-center justify-between rounded-lg p-3 transition-all hover:bg-gray-50"
      key={index}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">
            {lesson.title}
          </h4>
          <p className="text-sm text-gray-500">
            {convertMinutesToHours(lesson.duration || 0, 3)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {lesson.status === 2 ? (
          <Button
            onClick={() => onPreviewClick(lesson)}
            color="black"
            variant="light"
            // className="opacity-0 transition-opacity group-hover:opacity-100"
            leftIcon={<IconPlayerPlay size={16} />}
            size="sm"
          >
            Preview
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <IconLock size={16} />
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
            className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <Accordion.Control>
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-4">
                  {/* <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <IconBook className="h-6 w-6" />
                  </div> */}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {module.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <IconPlayerPlay size={16} />
                        <span>
                          {data?.lessons} lectures
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconClock size={16} />
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
              </div>
            </Accordion.Control>

            <Accordion.Panel className="bg-gray-50/50">
              <div className="divide-y divide-gray-100">
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
            <h3 className="text-xl font-bold text-gray-900">
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
        }}
        classNames={{
          modal: 'rounded-xl',
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
