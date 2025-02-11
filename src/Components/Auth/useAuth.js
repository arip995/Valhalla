import { setUserData } from '@/Utils/getuserData';
import useUser from '@/Utils/Hooks/useUser';
import { validateEmail } from '@/Utils/Regex';
import { useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import axios from 'axios';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useSignin = () => {
  const { user } = useUser(true);
  const pathname = usePathname().substring(1);
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otpRefId, setOtpRefId] = useState(null);
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
      const { data } = await axios.post(
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
      setOtpRefId(data?.data?._id);
      if (!showOtp) {
        toggleShowOtp();
      }
      toast.success('Otp sent successfully!');
    } catch (error) {
      console.log(error);
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
          refId: otpRefId,
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
          router.replace('/home');
        }, 3000);
      } else if (!data?.data?.data?.user.isCreator) {
        setTimeout(() => {
          router.replace('/purchase');
        }, 3000);
      } else {
        location.reload();
        setTimeout(() => {
          router.replace('/onboarding');
        }, 3000);
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
    if (user?.isCreator && !user?.username) {
      router.replace('/onboarding');
    }
  }, [user?._id]);

  useEffect(() => {
    router.prefetch('/onboarding');
    router.prefetch('/signin');
    router.prefetch('/signup');
  }, [router]);

  useEffect(() => {
    if (params.get('success') === 'false') {
      setTimeout(() => {
        toast.error(`failed to ${pathname}`);
      }, 2000);
      router.replace(`/${pathname}`);
      return;
    } else if (params.get('success') === 'true') {
      setTimeout(() => {
        toast.success(`Signed in successfully`);
      }, 2000);
      router.replace(`/${pathname}`);
      return;
    }
    if (pathname === 'signin') {
      if (params.get('createaccount') === 'true') {
        setTimeout(() => {
          toast.error(`Create a account first.`);
        }, 2000);
        router.replace(`/${pathname}`);
      }
      return;
    } else {
      if (params.get('signin') === 'true') {
        setTimeout(() => {
          toast.error(`Already have an account. Signin.`);
        }, 2000);
        router.replace(`/${pathname}`);
      }
    }
  }, []);

  return {
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

export default useSignin;
