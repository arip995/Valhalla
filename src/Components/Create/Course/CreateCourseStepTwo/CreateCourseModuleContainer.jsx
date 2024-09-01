import {
  DragDropContext,
  Draggable,
  Droppable,
} from '@hello-pangea/dnd';
import { Accordion, ActionIcon } from '@mantine/core';
import {
  IconDotsVertical,
  IconGripVertical,
} from '@tabler/icons-react';
import CreateCourseLessonContainer from './CreateCourseLessonContainer';
import classNames from 'classnames';

const CreateCourseModuleContainer = ({
  module,
  moduleIndex,
  onDragLesson,
  onEditLesson,
  onAddLesson,
  provided,
}) => {
  return (
    <Accordion.Item
      key={module.title}
      value={module.title}
      className="flex flex-col gap-2 rounded-lg border border-solid border-neutral-200 bg-white p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <Accordion.Control className="w-12"></Accordion.Control>
          <div className="text-truncate flex items-center gap-2 text-sm font-semibold">
            <div
              {...(provided?.dragHandleProps || {})}
              className="cursor-grab"
            >
              <IconGripVertical color="rgba(199, 199, 199, 1)" />
            </div>
            {module.title}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={classNames(
              'min-h-max min-w-max rounded bg-[#f2f2f2] px-2 py-1 text-xs font-semibold',
              {
                'min-w-max bg-[#ebfbf3] text-[#24975d]':
                  module.status === 1,
              }
            )}
          >
            {module.status === 1 ? 'Published' : 'Draft'}
          </div>
          <ActionIcon
            size="lg"
            variant="subtle"
            color="rgba(199, 199, 199, 1)"
          >
            <IconDotsVertical size="1rem" />
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
        <div
          className="mt-4 w-fit cursor-pointer text-sm font-medium text-[#8c00ff]"
          onClick={() => {
            onAddLesson(moduleIndex);
          }}
        >
          + Add Lesson
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default CreateCourseModuleContainer;
