import { validateEmail } from '@/Utils/Regex';
import useGetCurrentUser from '@/Utils/useGetCurrentUser';
import useIsBrowser from '@/Utils/useIsBrowser';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const useAuth = ({ tabName }) => {
  const isBrowser = useIsBrowser();
  const { user } = useGetCurrentUser();
  const typeArray =
    tabName === 'login'
      ? ['login', 'register']
      : ['register', 'login'];
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loginOrRegister, toggleLoginOrRegister] =
    useToggle(typeArray);
  const [emailOrPhoneNumber, toggleEmailOrPhoneNumber] =
    useToggle(['phoneNumber', 'email']);
  const [showOtp, toggleShowOtp] = useToggle([false, true]);
  const [isClickedAtleastOnce, setIsClickedAtleastOnce] =
    useState(null);

  const authForm = useForm({
    initialValues: {
      email: '',
      phoneNumber: '',
    },
    validateInputOnChange: true,
    validate: {
      email: value =>
        emailOrPhoneNumber === 'email'
          ? !validateEmail(value)
            ? isClickedAtleastOnce && 'Invalid email'
            : null
          : null,
      phoneNumber: value =>
        emailOrPhoneNumber === 'phoneNumber'
          ? value.length != 10
            ? isClickedAtleastOnce && 'Invalid phone number'
            : null
          : null,
    },
  });
  const otpForm = useForm({
    initialValue: { otp: '' },
    validateInputOnChange: true,
    validate: {
      otp: value =>
        value?.length != 5 || !value
          ? 'Value is too short'
          : null,
    },
  });

  const handleSubmit = () => {
    if (!showOtp) {
      setIsClickedAtleastOnce(false);
      sendOtp();
      return;
    } else {
      verifyOtp();
    }
  };

  const sendOtp = async () => {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/send_otp`,
        {
          [emailOrPhoneNumber === 'email'
            ? 'email'
            : 'phoneNumber']:
            emailOrPhoneNumber === 'email'
              ? authForm.values.email
              : authForm.values.phoneNumber,
          isSignUp:
            loginOrRegister === 'register' ? true : false,
        }
      );
      toggleShowOtp();
      toast.success('Otp sent successfully!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify_otp`,
        {
          [emailOrPhoneNumber === 'email'
            ? 'email'
            : 'phoneNumber']:
            emailOrPhoneNumber === 'email'
              ? authForm.values.email
              : authForm.values.phoneNumber,
          otp: otpForm.values.otp,
          isSignUp:
            loginOrRegister === 'register' ? true : false,
        },
        {
          withCredentials: true,
        }
      );
      if (data?.data?.data?.user) {
        localStorage.setItem(
          'user',
          JSON.stringify(data.data.data.user)
        );
        // localStorage.setItem(
        //   'accesstoken',
        //   JSON.stringify(data.data.data.accesstoken)
        // );
      }
      toast.success('Signed in successfully');
      if (data?.data?.data?.user.currentUsername) {
        setTimeout(() => {
          router.push('/creator/home');
        }, 3000);
      } else {
        setStep(2);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user?.currentUsername) {
      router.push('/creator/home');
    } else if (user?._id) {
      setStep(2);
    }
  }, [router?.isReady]);

  return {
    step,
    loginOrRegister,
    toggleLoginOrRegister,
    emailOrPhoneNumber,
    toggleEmailOrPhoneNumber,
    showOtp,
    toggleShowOtp,
    setIsClickedAtleastOnce,
    otpForm,
    handleSubmit,
    authForm,
  };
};

export default useAuth;
