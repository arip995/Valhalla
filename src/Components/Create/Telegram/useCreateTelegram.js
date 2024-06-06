import axiosInstance from '@/src/Utils/AxiosInstance';
import { setCurrentUser } from '@/src/Utils/User';
import useGetCurrentUser from '@/src/Utils/useGetCurrentUser';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useCreateLockedContent = () => {
  const [step, setStep] = useState(1);
  const [existingGroups, setExistingGroups] =
    useState(false);
  const [isSendingOldNumberOtp, setIsSendingOldNumberOtp] =
    useState(false);
  const { user } = useGetCurrentUser();

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

  const stepTwoForm = useForm({
    initialValues: {
      channelName: '',
      groupId: '',
      isNewChannel: 'new',
      isSaveClickedAtleastOnce: false,
    },
    validateInputOnChange: true,

    validate: {
      channelName: value =>
        !value &&
        stepTwoForm.values.isNewChannel === 'new' &&
        stepTwoForm.values.isSaveClickedAtleastOnce
          ? 'Enter a channel name'
          : null,
      groupId: value =>
        !value &&
        stepTwoForm.values.isNewChannel === 'old' &&
        stepTwoForm.values.isSaveClickedAtleastOnce
          ? 'Select a channel'
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

  const sendOtp = async phoneNumber => {
    try {
      const data = await axiosInstance.post(
        'http://localhost:6969/api/v1/telegram/send_auth',
        {
          phoneNumber,
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
  };

  const verifyOtp = async (
    phoneCode,
    phoneNumber,
    sessionString
  ) => {
    try {
      const data = await axiosInstance.post(
        'http://localhost:6969/api/v1/telegram/verify_otp',
        {
          phoneNumber,
          phoneCode,
          sessionString,
        }
      );
      toast.success('Otp verified successfully');
      setCurrentUser(data.data.data);
      setStep(2);
      await getExistingGroups(phoneNumber);
      return data;
    } catch (error) {
      toast.error('Failed to verify otp');
      stepOneForm.setFieldValue('isOtpScreen', 1);
    }
  };

  const getExistingGroups = async phoneNumber => {
    const existingGroups = await axiosInstance.post(
      'http://localhost:6969/api/v1/telegram/get_existing_groups',
      {
        phoneNumber: `${phoneNumber}`,
      }
    );
    let arr = [];
    if (existingGroups?.data?.data?.result?.length) {
      arr = existingGroups?.data?.data?.result.map(item => {
        return {
          value: item.id,
          superGroup: item.superGroup,
          label: item.name,
        };
      });
    }
    setExistingGroups(arr);
  };

  const onConnectExisting = async () => {
    stepOneForm.setFieldValue('isOtpScreen', -2);
    try {
      const data = await axiosInstance.post(
        'http://localhost:6969/api/v1/telegram/validate_session',
        {
          phoneNumber: `${stepOneForm.values.selectedNumber}`,
        }
      );
      await getExistingGroups(
        stepOneForm.values.selectedNumber
      );
      if (!data.data.data.success) {
        await sendOtp(stepOneForm.values.selectedNumber);
      } else {
        setStep(2);
      }
    } catch (error) {
      setIsSendingOldNumberOtp(true);
      await sendOtp(stepOneForm.values.selectedNumber);
      // stepOneForm.setFieldValue('isOtpScreen', 1);
      // toast.success('Otp sent successfully');
    }
  };

  const onStepOneSubmit = async () => {
    if (stepOneForm.values.isOtpScreen === 0) {
      stepOneForm.setFieldValue('isOtpScreen', -2);
      await sendOtp(`91${stepOneForm.values.phoneNumber}`);
    } else if (stepOneForm.values.isOtpScreen === 1) {
      stepOneForm.setFieldValue('isOtpScreen', -2);
      await verifyOtp(
        stepOneForm.values.otp,
        isSendingOldNumberOtp
          ? stepOneForm.values.selectedNumber
          : `91${stepOneForm.values.phoneNumber}`,
        stepOneForm.values.sessionString
      );
    } else if (stepOneForm.values.isOtpScreen === -1) {
      stepOneForm.setFieldValue('isOtpScreen', 0);
    }
  };

  const onStepTwoSubmit = async () => {};

  useEffect(() => {
    if (stepOneForm?.values?.isOtpScreen === 0) {
      setIsSendingOldNumberOtp(false);
    }
  }, [stepOneForm?.values?.isOtpScreen]);
  useEffect(() => {
    if (user) {
      if (!user.telegramIntegrations?.length) {
        stepOneForm.setFieldValue('isOtpScreen', 0);
      } else {
        stepOneForm.setFieldValue('isOtpScreen', -1);
      }
    }
  }, [user]);

  return {
    step,
    user,
    createTelegramForm,
    stepOneForm,
    stepTwoForm,
    existingGroups,
    onStepOneSubmit,
    onConnectExisting,
    onStepTwoSubmit,
  };
};

export default useCreateLockedContent;
