import {
  ActionIcon,
  Badge,
  Menu,
  rem,
  Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconGripVertical,
  IconPlaystationCircle,
  IconTrash,
} from '@tabler/icons-react';
// import toast from 'react-hot-toast';

const CreateCourseLessonContainer = ({
  dragHandleProps,
  lesson,
  lessonIndex,
  moduleIndex,
  onAddOrEditLesson,
  onUpdate,
  lessonLength,
}) => {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-solid border-b-neutral-200 bg-white py-4">
      <div className="flex w-full items-center gap-2">
        {lessonLength ? (
          <div
            {...(dragHandleProps || {})}
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
        ) : null}
        <div className="flex items-center gap-2 text-sm font-medium">
          {lesson.title}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge
          variant="light"
          color={
            lesson.status === 2
              ? 'violet'
              : lesson.status === 1
                ? 'green'
                : 'gray'
          }
          radius="sm"
          className="min-w-max"
        >
          {lesson.status === 2
            ? 'Previewable'
            : lesson.status === 1
              ? 'Published'
              : 'Draft'}
        </Badge>
        <Menu position="bottom-end">
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              color="rgba(199, 199, 199, 1)"
              size="sm"
            >
              <IconDotsVertical
                style={{ width: '70%', height: '70%' }}
              />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                onAddOrEditLesson(moduleIndex, lessonIndex);
              }}
              leftSection={
                <IconEdit
                  style={{
                    width: rem(14),
                    height: rem(14),
                  }}
                />
              }
            >
              Edit
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                onUpdate({
                  type: 'preview',
                  moduleIndex,
                  lessonIndex,
                  isModule: false,
                });
              }}
              leftSection={
                <IconEye
                  style={{
                    width: rem(14),
                    height: rem(14),
                  }}
                />
              }
            >
              {lesson.status === 2
                ? 'Disable Preview'
                : 'Enable Preview'}
            </Menu.Item>
            {/* {lesson.status === 2 ? null : ( */}
            <Menu.Item
              onClick={() => {
                onUpdate({
                  moduleIndex,
                  lessonIndex,
                  isModule: false,
                });
              }}
              leftSection={
                <IconPlaystationCircle
                  style={{
                    width: rem(14),
                    height: rem(14),
                  }}
                />
              }
            >
              {lesson.status === 1 || lesson.status === 2
                ? 'Save as Draft'
                : 'Publish'}
            </Menu.Item>
            {/* )} */}
            <Menu.Item
              onClick={() => {
                // if (lessonLength === 1) {
                //   toast.error(
                //     'Need atleast 1 lesson per module'
                //   );
                //   return;
                // }
                modals.openConfirmModal({
                  title: 'Delete',
                  children: (
                    <div className="pb-4 pt-8">
                      <Text size="md" fw={500}>
                        Are you sure you want to delete this
                        lesson?
                      </Text>
                    </div>
                  ),
                  labels: {
                    confirm: 'Yes, Delete',
                    cancel: 'Cancel',
                  },
                  confirmProps: { color: 'red' },
                  onCancel: () => {},
                  onConfirm: () => {
                    onUpdate({
                      type: 'delete',
                      moduleIndex,
                      lessonIndex,
                      isModule: false,
                    });
                  },
                });
              }}
              color="red"
              leftSection={
                <IconTrash
                  style={{
                    width: rem(14),
                    height: rem(14),
                  }}
                />
              }
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        {/* <ActionIcon
          variant="subtle"
          color="rgba(199, 199, 199, 1)"
          onClick={() => onAddOrEditLesson(moduleIndex, index)}
          size="sm"
        >
          <IconDotsVertical
            style={{ width: '70%', height: '70%' }}
          />
        </ActionIcon> */}
      </div>
    </div>
  );
};

export default CreateCourseLessonContainer;
