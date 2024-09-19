'use client';

import { IconMapping } from '@/Constants/constants';
import { Accordion, Button } from '@mantine/core';

const RenderLesson = ({ lesson, index }) => {
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
          <Button size="xs" variant="transparent">
            Preview
          </Button>
        ) : null}
        {lesson.duration} min
      </div>
    </div>
  );
};

const RenderModulesAndLessons = ({ content }) => {
  return (
    <>
      {content.map((module, index) => (
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
                    37 lectures • 61h
                  </div>
                </div>
              </Accordion.Control>
              <Accordion.Panel>
                {module.lessons.map((lesson, index) => (
                  <RenderLesson
                    lesson={lesson}
                    index={index}
                    key={index}
                  />
                ))}
              </Accordion.Panel>
            </Accordion.Item>
          )}
        </>
      ))}
    </>
  );
};

export default RenderModulesAndLessons;
