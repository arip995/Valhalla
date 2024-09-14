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
  ScrollArea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import '../../../../styles/create/Course.css';
import CreateCourseAddEditLessonModal from './CreateCourseAddEditLessonModal';
import CreateCourseModuleContainer from './CreateCourseModuleContainer';

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
      dripTime: new Date(),
      status: 1,
      lessons: [
        {
          id: getUniqueId(),
          title: 'Lesson 1',
          description: '',
          supportMaterial: [],
          isPreview: false,
          isSaved: false,
          status: 1,
          lessonType: '',
          textImage: '',
          video: [],
          file: [],
          audio: [],
        },
      ],
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

  const onEditLesson = (
    moduleIndex,
    lessonIndex,
    update = false,
    updatedData
  ) => {
    if (update) {
      let newCourseList = [...courseList];
      newCourseList[activeModuleIndex].lessons =
        newCourseList[activeModuleIndex].lessons.map(
          lesson => {
            if (lesson.id === updatedData.id) {
              return updatedData;
            }
            return lesson;
          }
        );
      setCourseList(() => [...newCourseList]);
    } else {
      setActiveModuleIndex(moduleIndex);
      setDataToEdit(
        courseList[moduleIndex].lessons[lessonIndex]
      );
      setShowAddEditLesson(true);
    }
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
      isPreview: false,
      isSaved: false,
      status: courseList[moduleIndex].status,
      lessonType: '',
      textImage: '',
      video: [],
      file: [],
      audio: [],
    });
    setCourseList(() => [...newCourseList]);
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
          dripTime: new Date(),
          lessons: [
            {
              id: getUniqueId(),
              title: 'Lesson 1',
              description: '',
              supportMaterial: [],
              isPreview: false,
              isSaved: false,
              status: 1,
              lessonType: '',
              textImage: '',
              video: [],
              file: [],
              audio: [],
            },
          ],
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
          console.log(lessonIndex);
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
      <div className="cmal-container">
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
                                    showDrag={
                                      courseList?.length > 1
                                    }
                                    length={
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
                                    onEditLesson={
                                      onEditLesson
                                    }
                                    onAddLesson={
                                      onAddLesson
                                    }
                                    onUpdate={onUpdate}
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
            onClick={() => {
              setOpenAddModuleModal(true);
            }}
          >
            + New Module
          </div>
        </div>
        {!!showAddEditLesson && (
          <CreateCourseAddEditLessonModal
            onEditLesson={onEditLesson}
            opened={showAddEditLesson}
            setOpened={setShowAddEditLesson}
            onClose={() => {
              setShowAddEditLesson(false);
              setDataToEdit({});
              setActiveModuleIndex(null);
            }}
            dataToEdit={dataToEdit}
            onUpdate={onUpdateCourseList}
          />
        )}
      </div>
      <Modal
        trapFocus={false}
        opened={openAddModuleModal}
        fullScreen
        onClose={() => {
          setOpenAddModuleModal(false);
          addModuleForm.reset();
        }}
      >
        <ScrollArea.Autosize
          type="always"
          className="max-h-[calc(100vh-80px)] pb-12"
          scrollbarSize={5}
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
          </form>
        </ScrollArea.Autosize>
        <form
          onSubmit={addModuleForm.onSubmit(
            ({ title, id }) => {
              onAddUpdateModuleTitle(title, id);
              addModuleForm.reset();
              setOpenAddModuleModal(false);
            }
          )}
          className="absolute bottom-0 w-full max-w-[calc(100vw-30px)] border-t border-gray-200 bg-white py-4"
        >
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
