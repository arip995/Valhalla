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
import React from 'react';
import CreateCourseLessonType from './CreateCourseLessonType';
import CustomTipTapEditor from '@/Components/Common/Editor/CustomTipTapEditor';
import ListFileOne from '@/Components/Common/ListFiles/ListFileOne';
import UploadVideoStream from '@/Components/Common/Upload/UploadVideoStream';
import ListFiles from '@/Components/Common/ListFiles/ListFiles';
import {
  IconChevronDown,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';
import { LessonTypeMapping } from './CreateModulesAndLessons';

const CreateCourseAddEditLesson = ({ form }) => {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <TextInput
        label="Title"
        placeholder="Title"
        withAsterisk
        {...form.getInputProps('title')}
      />
      <div className="">
        <CreateCourseLessonType
          label=" Create content with text, images, videos, and files"
          onSelect={value =>
            form.setValues({
              lessonType: value,
            })
          }
        >
          {form.values.lessonType && (
            <>
              {form.values.isSaved ? (
                <div className="flex flex-col gap-2 rounded-xl border border-gray-300 p-3">
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
                          color="rgba(199, 199, 199, 1)"
                          size="sm"
                        >
                          <IconDotsVertical />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          onClick={() => {
                            form.setValues({
                              isSaved: false,
                            });
                          }}
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
                            form.setValues({
                              isSaved: false,
                              lessonType: null,
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
                  {form.values.lessonType ===
                  'textImage' ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: form.values?.textImage,
                      }}
                    />
                  ) : form.values.lessonType === 'file' ||
                    form.values.lessonType === 'video' ||
                    form.values.lessonType === 'audio' ? (
                    <ListFiles
                      files={
                        form.values.lessonType === 'file'
                          ? form.values.file
                          : form.values.lessonType ===
                              'video'
                            ? form.values.video
                            : form.values.audio
                      }
                      showTrash={false}
                    />
                  ) : null}
                </div>
              ) : (
                <>
                  {form.values.lessonType ===
                  'textImage' ? (
                    <CustomTipTapEditor
                      label="Add Text/Image"
                      id={form.key('textImage')}
                      value={form.values.textImage}
                      onUpdate={html => {
                        form.setValues({ textImage: html });
                      }}
                    />
                  ) : form.values.lessonType === 'file' ? (
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
                  ) : form.values.lessonType === 'audio' ? (
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
                  ) : form.values.lessonType === 'video' ? (
                    <UploadVideoStream
                      onUpload={value =>
                        form.setFieldValue('video', value)
                      }
                      file={form.values.video}
                    />
                  ) : null}
                  {form.values.lessonType ? (
                    <div className="mt-2 flex justify-end gap-3">
                      <Button
                        size="xs"
                        variant="default"
                        color="red"
                        onClick={() => {
                          form.setValues({
                            lessonType: null,
                            // [form.values.lessonType]: null,
                            isSaveClickedAtleastOnce: false,
                            isSaved: false,
                          });
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => {
                          form.setValues({
                            isSaveClickedAtleastOnce: true,
                          });
                          const { errors } =
                            form.validate();
                          const hasErrors = [
                            'video',
                            'audio',
                            'textImage',
                            'file',
                          ].some(field => errors[field]);

                          if (!hasErrors) {
                            form.setValues({
                              isSaved: true,
                            });
                          }
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  ) : null}
                </>
              )}
            </>
          )}
        </CreateCourseLessonType>
        {!!Object.keys(form.errors || {}).length && (
          <Input.Error>
            {form.errors.lessonType
              ? form.errors.lessonType
              : form.errors.file
                ? form.errors.file
                : form.errors.textImage
                  ? form.errors.textImage
                  : form.errors.video
                    ? form.errors.video
                    : form.errors.audio
                      ? form.errors.audio
                      : form.errors.isSaved
                        ? form.errors.isSaved
                        : null}
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
