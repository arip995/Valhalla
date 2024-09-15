import { validateEditorContent } from '@/Utils/Regex';
import { Button, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import CreateCourseAddEditLesson from './CreateCourseAddEditLesson';

// import AddEditLesson from './AddEditLesson';

const CreateCourseAddEditLessonModal = ({
  opened,
  // setOpened,
  onClose,
  dataToEdit,
  onEditLesson,
}) => {
  const updateLessonForm = useForm({
    initialValues: {
      ...dataToEdit,
      isSaveClickedAtleastOnce: false,
    },
    validate: values => ({
      title: !values.title ? 'Title is required' : null,
      lessonType:
        values.isSaveClickedAtleastOnce &&
        !values.lessonType
          ? 'Lesson type is required'
          : null,
      textImage:
        values.lessonType === 'textImage' &&
        validateEditorContent(values.textImage),
      video:
        values.lessonType !== 'video'
          ? null
          : values.lessonType === 'video' &&
              !values.video.length
            ? 'Video is required'
            : values.video?.[0]?.type === 'link' &&
                !/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+/.test(
                  values.video[0].link
                )
              ? 'Enter a valid video link'
              : values.video?.[0]?.type !== 'link' &&
                  !values.video?.[0]?.videoId
                ? 'Upload a video'
                : null,
      audio:
        values.lessonType === 'audio' &&
        !values.audio?.length
          ? 'Audio is required'
          : null,
      file:
        values.lessonType === 'file' && !values.file?.length
          ? 'File is required'
          : null,
    }),
    transformValues: values => {
      let newValues = { ...values };
      switch (values.lessonType) {
        case 'textImage':
          newValues.video = [];
          newValues.audio = [];
          newValues.file = [];
          break;
        case 'video':
          newValues.textImage = null;
          newValues.audio = [];
          newValues.file = [];
          break;
        case 'audio':
          newValues.textImage = null;
          newValues.video = [];
          newValues.file = [];
          break;
        case 'file':
          newValues.textImage = null;
          newValues.audio = [];
          newValues.video = [];
          break;
      }
      newValues.isSaved = true;
      delete newValues.isSaveClickedAtleastOnce;
    },
  });

  return (
    <Modal
      opened={opened}
      lockScroll={false}
      title="Lesson"
      trapFocus={false}
      fullScreen
      styles={{
        body: {
          padding: 0,
        },
      }}
      onClose={() => {
        onClose();
        updateLessonForm.reset();
      }}
    >
      <div className="flex h-[calc(100vh-60px)] w-full flex-col">
        <div className="flex w-full flex-1 flex-col overflow-y-auto p-3">
          <CreateCourseAddEditLesson
            form={updateLessonForm}
          />
        </div>
        <form
          onSubmit={updateLessonForm.onSubmit(values => {
            onEditLesson(
              undefined,
              undefined,
              true,
              values
            );
            updateLessonForm.reset();
            onClose();
          })}
          className="sticky bottom-0 w-full border-t border-gray-200 bg-white px-2 py-3"
        >
          <Button
            type="submit"
            fullWidth
            onClick={() => {
              updateLessonForm.setFieldValue(
                'isSaveClickedAtleastOnce',
                true
              );
            }}
          >
            Save Lesson
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default React.memo(CreateCourseAddEditLessonModal);
