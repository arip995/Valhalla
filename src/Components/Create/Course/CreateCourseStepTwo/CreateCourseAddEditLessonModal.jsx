import { Button, Modal, ScrollArea } from '@mantine/core';
import { useForm } from '@mantine/form';
import CreateCourseAddEditLesson from './CreateCourseAddEditLesson';
import React from 'react';
import { validateEditorContent } from '@/Utils/Regex';

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
        values.lessonType === 'video' && !values.video
          ? 'Video is required'
          : null,
      audio:
        values.lessonType === 'audio' && !values.audio
          ? 'Audio is required'
          : null,
      file:
        values.lessonType === 'file' && !values.file?.length
          ? 'File is required'
          : null,
    }),
  });
  return (
    <Modal
      opened={opened}
      title="Lesson"
      onClose={() => {
        onClose();
        updateLessonForm.reset();
      }}
      trapFocus={false}
      fullScreen
    >
      <ScrollArea.Autosize
        type="always"
        className="max-h-[calc(100vh-80px)] pb-16 pt-2"
        scrollbarSize={5}
      >
        <CreateCourseAddEditLesson
          form={updateLessonForm}
        />
      </ScrollArea.Autosize>
      <form
        onSubmit={updateLessonForm.onSubmit(values => {
          onEditLesson(undefined, undefined, true, values);
          updateLessonForm.reset();
          onClose();
        })}
        className="absolute bottom-0 w-full max-w-[calc(100vw-30px)] border-t border-gray-200 bg-white py-4"
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
          {updateLessonForm.values.id ? 'Edit' : 'Add'}{' '}
          Lesson{' '}
        </Button>
      </form>
    </Modal>
  );
};

export default React.memo(CreateCourseAddEditLessonModal);
