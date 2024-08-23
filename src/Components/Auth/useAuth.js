import { setUserData } from '@/Utils/getuserData';
import useUser from '@/Utils/Hooks/useUser';
import { validateEmail } from '@/Utils/Regex';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useAuth = () => {
  const { user } = useUser();
  const pathname = usePathname().substring(1);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
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
          ? value?.toString()?.length != 10
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
        isClickedAtleastOnce &&
        (value?.length != 5 || !value)
          ? 'Value is too short'
          : null,
    },
  });

  const handleSubmit = async resendOtp => {
    if (resendOtp === 'resend') {
      sendOtp();
      return;
    }
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
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/send_otp`,
        {
          [emailOrPhoneNumber === 'email'
            ? 'email'
            : 'phoneNumber']:
            emailOrPhoneNumber === 'email'
              ? authForm.values.email
              : authForm.values.phoneNumber,
          isSignUp: pathname === 'signup' ? true : false,
          isAuth: true,
        }
      );
      if (!showOtp) {
        toggleShowOtp();
      }
      toast.success('Otp sent successfully!');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
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
          isSignUp: pathname === 'signup' ? true : false,
        },
        {
          withCredentials: true,
        }
      );
      if (data?.data?.data?.user) {
        toast.success('Signed in successfully');
        setUserData(data.data.data.user);
      }
      if (data?.data?.data?.user.username) {
        setTimeout(() => {
          router.push('/home');
        }, 3000);
      } else {
        setStep(2);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 100000);
    }
  };

  useEffect(() => {
    if (user.isCreator && !user?.username) {
      setStep(2);
    }
  }, [user]);

  return {
    step,
    pathname,
    emailOrPhoneNumber,
    toggleEmailOrPhoneNumber,
    showOtp,
    toggleShowOtp,
    setIsClickedAtleastOnce,
    otpForm,
    handleSubmit,
    authForm,
    loading,
  };
};

export default useAuth;
