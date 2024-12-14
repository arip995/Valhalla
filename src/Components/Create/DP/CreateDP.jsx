'use client';
import IframeComponent from '@/Components/Common/CreationFlow/IframeComponent';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import PreviewOne from '@/Components/Common/Preview/PreviewOne';
import {
  ActionIcon,
  Button,
  CloseButton,
  Divider,
  Tabs,
} from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import React from 'react';
import CreateDPStepOne from './CreateDPStepOne/CreateDPStepOne';
import CreateDPStepTwo from './CreateDPStepTwo/CreateDPStepTwo';
import useCreateDP from './useCreateDP';

const CreateDp = () => {
  const {
    dpForm,
    handleSubmit,
    router,
    tab,
    setTab,
    isPreviewScreen,
    setIsPreviewScreen,
    productType,
  } = useCreateDP();

  if (dpForm.values.loading === -1) {
    return <LayoutLoading />;
  }

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50">
      <div className="flex h-full w-full flex-col sm:flex-row">
        <div
          className={`flex h-screen w-full flex-col bg-white shadow-md lg:w-7/12 ${isPreviewScreen ? 'hidden' : 'flex'}`}
        >
          <div className="flex w-full flex-col gap-2 border-b border-gray-200 p-3">
            <div className="flex w-full items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <CloseButton
                  onClick={() =>
                    router.push(`/app/${productType}`)
                  }
                />
                {dpForm.values.stepsCompleted ===
                2 ? null : (
                  <>
                    <Divider
                      orientation="vertical"
                      className="h-8"
                    />
                    <span className="font-medium">
                      Step {tab === 'details' ? 1 : 2 || 1}{' '}
                      of 2
                    </span>
                  </>
                )}
              </div>
              <form
                onSubmit={dpForm.onSubmit(
                  handleSubmit,
                  errors => {
                    if (Object.keys(errors || {}).length) {
                      const firstErrorPath =
                        Object.keys(errors)?.[0];
                      dpForm
                        .getInputNode(firstErrorPath)
                        ?.focus();
                      document
                        .getElementById(
                          dpForm.key(firstErrorPath)
                        )
                        ?.scrollIntoView({
                          block: 'start',
                          behavior: 'smooth',
                        });
                    }
                  }
                )}
              >
                <div className="flex gap-2">
                  <div className="lg:hidden">
                    <ActionIcon
                      size="md"
                      variant="default"
                      radius="xl"
                      onClick={() => {
                        setIsPreviewScreen(prev => !prev);
                      }}
                    >
                      <IconEye color="gray" />
                    </ActionIcon>
                  </div>
                  <Button
                    type="submit"
                    size="xs"
                    radius="xl"
                    color="black"
                    className="transition-all hover:shadow-md"
                    loading={dpForm.values.loading === 1}
                    loaderProps={{ color: 'white' }}
                    onClick={() => {
                      dpForm.setValues({
                        isSaveClickedAtleastOnce: true,
                      });
                    }}
                  >
                    {dpForm.values.stepsCompleted === 1
                      ? 'Publish'
                      : dpForm.values.stepsCompleted > 1
                        ? 'Publish'
                        : 'Save and Continue'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          {dpForm.values.stepsCompleted > 1 && (
            <Tabs
              value={tab}
              onChange={value => {
                dpForm.setValues({
                  isSaveClickedAtleastOnce: true,
                });
                const { errors } = dpForm.validate();
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
              <CreateDPStepOne form={dpForm} />
            ) : tab === 'content' ? (
              <CreateDPStepTwo form={dpForm} />
            ) : null}
          </div>
        </div>
        <PreviewOne
          className="flex-1 bg-white p-4"
          setIsPreviewScreen={setIsPreviewScreen}
          isPreviewScreen={isPreviewScreen}
        >
          <IframeComponent>Panda</IframeComponent>
        </PreviewOne>
      </div>
    </div>
  );
};

export default React.memo(CreateDp);
