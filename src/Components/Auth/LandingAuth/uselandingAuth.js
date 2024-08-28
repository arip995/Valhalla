import axiosInstance from '@/Utils/AxiosInstance';
import { convertFullNameToFirstNameLastName } from '@/Utils/Common';
import useUser from '@/Utils/Hooks/useUser';
import { validateEmail } from '@/Utils/Regex';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const uselandingAuth = (signin, onAuthComplete, opened) => {
  const [isSignin, setIsSignin] = useState(signin);
  const { setCurrentUser } = useUser();
  const [step, setStep] = useState(1);
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
    validate: values => ({
      name:
        values.isClickedAtleastOnce &&
        !isSignin &&
        !values.name
          ? 'Name is required'
          : values.name.length > 60
            ? !isSignin &&
              'Name should be less than 60 characters'
            : null,
      email: isEmail
        ? !validateEmail(values?.email)
          ? values.isClickedAtleastOnce && 'Invalid email'
          : null
        : null,
      phoneNumber: !isEmail
        ? values?.phoneNumber?.toString()?.length != 10
          ? values.isClickedAtleastOnce &&
            'Invalid phone number'
          : null
        : null,
    }),
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
      await axiosInstance.post(`/auth/send_otp`, {
        [isEmail ? 'email' : 'phoneNumber']: isEmail
          ? authForm.values.email
          : authForm.values.phoneNumber,
        isSignUp: !isSignin,
        isAuth: true,
      });
      if (step === 1) {
        setStep(2);
      }
      // toast.success('Otp sent successfully!');
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
          [isEmail ? 'email' : 'phoneNumber']: isEmail
            ? authForm.values.email
            : authForm.values.phoneNumber,
          otp: otpForm.values.otp,
          firstName,
          lastName,
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
