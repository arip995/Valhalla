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
} from '@mantine/core';
import {
  IconDotsVertical,
  IconGripVertical,
} from '@tabler/icons-react';
import CreateCourseLessonContainer from './CreateCourseLessonContainer';

const CreateCourseModuleContainer = ({
  module,
  moduleIndex,
  showDrag,
  onDragLesson,
  onEditLesson,
  onAddLesson,
  provided,
}) => {
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
            {showDrag ? (
              <div
                {...(provided?.dragHandleProps || {})}
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

          <ActionIcon
            variant="subtle"
            color="rgba(199, 199, 199, 1)"
            size="xs"
          >
            <IconDotsVertical />
          </ActionIcon>
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
                                    showDrag={
                                      module?.lessons
                                        ?.length > 1
                                    }
                                    provided={provided}
                                    lesson={lesson}
                                    index={index}
                                    moduleIndex={
                                      moduleIndex
                                    }
                                    onEditLesson={
                                      onEditLesson
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
          variant="transparent"
          size="sm"
          className="mt-4 w-fit cursor-pointer font-medium"
          onClick={() => {
            onAddLesson(moduleIndex);
          }}
        >
          + Add Lesson
        </Button>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default CreateCourseModuleContainer;
