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
      className="cmal-container-module-container"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <Accordion.Control className="w-12"></Accordion.Control>
          <div className="cmal-module-title text-truncate flex items-center gap-2">
            <div
              {...(provided?.dragHandleProps || {})}
              className="cursor-grab"
            >
              <IconGripVertical color="rgba(199, 199, 199, 1)" />
            </div>
            {module.title}
          </div>
        </div>
        <ActionIcon
          size="lg"
          variant="subtle"
          color="rgba(199, 199, 199, 1)"
        >
          <IconDotsVertical size="1rem" />
        </ActionIcon>
      </div>
      <Accordion.Panel className="flex flex-col gap-4">
        <div className="caml-lesson-container">
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
          className="caml-add-lesson"
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
