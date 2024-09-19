'use client';
import PreviewOne from '@/Components/Common/Preview/PreviewOne';
import {
  Button,
  CloseButton,
  Divider,
  Tabs,
} from '@mantine/core';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import CreateCourseStepOne from './CreateCourseStepOne/CreateCourseStepOne';
import CreateCourseStepTwo from './CreateCourseStepTwo/CreateCourseStepTwo';
import useCreateCourse from './useCreateCourse';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import { IconEye } from '@tabler/icons-react';

const CreateCourse = () => {
  const { courseForm, handleSubmit, router, tab, setTab } =
    useCreateCourse();

  if (courseForm.values.loading === -1) {
    return <LayoutLoading />;
  }

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50">
      <div className="flex h-full w-full flex-col sm:flex-row">
        <div className="flex h-screen w-full flex-col bg-white shadow-md lg:w-7/12">
          <div className="flex w-full flex-col gap-2 border-b border-gray-200 p-3">
            <div className="flex w-full items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <CloseButton
                  onClick={() => router.push('/app/course')}
                />
                {courseForm.values.stepsCompleted ===
                2 ? null : (
                  <>
                    <Divider
                      orientation="vertical"
                      className="h-8"
                    />
                    <span className="font-medium">
                      Step {tab === 'details' ? 1 : 2 || 1}
                      of 2
                    </span>
                  </>
                )}
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
                  className="mr-2 lg:hidden"
                  leftSection={<IconEye color="gray" />}
                  variant="default"
                  radius="xl"
                  size="xs"
                >
                  <span className="hidden lg:block">
                    Preview
                  </span>
                </Button>

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
                      ? 'Publish Course'
                      : 'Save and Continue'}
                </Button>
              </form>
            </div>
          </div>
          {courseForm.values.stepsCompleted > 1 && (
            <Tabs
              value={tab}
              onChange={value => {
                courseForm.setValues({
                  isSaveClickedAtleastOnce: true,
                });
                const { errors } = courseForm.validate();
                if (Object.keys(errors || {}).length) {
                  return;
                }
                setTab(value);
              }}
            >
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
            {tab === 'details' ? (
              <CreateCourseStepOne
                courseForm={courseForm}
              />
            ) : tab === 'content' ? (
              <CreateCourseStepTwo
                courseForm={courseForm}
              />
            ) : null}
          </div>
        </div>
        {/* <PreviewTwo className="flex-1 bg-white p-4">
          <div className="text-lg font-semibold text-gray-700">
            Preview
          </div>
        </PreviewTwo> */}
        <PreviewOne className="flex-1 bg-white p-4">
          <div className="text-lg font-semibold text-gray-700">
            Preview
          </div>
        </PreviewOne>
      </div>
      <Toaster />
    </div>
  );
};

export default React.memo(CreateCourse);
