import axiosInstance from '@/src/Utils/AxiosInstance';
import { setCurrentUser } from '@/src/Utils/User';
import useGetCurrentUser from '@/src/Utils/useGetCurrentUser';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useCreateLockedContent = () => {
  const [step, setStep] = useState(1);
  const user = useGetCurrentUser();

  const stepOneForm = useForm({
    initialValues: {
      isOtpScreen: -2,
      selectedNumber: null,
      phoneNumber: null,
      sessionString: '',
      otp: '',
      isSaveClickedAtleastOnce: false,
    },
    validateInputOnChange: true,
    validate: {
      phoneNumber: value => {
        return !value || value?.length !== 10
          ? stepOneForm.values.isSaveClickedAtleastOnce &&
            stepOneForm.values.isOtpScreen === 0
            ? 'Enter valid phone number'
            : null
          : null;
      },
      otp: value =>
        !value || value?.length != 5
          ? stepOneForm.values.isSaveClickedAtleastOnce &&
            stepOneForm.values.isOtpScreen === 1 &&
            'Enter valid otp'
          : null,
    },
  });

  const createTelegramForm = useForm({
    initialValues: {
      title: '',
      message: '',
      category: '',
      price: '',
      files: [],
      isSaveClickedAtleastOnce: false,
    },
    validateInputOnChange: true,
    validate: {
      title: value =>
        !value
          ? createTelegramForm.values
              .isClickedAtleastOnce && 'Title is required'
          : null,
      message: value =>
        !value
          ? createTelegramForm.values
              .isClickedAtleastOnce && 'Message is required'
          : null,
      category: value =>
        !value
          ? createTelegramForm.values
              .isClickedAtleastOnce &&
            'Category is required'
          : null,
      price: value =>
        !value
          ? createTelegramForm.values
              .isClickedAtleastOnce && 'Price is reqiuired'
          : value < 20
          ? createTelegramForm.values
              .isClickedAtleastOnce &&
            'Price must be more than 20'
          : null,
    },
  });

  const onStepOneSubmit = async () => {
    if (stepOneForm.values.isOtpScreen === 0) {
      try {
        stepOneForm.setFieldValue('isOtpScreen', -2);
        const data = await axiosInstance.post(
          'http://localhost:6969/api/v1/telegram/send_auth',
          {
            phoneNumber: `91${stepOneForm.values.phoneNumber}`,
          }
        );
        toast.success('Otp sent successfully');
        stepOneForm.setFieldValue(
          'sessionString',
          data.data.data.sessionString
        );
        stepOneForm.setFieldValue('isOtpScreen', 1);
      } catch (error) {
        toast.error('Failed to send otp');
        stepOneForm.setFieldValue('isOtpScreen', 0);
      } finally {
        stepOneForm.setFieldValue(
          'isSaveClickedAtleastOnce',
          false
        );
      }
    } else if (stepOneForm.values.isOtpScreen === 1) {
      try {
        stepOneForm.setFieldValue('isOtpScreen', -2);
        const data = await axiosInstance.post(
          'http://localhost:6969/api/v1/telegram/verify_otp',
          {
            phoneNumber: `91${stepOneForm.values.phoneNumber}`,
            phoneCode: stepOneForm.values.otp,
            sessionString: stepOneForm.values.sessionString,
          }
        );
        toast.success('Otp verified successfully');
        setCurrentUser(data.data.data);
        setStep(2);
      } catch (error) {
        toast.error('Failed to verify otp');
        stepOneForm.setFieldValue('isOtpScreen', 1);
      }
    } else if (stepOneForm.values.isOtpScreen === -1) {
      stepOneForm.setFieldValue('isOtpScreen', 0);
    }
  };

  useEffect(() => {
    if (user) {
      if (!user.telegramIntegrations?.length) {
        stepOneForm.setFieldValue('isOtpScreen', 0);
      } else {
        stepOneForm.setFieldValue('isOtpScreen', -1);
      }
    }
  }, [user]);

  // console.log(user);
  return {
    step,
    user,
    createTelegramForm,
    stepOneForm,
    onStepOneSubmit,
  };
};

export default useCreateLockedContent;
