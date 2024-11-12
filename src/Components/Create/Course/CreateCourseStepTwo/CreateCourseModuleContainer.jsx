import {
  DragDropContext,
  Draggable,
  Droppable,
} from '@hello-pangea/dnd';
import {
  Accordion,
  ActionIcon,
  Badge,
  Button,
  Menu,
  rem,
  Text,
} from '@mantine/core';
import {
  IconDotsVertical,
  IconEdit,
  IconGripVertical,
  IconPlaystationCircle,
  IconTrash,
} from '@tabler/icons-react';
import CreateCourseLessonContainer from './CreateCourseLessonContainer';
import React from 'react';
import { modals } from '@mantine/modals';
import toast from 'react-hot-toast';

const CreateCourseModuleContainer = ({
  module,
  moduleIndex,
  moduleLength,
  dragHandleProps,
  onDragLesson = () => {},
  onAddOrEditLesson = () => {},
  onUpdate = () => {},
  onEditModuleTitle = () => {},
}) => {
  const onDelete = () => {
    if (moduleLength === 1) {
      toast.error('Need atleast 1 module');
      return;
    }
    modals.openConfirmModal({
      title: 'Delete',
      children: (
        <div className="pb-4 pt-8">
          <Text size="md" fw={500}>
            Are you sure you want to delete this module?
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
        });
      },
    });
  };

  const onEdit = () => {
    onEditModuleTitle(module.title, module.id);
  };

  return (
    <Accordion.Item
      key={module.title}
      value={module.title}
      className="flex flex-col gap-2 rounded-lg border border-solid border-neutral-200 bg-white p-2 md:p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <Accordion.Control className="!w-12"></Accordion.Control>
          <div className="text-truncate flex items-center gap-2 text-sm font-semibold">
            {moduleLength ? (
              <div
                {...(dragHandleProps || {})}
                className="cursor-grab"
              >
                <IconGripVertical color="rgba(199, 199, 199, 1)" />
              </div>
            ) : null}

            {module.title}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="light"
            color={module.status === 1 ? 'green' : 'gray'}
            radius="sm"
            className="min-w-max"
          >
            {module.status === 1 ? 'Published' : 'Draft'}
          </Badge>
          <Menu width={150} position="bottom-end">
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
                onClick={onEdit}
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
                  onUpdate({ moduleIndex });
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
                {module.status === 1
                  ? 'Save as Draft'
                  : 'Publish'}
              </Menu.Item>
              <Menu.Item
                onClick={onDelete}
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
        </div>
      </div>
      <Accordion.Panel className="flex flex-col gap-4">
        <div className="flex flex-col">
          <DragDropContext
            onDragEnd={result =>
              onDragLesson(result, moduleIndex)
            }
          >
            <Droppable droppableId="droppable-id">
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {module.lessons?.length > 0 && (
                    <>
                      {module.lessons?.map(
                        (lesson, index) => {
                          if (
                            !lesson ||
                            lesson.status === 3
                          )
                            return null;
                          return (
                            <Draggable
                              key={lesson.id}
                              draggableId={lesson.id}
                              index={index}
                            >
                              {provided => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                >
                                  <CreateCourseLessonContainer
                                    lessonLength={
                                      module.lessons.length
                                    }
                                    dragHandleProps={
                                      provided?.dragHandleProps
                                    }
                                    lesson={lesson}
                                    index={index}
                                    onUpdate={onUpdate}
                                    moduleIndex={
                                      moduleIndex
                                    }
                                    lessonIndex={index}
                                    onAddOrEditLesson={
                                      onAddOrEditLesson
                                    }
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                        }
                      )}
                    </>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <Button
          variant="default"
          className="mt-4 w-fit cursor-pointer font-medium"
          onClick={() => {
            onAddOrEditLesson(moduleIndex);
          }}
        >
          + Add Lesson
        </Button>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default React.memo(CreateCourseModuleContainer);
