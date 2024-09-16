import { getUniqueId, onDrag } from '@/Utils/Common';
import useIsBrowser from '@/Utils/useIsBrowser';
import {
  DragDropContext,
  Draggable,
  Droppable,
} from '@hello-pangea/dnd';
import {
  Accordion,
  Button,
  Modal,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import '../../../../styles/create/Course.css';
import CreateCourseAddEditLessonModal from './CreateCourseAddEditLessonModal';
import CreateCourseModuleContainer from './CreateCourseModuleContainer';

export const LessonTypeMapping = {
  textImage: 'Text/Image',
  video: 'Video',
  audio: 'Audio',
  file: 'File',
};
export const GenerateNewModule = (
  title = 'Module 1: Introduction'
) => {
  return {
    id: getUniqueId(),
    title,
    status: 1,
    lessons: [],
  };
};
export const GenerateNewLesson = (
  title = 'Lesson 1',
  status = 0
) => {
  return {
    id: getUniqueId(),
    title,
    status,
    description: '',
    supportMaterial: [],
    isPreview: false,
    isSaved: false,
    lessonType: '',
    textImage: '',
    video: null,
    file: [],
    audio: null,
  };
};

const CreateModulesAndLessons = () => {
  const isBrowser = useIsBrowser();
  const [openAddModuleModal, setOpenAddModuleModal] =
    useState(false);
  const addModuleForm = useForm({
    initialValues: {
      title: '',
      id: '',
    },
    validateInputOnChange: false,
    validate: {
      title: value => (!value ? 'Title is required' : null),
    },
  });
  const [courseList, setCourseList] = useState([
    {
      id: getUniqueId(),
      title: 'Module 1: Introduction',
      status: 1,
      lessons: [],
    },
  ]);
  const [showAddEditLesson, setShowAddEditLesson] =
    useState(false);
  const [dataToEdit, setDataToEdit] = useState({});
  const [activeModuleIndex, setActiveModuleIndex] =
    useState(null);

  const onDragModuleAndLesson = (
    result,
    moduleIndex = null
  ) => {
    if (!result.destination) return;

    if (moduleIndex === null) {
      // Module drag
      const assets = onDrag(result, courseList);
      if (!assets?.length) return;
      setCourseList(() => [...assets]);
    } else {
      // Lesson drag
      let assets = onDrag(result, [
        ...courseList[moduleIndex].lessons,
      ]);
      if (!assets?.length) return;
      const newCourseList = [...courseList];
      newCourseList[moduleIndex].lessons = [...assets];
      setCourseList(() => [...newCourseList]);
    }
  };

  const onAddOrEditLesson = (
    moduleIndex,
    lessonIndex,
    update = false, //for checking to open the edit modal or to update the lesson
    updatedData
  ) => {
    // Add query parameter to the URL when opening the modal
    if (!update) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('modal', 'true');
      window.history.pushState({}, '', currentUrl);
    }
    if (update) {
      setCourseList(prevCourseList => {
        const newCourseList = [...prevCourseList];
        if (
          newCourseList[activeModuleIndex].lessons.some(
            lesson => lesson.id === updatedData.id
          )
        ) {
          newCourseList[activeModuleIndex].lessons =
            newCourseList[activeModuleIndex].lessons.map(
              lesson =>
                lesson.id === updatedData.id
                  ? updatedData
                  : lesson
            );
        } else {
          newCourseList[activeModuleIndex].lessons.push(
            updatedData
          );
        }

        return newCourseList;
      });
      setActiveModuleIndex(null);
      setDataToEdit({});
    } else {
      setActiveModuleIndex(moduleIndex);
      if (typeof lessonIndex === 'number') {
        setDataToEdit(
          courseList[moduleIndex].lessons[lessonIndex]
        );
      } else {
        setDataToEdit(
          GenerateNewLesson(
            `Lesson ${courseList[moduleIndex].lessons.length + 1}`,
            courseList[moduleIndex].status
          )
        );
      }
      setShowAddEditLesson(true);
    }
  };

  const onAddUpdateModuleTitle = (
    title = `Module ${courseList.length + 1}: Introduction`,
    id
  ) => {
    let newCourseList = [...courseList];
    if (id) {
      newCourseList = newCourseList.map(module => {
        if (module.id === id) {
          return {
            ...module,
            title,
          };
        }
        return module;
      });
    } else {
      newCourseList = [
        ...newCourseList,
        {
          id: getUniqueId(),
          title: title,
          status: 1,
          lessons: [],
        },
      ];
    }

    setCourseList(newCourseList);
  };

  const onUpdate = ({
    type = 'status',
    moduleIndex,
    lessonIndex = 0,
    isModule = true,
  }) => {
    let newCourseList = [...courseList];
    let newModule = newCourseList[moduleIndex];
    let newLesson =
      newCourseList[moduleIndex]?.lessons[lessonIndex];

    if (isModule) {
      switch (type) {
        case 'status':
          newCourseList[moduleIndex].status =
            newModule.status === 0 ? 1 : 0;
          newCourseList[moduleIndex].lessons =
            newCourseList[moduleIndex].lessons.map(
              lesson => ({
                ...lesson,
                status: newModule.status,
                isPreview: false,
              })
            );
          break;
        case 'delete':
          newCourseList.splice(moduleIndex, 1);
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case 'status':
          if (newModule.status === 0) {
            toast.error(
              'Publish the module to publish lessons'
            );
          } else {
            newCourseList[moduleIndex].lessons[
              lessonIndex
            ].status = newLesson.status === 0 ? 1 : 0;
          }
          break;
        case 'delete':
          newCourseList[moduleIndex].lessons?.splice(
            lessonIndex,
            1
          );
          break;
        case 'preview':
          if (newModule.status === 0) {
            toast.error(
              'Publish the module to publish lessons'
            );
          } else {
            newCourseList[moduleIndex].lessons[
              lessonIndex
            ].status = newLesson.status === 2 ? 1 : 2;
          }
          break;
        default:
          break;
      }
    }

    setCourseList(newCourseList);
  };

  if (!courseList || !isBrowser) return null;

  return (
    <>
      <div>
        <div className="flex w-full flex-col">
          <div className="mb-4 text-sm font-semibold">
            Add modules and lessons of your course
          </div>
          <DragDropContext
            onDragEnd={result =>
              onDragModuleAndLesson(result)
            }
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
                                    moduleLength={
                                      courseList.length
                                    }
                                    onEditModuleTitle={(
                                      title,
                                      id
                                    ) => {
                                      addModuleForm.setValues(
                                        { title, id }
                                      );
                                      setOpenAddModuleModal(
                                        true
                                      );
                                    }}
                                    module={module}
                                    moduleIndex={index}
                                    onDragLesson={
                                      onDragModuleAndLesson
                                    }
                                    onAddOrEditLesson={
                                      onAddOrEditLesson
                                    }
                                    onUpdate={onUpdate}
                                    dragHandleProps={
                                      provided?.dragHandleProps
                                    }
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
          <Button
            variant="default"
            fullWidth
            onClick={() => {
              setOpenAddModuleModal(true);
            }}
          >
            + New Module
          </Button>
        </div>
        {!!showAddEditLesson && (
          <CreateCourseAddEditLessonModal
            onAddOrEditLesson={onAddOrEditLesson}
            opened={showAddEditLesson}
            dataToEdit={dataToEdit}
            onClose={() => {
              const currentUrl = new URL(
                window.location.href
              );
              if (currentUrl.searchParams.get('modal')) {
                window.history.back();
              }
              setShowAddEditLesson(false);
              setDataToEdit({});
              setActiveModuleIndex(null);
            }}
          />
        )}
      </div>
      <Modal
        trapFocus={false}
        opened={openAddModuleModal}
        onClose={() => {
          setOpenAddModuleModal(false);
          addModuleForm.reset();
        }}
      >
        <form
          onSubmit={addModuleForm.onSubmit(
            ({ title, id }) => {
              onAddUpdateModuleTitle(title, id);
              addModuleForm.reset();
              setOpenAddModuleModal(false);
            }
          )}
          className="relative my-2 flex flex-col gap-5 overflow-y-auto"
        >
          <TextInput
            label="Enter Module title"
            {...addModuleForm.getInputProps('title')}
          />
          <Button type="submit" fullWidth>
            {addModuleForm.values.id ? 'Edit' : 'Add'}{' '}
            Module{' '}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(CreateModulesAndLessons);
