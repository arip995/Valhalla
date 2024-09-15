import { Button, Input, TextInput } from '@mantine/core';
import React from 'react';
import CreateCourseLessonType from './CreateCourseLessonType';
import CustomTipTapEditor from '@/Components/Common/Editor/CustomTipTapEditor';
import ListFileOne from '@/Components/Common/ListFiles/ListFileOne';
import UploadVideoStream from '@/Components/Common/Upload/UploadVideoStream';

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
                <></>
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
                        onClick={() => {
                          form.setValues({
                            lessonType: null,
                            // [form.values.lessonType]: null,
                            isSaveClickedAtleastOnce: false,
                            isSaved: false,
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="xs"
                        onClick={() => {
                          form.setValues({
                            isSaveClickedAtleastOnce: true,
                          });
                          let { errors } = form.validate();
                          console.log(errors);
                          if (
                            errors.video ||
                            errors.audio ||
                            errors.textImage ||
                            errors.file
                          ) {
                            console.log();
                          } else {
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
                      : null}
          </Input.Error>
        )}
      </div>

      <TextInput
        label="Description"
        placeholder="Description"
        {...form.getInputProps('description')}
      />
      <TextInput
        label="Support Material"
        placeholder="Support Material"
        {...form.getInputProps('supportMaterial')}
      />
    </div>
  );
};

export default React.memo(CreateCourseAddEditLesson);
