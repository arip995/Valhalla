'use client';

import { Toaster } from 'react-hot-toast';
import '../../../styles/create/LockedContent.css';
import '../../../styles/create/Telegram.css';
import HeaderWrapper from '../../Auth/HeaderWrapper';
import PaperWrapper from '../../Auth/PaperWrapper';
import useCreateTelegram from './useCreateTelegram';

import StepOneCreateTelegram from './StepOneCreateTelegram';
import StepThreeCreateTelegram from './StepThreeCreateTelegram';
import StepTwoCreateTelegram from './StepTwoCreateTelegram';

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
    step,
    user,
    loading,
  } = useCreateTelegram(data);

  return (
    <>
      <div className="lc-container lc-container-animation bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="flex w-full flex-col items-center gap-2">
          <HeaderWrapper
            titleOne={'Create Telegram Community'}
          />
          <PaperWrapper>
            {step === 1 ? (
              <StepOneCreateTelegram
                stepOneForm={stepOneForm}
                onStepOneSubmit={onStepOneSubmit}
                onConnectExisting={onConnectExisting}
                user={user}
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
                loading={loading}
              />
            )}
          </PaperWrapper>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default CreateTelegram;
