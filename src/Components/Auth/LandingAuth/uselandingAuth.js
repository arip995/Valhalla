import axiosInstance from '@/Utils/AxiosInstance';
import { convertFullNameToFirstNameLastName } from '@/Utils/Common';
import useUser from '@/Utils/Hooks/useUser';
import { validateEmail } from '@/Utils/Regex';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const uselandingAuth = (
  signin,
  onAuthComplete,
  opened,
  isEmailRequired,
  isNameRequired
) => {
  const [isSignin, setIsSignin] = useState(signin);
  const { setCurrentUser } = useUser();
  const [step, setStep] = useState(1);
  const [otpRefId, setOtpRefId] = useState(null);
  const [isEmail, setIsEmail] = useState(false);
  const [loading, setLoading] = useState(0);
  const authForm = useForm({
    initialValues: {
      email: '',
      phoneNumber: '',
      name: '',
      isClickedAtleastOnce: false,
    },
    validateInputOnChange: true,
    validate: values => {
      const errors = {};
      if (values.isClickedAtleastOnce) {
        if (isSignin) {
          if (
            values.phoneNumber?.toString()?.length != 10
          ) {
            errors.phoneNumber = 'Invalid phone number';
          }
        } else {
          if (
            isEmailRequired &&
            !validateEmail(values.email)
          ) {
            errors.email = 'Invalid email';
          }
          if (
            values.phoneNumber?.toString()?.length != 10
          ) {
            errors.phoneNumber = 'Invalid phone number';
          }
          if (
            isNameRequired &&
            !values.name?.trim()?.length
          ) {
            errors.name = 'Name is required';
          }
        }
      }
      return errors;
    },
  });
  const otpForm = useForm({
    initialValue: { otp: '', isClickedAtleastOnce: false },
    validateInputOnChange: true,
    validate: values => ({
      otp:
        values.isClickedAtleastOnce &&
        (values?.otp?.length != 5 || !values?.otp)
          ? 'Value is too short'
          : null,
    }),
  });

  const reset = () => {
    setIsSignin(signin);
    setStep(1);
    setIsEmail(false);
    setLoading(0);
    authForm.reset();
    otpForm.reset();
  };

  const sendOtp = async () => {
    try {
      setLoading(1);
      const { data } = await axiosInstance.post(
        `/auth/send_otp`,
        {
          email: authForm.values.email,
          phoneNumber: authForm.values.phoneNumber,
          isSignUp: !isSignin,
          isAuth: true,
        }
      );
      setOtpRefId(data?.data?._id);
      if (step === 1) {
        setStep(2);
      }
      toast.success('Otp sent successfully!');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(0);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(2);
      const { firstName, lastName } =
        convertFullNameToFirstNameLastName(
          authForm.values.name
        );

      const data = await axiosInstance.post(
        `/auth/verify_otp`,
        {
          email: authForm.values.email,
          phoneNumber: authForm.values.phoneNumber,
          otp: otpForm.values.otp,
          firstName,
          lastName,
          isCreator: false,
          refId: otpRefId,
          isSignUp: !isSignin,
          ...(!isSignin ? { isCreator: false } : {}),
        },
        {
          withCredentials: true,
        }
      );
      if (data?.data?.data?.user?._id) {
        toast.success(`Signed in successfully`);
        setCurrentUser(data.data.data.user);
        onAuthComplete();
      }
    } catch (error) {
      setLoading(0);
      toast.error(
        error.response.data.message ||
          'No internet connection'
      );
    } finally {
      setLoading(0);
    }
  };

  useEffect(() => {
    if (!opened) {
      reset();
    }
  }, [opened]);

  return {
    isSignin,
    setIsSignin,
    step,
    setStep,
    isEmail,
    setIsEmail,
    authForm,
    otpForm,
    sendOtp,
    verifyOtp,
    loading,
  };
};

export default uselandingAuth;
