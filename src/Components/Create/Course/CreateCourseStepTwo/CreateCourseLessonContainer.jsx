import { ActionIcon, Badge, rem } from '@mantine/core';
import {
  IconDotsVertical,
  IconGripVertical,
} from '@tabler/icons-react';

const CreateCourseLessonContainer = ({
  lesson,
  index,
  showDrag,
  moduleIndex,
  onEditLesson,
  provided,
}) => {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-solid border-b-neutral-200 bg-white px-2 py-4">
      <div className="flex w-full items-center gap-2">
        {!!showDrag && (
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
        )}
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
        <Badge
          variant="light"
          color={lesson.status === 1 ? 'green' : 'gray'}
          radius="sm"
          className="min-w-max"
        >
          {lesson.status === 1 ? 'Published' : 'Draft'}
        </Badge>
        <ActionIcon
          variant="subtle"
          color="rgba(199, 199, 199, 1)"
          onClick={() => onEditLesson(moduleIndex, index)}
          size="sm"
        >
          <IconDotsVertical
            style={{ width: '70%', height: '70%' }}
          />
        </ActionIcon>
      </div>
    </div>
  );
};

export default CreateCourseLessonContainer;
