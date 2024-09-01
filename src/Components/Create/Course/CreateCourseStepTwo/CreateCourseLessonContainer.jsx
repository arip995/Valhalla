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
    <div className="caml-lesson-header-container">
      <div className="cmal-lesson-title-left-container">
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
        <div className="cmal-lesson-title-left-wrapper">
          <div className="cmal-lesson-title-left text-truncate">
            {lesson.title}
          </div>
          <div className="cmal-lesson-title-left-preview-type">
            {lesson.freePreview ? '(Free Preview)' : null}
          </div>
        </div>
      </div>
      <div className="cmal-lesson-title-right-container">
        <div
          className={classNames(
            'caml-preview-type-button-draft',
            {
              'caml-preview-type-button-published':
                lesson.status === 'published',
            }
          )}
        >
          {lesson.status === 'published'
            ? 'Published'
            : 'Draft'}
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
