'use client';

import React from 'react';
import '../../../styles/create/LockedContent.css';
import PaperWrapper from '../../Auth/PaperWrapper';
import useCreateTelegram from './useCreateTelegram';
import {
  Button,
  FileButton,
  Flex,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import {
  IconCurrencyRupee,
  IconUpload,
} from '@tabler/icons-react';
import HeaderWrapper from '../../Auth/HeaderWrapper';
import { CategoriesList } from '@/src/Constants/constants';
import toast, { Toaster } from 'react-hot-toast';
import ListFiles from '../../Common/ListFiles/ListFiles';
import { Radio, Group, Text } from '@mantine/core';
import StepOneCreateTelegram from './StepOneCreateTelegram';
import StepTwoCreateTelegram from './StepTwoCreateTelegram';
import StepThreeCreateTelegram from './StepThreeCreateTelegram';

const CreateTelegram = ({ data }) => {
  const {
    createTelegramForm,
    stepOneForm,
    onStepOneSubmit,
    step,
    user,
  } = useCreateTelegram(data);
  return (
    <>
      <div className="lc-container lc-container-animation">
        <div className="w-full flex  flex-col items-center gap-2">
          <HeaderWrapper
            titleOne={'Create Telegram Integration'}
          />
          <PaperWrapper>
            {step === 1 ? (
              <StepOneCreateTelegram
                stepOneForm={stepOneForm}
                onStepOneSubmit={onStepOneSubmit}
                user={user}
              />
            ) : step === 2 ? (
              <StepTwoCreateTelegram />
            ) : (
              <StepThreeCreateTelegram />
            )}
          </PaperWrapper>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default CreateTelegram;
