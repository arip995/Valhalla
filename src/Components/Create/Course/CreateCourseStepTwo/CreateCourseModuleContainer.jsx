import classNames from 'classnames';
import React from 'react';
import {
  IconDotsVertical,
  IconGripVertical,
} from '@tabler/icons-react';
import { ActionIcon, rem } from '@mantine/core';
import {
  DragDropContext,
  Draggable,
  Droppable,
} from '@hello-pangea/dnd';
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
    <div className="cmal-container-module-container">
      <div className="cmal-module-header-container">
        <div className="cmal-lesson-title-left-container">
          <div
            {...(provided?.dragHandleProps || {})}
            className="cursor-grab"
          >
            <IconGripVertical color="rgba(199, 199, 199, 1)" />
          </div>
          <div className="cmal-module-title text-truncate">
            {module.title}
          </div>
        </div>
        <div className="cmal-module-title-right-container">
          <div
            className={classNames(
              'caml-preview-type-button-draft',
              {
                'caml-preview-type-button-published':
                  module.status === 1,
              }
            )}
          >
            {module.status === 1 ? 'Published' : 'Draft'}
          </div>
          <ActionIcon
            variant="subtle"
            color="rgba(199, 199, 199, 1)"
          >
            <IconDotsVertical
              color="rgba(199, 199, 199, 1)"
              style={{
                width: rem(20),
                height: rem(20),
              }}
            />
          </ActionIcon>
        </div>
      </div>
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
                                  moduleIndex={moduleIndex}
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
    </div>
  );
};

export default CreateCourseModuleContainer;
