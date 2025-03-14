'use client';

import {
  ActionIcon,
  Box,
  LoadingOverlay,
  Progress,
  Text,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import '../../../styles/common/common-container.css';
import '../../../styles/create/Telegram.css';
import PaperWrapper from '../../Auth/PaperWrapper';
import StepOneCreateTelegram from './StepOneCreateTelegram';
import StepThreeCreateTelegram from './StepThreeCreateTelegram';
import StepTwoCreateTelegram from './StepTwoCreateTelegram';
import useCreateTelegram from './useCreateTelegram';

const CreateTelegram = ({ data }) => {
  const {
    stepOneForm,
    stepTwoForm,
    stepThreeForm,
    onStepOneSubmit,
    onStepTwoSubmit,
    onStepThreeSubmit,
    onConnectExisting,
    existingGroups,
    showWarning,
    isForbiddenError,
    step,
    setStep,
    user,
    loading,
  } = useCreateTelegram(data);

  return (
    <>
      <div className="top-container">
        <div className="flex w-11/12 max-w-[600px] flex-col items-center gap-2 md:w-1/2">
          <div className="text-3xl font-semibold text-gray-900">
            Create Telegram Community
          </div>
          <Box pos="relative" className="w-full">
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{
                blur: 2,
              }}
            />
            <PaperWrapper
              className="!w-full"
              showBackButton={true}
            >
              <div className="flex items-center justify-between">
                {step === 1 &&
                stepOneForm.values.isOtpScreen !== 0 ? (
                  <div />
                ) : (
                  <ActionIcon
                    variant="transparent"
                    radius={'lg'}
                    onClick={() => {
                      if (
                        step === 1 &&
                        stepOneForm.values.isOtpScreen === 0
                      ) {
                        stepOneForm.setValues({
                          isOtpScreen: -1,
                        });
                      } else if (step === 2) {
                        setStep(1);
                      } else if (step === 3) {
                        setStep(2);
                      }
                    }}
                  >
                    <IconArrowLeft
                      stroke={1}
                      color="black"
                    />
                  </ActionIcon>
                )}
                <div className="flex items-center gap-2">
                  <Text size="md" fw={600}>
                    {step === 1
                      ? 'Connect with telegram'
                      : step === 2
                        ? 'Select/Create a channel'
                        : 'Create a plan'}
                  </Text>
                  <Text size="xs" c={'dimmed'}>
                    Step({step}/3)
                  </Text>
                </div>
              </div>
              <Progress
                radius="none"
                my={'md'}
                size="xs"
                value={
                  step === 1 ? 33 : step === 2 ? 66 : 100
                }
              />
              {step === 1 ? (
                <StepOneCreateTelegram
                  stepOneForm={stepOneForm}
                  onStepOneSubmit={onStepOneSubmit}
                  onConnectExisting={onConnectExisting}
                  user={user}
                  showWarning={showWarning}
                />
              ) : step === 2 ? (
                <StepTwoCreateTelegram
                  stepTwoForm={stepTwoForm}
                  onStepTwoSubmit={onStepTwoSubmit}
                  existingGroups={existingGroups}
                />
              ) : (
                <StepThreeCreateTelegram
                  stepThreeForm={stepThreeForm}
                  onStepThreeSubmit={onStepThreeSubmit}
                  isForbiddenError={isForbiddenError}
                />
              )}
            </PaperWrapper>
          </Box>
        </div>
      </div>
    </>
  );
};

export default React.memo(CreateTelegram);
