'use client';

import { IconMapping } from '@/Constants/constants';
import {
  calculateModuleHighlights,
  convertMinutesToHours,
} from '@/Utils/Common';
import { Accordion, Button, Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import ViewCourseOnePreviewLessons from './ViewCourseOnePreviewLesson';

const RenderLesson = ({
  lesson,
  index,
  onPreviewClick,
}) => {
  const Icon = IconMapping[lesson.lessonType];

  return (
    <div
      className={`${index === 0 ? '' : 'mt-2'} flex w-full items-center justify-between gap-4 text-sm`}
      key={index}
    >
      <div className="font-se flex items-center gap-2">
        <Icon
          className="h-4 w-4 min-w-fit"
          color="rgba(199, 199, 199, 1)"
        />
        {lesson.title}
      </div>
      <div className="flex items-center gap-2 text-xs">
        {lesson.status === 2 ? (
          <Button
            size="xs"
            variant="transparent"
            onClick={() => onPreviewClick(lesson)}
          >
            Preview
          </Button>
        ) : null}
        {convertMinutesToHours(lesson.duration || 0, 3)}
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
    let list = [];
    content.map(module => {
      if (!module?.lessons?.length) return;
      module.lessons?.map(lesson => {
        if (!lesson) return;
        if (lesson.status === 2) {
          list.push(lesson);
        }
      });
    });
    setPreviewList(prev => [...prev, ...list]);
  }, []);

  return (
    <>
      {content.map((module, index) => {
        const data = calculateModuleHighlights(module);
        return (
          <>
            {!!module.lessons.length && (
              <Accordion.Item
                key={index}
                value={module._id || module.id}
              >
                <Accordion.Control>
                  <div className="text-md flex w-full items-center justify-between gap-4 font-semibold">
                    {module.title}
                    <div className="text-xs font-thin text-gray-700">
                      {data?.lessons} lectures •{' '}
                      {convertMinutesToHours(
                        data?.totalDuration,
                        2
                      )}
                    </div>
                  </div>
                </Accordion.Control>
                <Accordion.Panel>
                  {module.lessons.map((lesson, index) => (
                    <RenderLesson
                      lesson={lesson}
                      index={index}
                      key={index}
                      onPreviewClick={onPreviewClick}
                    />
                  ))}
                </Accordion.Panel>
              </Accordion.Item>
            )}
          </>
        );
      })}
      <Modal
        opened={opened}
        title={
          <div className="my-2 text-wrap text-lg font-bold text-gray-900">
            {currentPreview?.title}
          </div>
        }
        lockScroll={false}
        closeOnEscape={false}
        trapFocus={false}
        size="xl"
        styles={{
          body: {
            padding: 0,
          },
        }}
        onClose={() => {
          setOpened(false);
          setCurrentPreview(null);
        }}
      >
        <ViewCourseOnePreviewLessons
          activeLesson={currentPreview}
          setActiveLesson={setCurrentPreview}
          previewList={previewList}
        />
      </Modal>
    </>
  );
};

export default RenderModulesAndLessons;
