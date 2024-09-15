import CustomTipTapEditor from '@/Components/Common/Editor/CustomTipTapEditor';
import ListFileOne from '@/Components/Common/ListFiles/ListFileOne';
import ListFiles from '@/Components/Common/ListFiles/ListFiles';
import UploadVideoStream from '@/Components/Common/Upload/UploadVideoStream';
import {
  ActionIcon,
  Button,
  Collapse,
  Input,
  Menu,
  rem,
  Textarea,
  TextInput,
} from '@mantine/core';
import {
  IconChevronDown,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';
import React, { useMemo } from 'react';
import CreateCourseLessonType from './CreateCourseLessonType';
import { LessonTypeMapping } from './CreateModulesAndLessons';
import { modals } from '@mantine/modals';

const LessonContent = ({ lessonType, form }) => {
  switch (lessonType) {
    case 'textImage':
      return (
        <CustomTipTapEditor
          label="Add Text/Image"
          id={form.key('textImage')}
          value={form.values.textImage}
          onUpdate={html =>
            form.setValues({ textImage: html })
          }
        />
      );
    case 'file':
      return (
        <ListFileOne
          uploadButtonText="Upload Files"
          maxSize={10}
          file={form.values.file}
          mimeTypes={['application/*']}
          onUpdate={value =>
            form.setFieldValue('file', value)
          }
          onChangeLink={value =>
            form.setFieldValue('file', value)
          }
        />
      );
    case 'audio':
      return (
        <ListFileOne
          uploadButtonText="Upload Audio"
          maxSize={100}
          file={
            form.values.audio?.length
              ? form.values.audio
              : []
          }
          onlyOne
          mimeTypes={['audio/*']}
          onUpdate={value =>
            form.setFieldValue('audio', value)
          }
        />
      );
    case 'video':
      return (
        <UploadVideoStream
          onUpload={value =>
            form.setFieldValue('video', value)
          }
          file={form.values.video}
        />
      );
    default:
      return null;
  }
};

const SavedLessonContent = ({ lessonType, form }) => {
  const content = useMemo(() => {
    if (lessonType === 'textImage') {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: form.values?.textImage,
          }}
        />
      );
    } else if (
      ['file', 'video', 'audio'].includes(lessonType)
    ) {
      return (
        <ListFiles
          files={form.values[lessonType]}
          showTrash={false}
        />
      );
    }
    return null;
  }, [lessonType, form.values]);

  return content;
};

const CreateCourseAddEditLesson = ({ form }) => {
  const handleSave = () => {
    form.setValues({ isSaveClickedAtleastOnce: true });
    const { errors } = form.validate();
    const hasErrors = [
      'video',
      'audio',
      'textImage',
      'file',
    ].some(field => errors[field]);

    if (!hasErrors) {
      form.setValues({ isSaved: true });
    }
  };

  const handleDelete = () => {
    form.setValues({
      lessonType: null,
      isSaveClickedAtleastOnce: false,
      isSaved: false,
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
      <TextInput
        label="Title"
        placeholder="Enter lesson title"
        withAsterisk
        {...form.getInputProps('title')}
      />
      <div className="rounded-lg transition-all duration-300">
        <CreateCourseLessonType
          label="Create content with text, images, videos, and files"
          onSelect={value =>
            form.setValues({ lessonType: value })
          }
        >
          {form.values.lessonType && (
            <>
              {form.values.isSaved ? (
                <div className="mt-4 flex flex-col gap-3 rounded-xl border border-gray-300 bg-gray-50 p-4 transition-all duration-300 hover:shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-gray-900">
                      {
                        LessonTypeMapping[
                          form.values.lessonType
                        ]
                      }
                    </div>
                    <Menu width={150} position="bottom-end">
                      <Menu.Target>
                        <ActionIcon
                          variant="subtle"
                          color="gray"
                          size="sm"
                          className="transition-all duration-300 hover:bg-gray-200"
                        >
                          <IconDotsVertical />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          onClick={() =>
                            form.setValues({
                              isSaved: false,
                            })
                          }
                          leftSection={
                            <IconEdit
                              style={{
                                width: rem(14),
                                height: rem(14),
                              }}
                            />
                          }
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => {
                            modals.openConfirmModal({
                              title: 'Delete Lesson',
                              children: (
                                <div className="text-lg font-bold">
                                  Delete this lesson ?
                                  <br />
                                  <span className="text-sm text-gray-500">
                                    You will not be able to
                                    undo this action.
                                  </span>
                                </div>
                              ),
                              labels: {
                                confirm: 'Yes, Delete',
                                cancel: 'Cancel',
                              },
                              confirmProps: {
                                color: 'red',
                              },
                              onCancel: () => {},
                              onConfirm: () => {
                                handleDelete();
                              },
                            });
                          }}
                          color="red"
                          leftSection={
                            <IconTrash
                              style={{
                                width: rem(14),
                                height: rem(14),
                              }}
                            />
                          }
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </div>
                  <SavedLessonContent
                    lessonType={form.values.lessonType}
                    form={form}
                  />
                </div>
              ) : (
                <>
                  <LessonContent
                    lessonType={form.values.lessonType}
                    form={form}
                  />
                  {form.values.lessonType && (
                    <div className="mt-4 flex justify-end gap-3">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </CreateCourseLessonType>
        {!!Object.keys(form.errors || {}).length && (
          <Input.Error className="mt-2">
            {form.errors.lessonType ||
              form.errors.file ||
              form.errors.textImage ||
              form.errors.video ||
              form.errors.audio ||
              form.errors.isSaved}
          </Input.Error>
        )}
      </div>

      <div>
        <Button
          variant="transparent"
          className="!p-0"
          onClick={() =>
            form.setValues({
              showAdvancedOptions:
                !form.values.showAdvancedOptions,
            })
          }
        >
          Advanced Options
          <IconChevronDown
            className={`${
              form.values.showAdvancedOptions
                ? 'rotate-180'
                : ''
            } ml-1 h-5 w-5 transition-all duration-300`}
          />
        </Button>
      </div>
      <Collapse
        in={form.values.showAdvancedOptions}
        className="flex flex-col gap-4"
      >
        <Textarea
          resize="vertical"
          label="Description"
          placeholder="Description"
          {...form.getInputProps('description')}
        />
        <div className="flex w-full flex-col">
          <Input.Label>Support Material</Input.Label>
          <ListFileOne
            uploadButtonText="Upload Files"
            maxSize={10}
            file={form.values.supportMaterial}
            mimeTypes={['application/*']}
            onUpdate={value =>
              form.setFieldValue('supportMaterial', value)
            }
          />
        </div>
      </Collapse>
    </div>
  );
};

export default React.memo(CreateCourseAddEditLesson);
