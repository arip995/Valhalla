'use client';
import {
  Button,
  CloseButton,
  Divider,
  Tabs,
} from '@mantine/core';
import CreateCourseStepOne from './CreateCourseStepOne/CreateCourseStepOne';
import CreateCourseStepTwo from './CreateCourseStepTwo/CreateCourseStepTwo';
import useCreateCourse from './useCreateCourse';
import Preview from '@/Components/Common/Preview';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const CreateCourse = () => {
  const { courseForm, handleSubmit, router } =
    useCreateCourse();

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50">
      <div className="flex h-full w-full flex-col sm:flex-row">
        <div className="flex h-screen w-full flex-col bg-white shadow-md lg:w-7/12">
          <div className="flex w-full flex-col gap-2 border-b border-gray-200 p-3">
            <div className="flex w-full items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <CloseButton
                  onClick={() => router.back()}
                  className="transition-colors hover:bg-gray-100"
                />
                <Divider
                  orientation="vertical"
                  className="h-8"
                />
                <span className="font-medium">
                  Step {courseForm.values.step || 1} of 2
                </span>
              </div>
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
                          block: 'center',
                          behavior: 'smooth',
                        });
                    }
                  }
                )}
              >
                <Button
                  type="submit"
                  size="xs"
                  radius="xl"
                  color="black"
                  className="transition-all hover:shadow-md"
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
          {courseForm.values.stepsCompleted > 1 && (
            <Tabs defaultValue="details" size="">
              <Tabs.List grow>
                <Tabs.Tab
                  value="details"
                  className="font-medium"
                >
                  Details
                </Tabs.Tab>
                <Tabs.Tab
                  value="content"
                  className="font-medium"
                >
                  Content
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          )}

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
        </div>
        <div className="hidden w-[1px] bg-gray-200 sm:block"></div>
        <Preview className="flex-1 bg-white p-4">
          <div className="text-lg font-semibold text-gray-700">
            Preview
          </div>
        </Preview>
      </div>
      <Toaster />
    </div>
  );
};

export default React.memo(CreateCourse);
