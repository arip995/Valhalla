import { getUniqueId, onDrag } from '@/Utils/Common';
import useIsBrowser from '@/Utils/useIsBrowser';
import {
  DragDropContext,
  Draggable,
  Droppable,
} from '@hello-pangea/dnd';
import React, { useState } from 'react';
import CreateCourseModuleContainer from './CreateCourseModuleContainer';
import '../../../../styles/create/Course.css';
import CreateCourseAddEditLessonModal from './CreateCourseAddEditLessonModal';
import { Accordion } from '@mantine/core';

const CreateModulesAndLessons = () =>
  //     {
  //   productData,
  //   setProductData,
  //   errors,
  // }
  {
    const isBrowser = useIsBrowser();
    const [courseList, setCourseList] = useState([
      {
        id: getUniqueId(),
        title: 'Module 2: Introduction',
        dripTime: new Date(),
        status: 1,
        lessons: [
          {
            id: getUniqueId(),
            title: 'Lesson 1',
            description: '',
            supportMaterial: [],
            freePreview: false,
            status: 0,
            lessonType: 'textImage',
            lesson: {},
            textImage:
              '<p>This is the lesson of your course here.</p>',
            video: {},
            audio: {},
          },
        ],
      },
    ]);
    const [showAddEditLesson, setShowAddEditLesson] =
      useState(false);
    const [dataToEdit, setDataToEdit] = useState({});
    const [activeModuleIndex, setActiveModuleIndex] =
      useState(null);

    const onDragModule = result => {
      if (!result.destination) return;
      const assets = onDrag(result, courseList);
      if (!assets?.length) return;
      setCourseList(() => {
        return [...assets];
      });
    };

    const onDragLesson = (result, lessonIndex) => {
      if (!result.destination) return;
      let assets = [...courseList[lessonIndex].lessons];
      let [selectedRow] = assets.splice(
        result.source.index,
        1
      );
      assets.splice(
        result.destination.index,
        0,
        selectedRow
      );
      const newCourseList = courseList.map(
        (item, index) => {
          if (index === lessonIndex) {
            return { ...item, lessons: [...assets] };
          } else {
            return item;
          }
        }
      );
      setCourseList(() => {
        return newCourseList;
      });
    };

    const onEditLesson = (moduleIndex, lessonIndex) => {
      setActiveModuleIndex(moduleIndex);
      setDataToEdit(
        courseList[moduleIndex].lessons[lessonIndex]
      );
      setShowAddEditLesson(true);
    };

    const onDelete = data => {
      const newCourseList = [...courseList];
      const lessonId = data.id;
      newCourseList.forEach(module => {
        module.lessons = module.lessons.map(lesson => {
          if (lesson.id === lessonId) {
            return;
          }
          return lesson;
        });
      });
      newCourseList.forEach(module => {
        module.lessons = module.lessons.filter(
          lesson => lesson !== null && lesson !== undefined
        );
      });
      setShowAddEditLesson(false);

      setCourseList(() => [...newCourseList]);
    };

    const onUpdateCourseList = data => {
      console.log(data);
      const newCourseList = [...courseList];
      const lessonId = data.id;
      newCourseList.forEach(module => {
        module.lessons = module.lessons.map(lesson => {
          if (lesson.id === lessonId) {
            return data;
          }
          return lesson;
        });
      });
      console.log(newCourseList);
      setShowAddEditLesson(false);
      setCourseList(() => [...newCourseList]);
    };

    const onAddLesson = moduleIndex => {
      const newCourseList = [...courseList];
      newCourseList[moduleIndex]?.lessons.push({
        id: getUniqueId(),
        title: `Lesson ${newCourseList[moduleIndex]?.lessons.length + 1}`,
        description: '',
        supportMaterial: [],
        freePreview: false,
        status: 0,
        lessonType: 'textImage',
        lesson: {},
        textImage:
          '<p>This is the lesson of your course here.</p>',
        video: {},
        audio: {},
      });
      setCourseList(() => [...newCourseList]);
    };

    const onAddModule = () => {
      setCourseList(prev => {
        return [
          ...prev,
          {
            id: getUniqueId(),
            title: `Module ${courseList.length + 1}: Introduction`,
            status: 1,
            dripTime: new Date(),
            lessons: [
              {
                id: getUniqueId(),
                title: 'Lesson 1',
                description: '',
                supportMaterial: [],
                freePreview: false,
                status: 'draft',
                lessonType: 'textImage',
                lesson: {},
                textImage:
                  '<p>This is the lesson of your course here.</p>',
                video: {},
                audio: {},
              },
            ],
          },
        ];
      });
    };

    if (!courseList || !isBrowser) return null;

    return (
      <div className="cmal-container">
        <div className="flex w-full flex-col">
          <div className="mb-4 text-sm font-semibold">
            Add lessons of your course
          </div>
          <DragDropContext
            onDragEnd={result => onDragModule(result)}
          >
            <Droppable droppableId="droppable-id">
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex w-full flex-col"
                >
                  {courseList.length > 0 && (
                    <>
                      {courseList.map((module, index) => {
                        return (
                          <Accordion
                            key={module.id}
                            variant="default"
                            chevronPosition="left"
                            defaultValue="Apples"
                          >
                            <Draggable
                              key={module.id}
                              draggableId={module.id}
                              index={index}
                            >
                              {provided => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className="mb-4"
                                >
                                  <CreateCourseModuleContainer
                                    showDrag={
                                      courseList?.length > 1
                                    }
                                    module={module}
                                    moduleIndex={index}
                                    onDragLesson={
                                      onDragLesson
                                    }
                                    onEditLesson={
                                      onEditLesson
                                    }
                                    onAddLesson={
                                      onAddLesson
                                    }
                                    provided={provided}
                                  />
                                </div>
                              )}
                            </Draggable>
                          </Accordion>
                        );
                      })}
                    </>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div
            className="flex cursor-pointer items-center justify-center rounded-lg border border-solid border-neutral-200 p-2.5 text-sm font-medium"
            onClick={onAddModule}
          >
            + New Module
          </div>
        </div>
        <CreateCourseAddEditLessonModal
          canDelete={
            courseList[activeModuleIndex]?.lessons?.length >
            1
          }
          show={showAddEditLesson}
          setShow={setShowAddEditLesson}
          dataToEdit={dataToEdit}
          onDelete={onDelete}
          onUpdate={onUpdateCourseList}
        />
      </div>
    );
  };

export default CreateModulesAndLessons;
