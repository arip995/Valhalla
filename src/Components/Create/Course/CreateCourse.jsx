'use client';
import { Button, CloseButton, Tabs } from '@mantine/core';
import CreateCourseStepOne from './CreateCourseStepOne/CreateCourseStepOne';
import CreateCourseStepTwo from './CreateCourseStepTwo/CreateCourseStepTwo';
import useCreateCourse from './useCreateCourse';
import Preview from '@/Components/Common/Preview';
import React from 'react';
const CreateCourse = () => {
  const { courseForm, handleSubmit, router } =
    useCreateCourse();

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex h-full w-full flex-col sm:flex-row">
        <div className="flex h-screen w-full flex-col sm:w-5/12">
          <div className="flex w-full flex-col gap-1 border-b-[1px] border-gray-300">
            <div className="flex w-full items-center gap-2 p-2 text-sm text-gray-500">
              <div className="border-r-[1px] border-gray-300">
                <CloseButton
                  onClick={() => router.back()}
                />
              </div>
              Step 1 of 2
            </div>
            {courseForm.values.stepsCompleted > 1 ? (
              <Tabs
                defaultValue="details"
                variant="default"
              >
                <Tabs.List grow>
                  <Tabs.Tab value="details">
                    Details
                  </Tabs.Tab>
                  <Tabs.Tab value="content">
                    Content
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
            ) : null}
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto">
            {courseForm.values.step === 1 ? (
              <CreateCourseStepOne
                courseForm={courseForm}
              />
            ) : (
              <CreateCourseStepTwo
                courseForm={courseForm}
              />
            )}
          </div>
          <div className="flex flex-row-reverse border-t-[1px] border-gray-300 p-2">
            <form
              onSubmit={courseForm.onSubmit(
                handleSubmit,
                errors => {
                  if (Object.keys(errors || {}).length) {
                    const firstErrorPath =
                      Object.keys(errors)?.[0];
                    courseForm
                      .getInputNode(firstErrorPath)
                      ?.focus();
                    document
                      .getElementById(
                        courseForm.key(firstErrorPath)
                      )
                      ?.scrollIntoView({
                        block: 'start',
                        behavior: 'smooth',
                        inline: 'nearest',
                        offset: 400,
                      });
                  }
                }
              )}
            >
              <Button
                type="submit"
                onClick={() => {
                  courseForm.setValues({
                    isSaveClickedAtleastOnce: true,
                  });
                }}
              >
                {courseForm.values.stepsCompleted === 1
                  ? 'Publish course'
                  : courseForm.values.stepsCompleted > 1
                    ? 'Create Course'
                    : 'Save and continue'}
              </Button>
            </form>
          </div>
        </div>
        <div className="hidden w-[1px] bg-gray-300 sm:block"></div>
        <Preview>
          <div>Preview</div>
        </Preview>
      </div>
    </div>
  );
};

export default React.memo(CreateCourse);
