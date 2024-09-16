import { isValueChanged } from '@/Utils/Common';
import { validateEditorContent } from '@/Utils/Regex';
import { Button, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useEffect } from 'react';
import CreateCourseAddEditLesson from './CreateCourseAddEditLesson';

const CreateCourseAddEditLessonModal = ({
  opened,
  onClose,
  dataToEdit,
  onAddOrEditLesson,
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
      isSaved:
        !values.isSaved && values.isSaveClickedAtleastOnce
          ? 'Save the content to continue'
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
      delete newValues.showAdvancedOptions;
      return newValues;
    },
  });

  useEffect(() => {
    const handlePopState = event => {
      // Prevent the default behavior
      event.preventDefault();
      const hasUnsavedChanges = isValueChanged(
        dataToEdit,
        updateLessonForm.values
      );
      if (hasUnsavedChanges) {
        const confirmLeave = window.confirm(
          'You have unsaved changes. Do you want to leave without saving?'
        );
        if (confirmLeave) {
          onClose();
          updateLessonForm.reset();
        }
      } else {
        onClose();
        updateLessonForm.reset();
      }
      window.history.pushState(
        null,
        '',
        window.location.href
      );
    };

    const handleBeforeUnload = event => {
      const hasUnsavedChanges = isValueChanged(
        dataToEdit,
        updateLessonForm.values
      );
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener(
      'beforeunload',
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        'popstate',
        handlePopState
      );
      window.removeEventListener(
        'beforeunload',
        handleBeforeUnload
      );
    };
  }, [updateLessonForm.values]);

  return (
    <Modal
      opened={opened}
      title="Lesson"
      lockScroll={false}
      closeOnEscape={false}
      trapFocus={false}
      fullScreen
      styles={{
        body: {
          padding: 0,
        },
      }}
      onClose={() => {
        const hasUnsavedChanges = isValueChanged(
          dataToEdit,
          updateLessonForm.values
        );
        if (hasUnsavedChanges) {
          const confirmLeave = window.confirm(
            'You have unsaved changes. Do you want to leave without saving?'
          );
          if (confirmLeave) {
            onClose();
            updateLessonForm.reset();
          }
        } else {
          onClose();
          updateLessonForm.reset();
        }
      }}
    >
      <div className="flex h-[calc(100vh-60px)] w-full flex-col">
        <div className="flex w-full flex-1 flex-col overflow-y-auto p-3">
          <CreateCourseAddEditLesson
            form={updateLessonForm}
          />
        </div>
        <div className="flex w-full justify-center">
          <form
            onSubmit={updateLessonForm.onSubmit(values => {
              onAddOrEditLesson(
                undefined,
                undefined,
                true,
                values
              );
              updateLessonForm.reset();
              onClose();
            })}
            className="sticky bottom-0 w-full max-w-xl border-t border-gray-200 bg-white px-2 py-3"
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
      </div>
    </Modal>
  );
};

export default React.memo(CreateCourseAddEditLessonModal);
