import { ActionIcon, rem } from '@mantine/core';
import {
  IconChevronRight,
  IconGripVertical,
} from '@tabler/icons-react';
import classNames from 'classnames';

const CreateCourseLessonContainer = ({
  lesson,
  index,
  moduleIndex,
  onEditLesson,
  provided,
}) => {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-solid border-b-neutral-200 bg-white px-2 py-4">
      <div className="flex w-full items-center gap-2">
        <div
          {...(provided?.dragHandleProps || {})}
          className="cursor-grab"
        >
          <IconGripVertical
            color="rgba(199, 199, 199, 1)"
            style={{
              width: rem(16),
              height: rem(16),
            }}
          />
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <div className="cmal-lesson-title-left text-truncate">
            {lesson.title}
          </div>
          <div className="cmal-lesson-title-left-preview-type">
            {lesson.freePreview ? '(Free Preview)' : null}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={classNames(
            'h-max min-w-max rounded bg-[#f2f2f2] px-2 py-1 text-xs font-semibold',
            {
              'min-w-max bg-[#ebfbf3] text-[#24975d]':
                lesson.status === 1,
            }
          )}
        >
          {lesson.status === 1 ? 'Published' : 'Draft'}
        </div>
        <ActionIcon
          variant="subtle"
          color="rgba(199, 199, 199, 1)"
          onClick={() => onEditLesson(moduleIndex, index)}
        >
          <IconChevronRight
            color="rgba(199, 199, 199, 1)"
            style={{
              width: rem(16),
              height: rem(16),
            }}
          />
        </ActionIcon>
      </div>
    </div>
  );
};

export default CreateCourseLessonContainer;
