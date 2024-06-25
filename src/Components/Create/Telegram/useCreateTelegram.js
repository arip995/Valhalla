import axiosInstance from '@/Utils/AxiosInstance';
import { setCurrentUser } from '@/Utils/User';
import useGetCurrentUser from '@/Utils/useGetCurrentUser';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const periodTypeOptions = [
  { label: 'Days', value: 'Daily', days: 1 },
  { label: 'Weeks', value: 'Weekly', days: 7 },
  { label: 'Months', value: 'Monthly', days: 30 },
  { label: 'Years', value: 'Yearly', days: 365 },
  { label: 'Lifetime', value: 'Lifetime', days: 36500 },
];

export const PriceTypes = [
  {
    heading: 'Fixed Price',
    text: 'Charge a one-time fixed pay',
    value: 'Lifetime',
  },
  {
    heading: 'Subscription',
    text: 'Charge weekly, monthly, annually',
    value: 'Subscription',
  },
];

const useCreateLockedContent = () => {
  const [step, setStep] = useState(1);
  const [existingGroups, setExistingGroups] =
    useState(false);
  const [isSendingOldNumberOtp, setIsSendingOldNumberOtp] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useGetCurrentUser();
  const router = useRouter();

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
      isOldOrNewChannel: 'new',
      superGroup: false,
      isSaveClickedAtleastOnce: false,
    },
    validateInputOnChange: true,

    validate: {
      channelName: value =>
        !value &&
        stepTwoForm.values.isOldOrNewChannel === 'new' &&
        stepTwoForm.values.isSaveClickedAtleastOnce
          ? 'Enter a channel name'
          : null,
      groupId: value =>
        !value &&
        stepTwoForm.values.isOldOrNewChannel === 'old' &&
        stepTwoForm.values.isSaveClickedAtleastOnce
          ? 'Select a channel'
          : null,
    },
  });

  const stepThreeForm = useForm({
    initialValues: {
      title: '',
      description: '',
      subscriptionPlans: [],
      isSaveClickedAtleastOnce: false,
      genre: '',
    },
    validateInputOnChange: true,
    validate: {
      title: (value, values) => {
        return values?.isSaveClickedAtleastOnce && !value
          ? 'Title is required'
          : null;
      },
      subscriptionPlans: (value, values) => {
        if (!values?.isSaveClickedAtleastOnce) return null;
        if (value?.length) {
          for (let plan of value) {
            if (plan.editing) {
              return 'You have unsaved plans, please save your changes';
            } else if (!plan.subscriptionCost) {
              return 'Please provide a cost for your plan';
            } else if (!plan.subscriptionPeriodLabel) {
              return 'Please provide a subscription type';
            } else if (
              !plan.subscriptionPeriodValue ||
              !plan.subscriptionPeriodLabel
            ) {
              return 'Please provide a subscription period';
            } else if (!plan.planTitle) {
              return 'Please provide a title for your plan';
            }
          }
        } else {
          return 'Please add a plan';
        }
      },
      genre: (value, values) => {
        return values?.isSaveClickedAtleastOnce && !value
          ? 'Category is required'
          : null;
      },
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

  const formatPlans = (plans = []) => {
    const formattedPlans = [];

    plans.forEach(val => {
      const selectedPeriod = periodTypeOptions.find(
        per => per.label == val.subscriptionPeriodLabel
      );
      const days =
        Number(selectedPeriod?.days || 0) *
        Number(val.subscriptionPeriodValue);

      const subscriptionPeriod = val?.planTitle;
      const cost = val?.subscriptionCost;
      if (days && subscriptionPeriod && cost)
        formattedPlans.push({
          days,
          subscriptionPeriod,
          cost,
          periodQuantity: val.subscriptionPeriodValue,
          planType: selectedPeriod.value,
        });
    });

    return formattedPlans;
  };

  const sendOtp = async phoneNumber => {
    try {
      const data = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/telegram/send_auth`,
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/telegram/verify_otp`,
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/telegram/get_existing_groups`,
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/telegram/validate_session`,
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

  const onStepTwoSubmit = async () => {
    setStep(3);
  };
  const onStepThreeSubmit = async () => {
    setLoading(true);
    const payload = {
      groupName: stepTwoForm.values?.channelName,
      groupDescription:
        stepThreeForm.values?.description || '',
      phoneNumber: stepOneForm.values.phoneNumber
        ? `91${stepOneForm.values.phoneNumber}`
        : stepOneForm.values?.selectedNumber,
      subscriptionPlans: formatPlans(
        stepThreeForm.values?.subscriptionPlans
      ),
      groupId: stepTwoForm.values?.groupId,
      superGroup: stepTwoForm.values?.superGroup,
      genre: stepThreeForm.values?.genre,
      title: stepThreeForm.values?.title,
    };
    try {
      const data = await axiosInstance.post(
        '/telegram/create_new',
        payload
      );
      console.log(data.data);
      router.push(`/tg/${data.data?.data?.channelId}`);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

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
    existingGroups,
    onConnectExisting,
    stepOneForm,
    stepTwoForm,
    stepThreeForm,
    onStepOneSubmit,
    onStepTwoSubmit,
    onStepThreeSubmit,
    loading,
  };
};

export default useCreateLockedContent;
