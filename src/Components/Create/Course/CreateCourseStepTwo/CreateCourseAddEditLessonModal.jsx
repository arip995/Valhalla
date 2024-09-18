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
      showAdvancedOptions:
        dataToEdit.description ||
        dataToEdit.supportMaterial?.length,
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
        values.lessonType === 'video'
          ? values.video?.type === 'link' &&
            !/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+/.test(
              values.video?.link
            )
            ? 'Enter a valid video link'
            : values.video?.type !== 'link' &&
                !values.video?.videoId
              ? 'Upload a video'
              : null
          : null,
      audio:
        values.lessonType === 'audio' && !values.audio?.url
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
          delete newValues.video;
          delete newValues.audio;
          delete newValues.file;
          break;
        case 'video':
          delete newValues.textImage;
          delete newValues.audio;
          delete newValues.file;
          break;
        case 'audio':
          delete newValues.textImage;
          delete newValues.video;
          delete newValues.file;
          break;
        case 'file':
          delete newValues.textImage;
          delete newValues.audio;
          delete newValues.video;
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
      event.preventDefault();
      event.stopPropagation();

      const hasUnsavedChanges = isValueChanged(
        dataToEdit,
        updateLessonForm.values
      );
      if (hasUnsavedChanges) {
        const confirmLeave = window.confirm(
          'You have unsaved changes. Do you want to discard them?'
        );
        if (confirmLeave) {
          onClose();
          updateLessonForm.reset();
        }
      } else {
        onClose();
        updateLessonForm.reset();
      }
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
      // lockScroll={false}
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
