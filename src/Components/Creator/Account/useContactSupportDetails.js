import axiosInstance from '@/src/Utils/AxiosInstance';
import { validateEmail } from '@/src/Utils/Regex';
import { setCurrentUser } from '@/src/Utils/User';
import useGetCurrentUser from '@/src/Utils/useGetCurrentUser';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useContactSupportDetails = () => {
  const { user, fetchUserData } = useGetCurrentUser();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [supportPhoneNumber, setSupportPhoneNumber] =
    useState(null);
  const [email, setEmail] = useState(null);
  const [supportEmail, setSupportEmail] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [editEntity, setEditEntity] = useState(false);
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [otp, setOtp] = useState('');

  const onClickEdit = type => {
    setEditEntity(type);
    open();
  };
  const setPreviousData = () => {
    if (user?._id) {
      setPhoneNumber(user?.phoneNumber || '');
      setSupportPhoneNumber(user?.supportPhoneNumber || '');
      setEmail(user?.email || '');
      setSupportEmail(user?.supportEmail || '');
    }
  };
  const onSendOtp = async () => {
    if (editEntity === 'email') {
      if (!email || !validateEmail(email)) {
        toast.error('Enter a valid email');
        return;
      }
    } else if (editEntity === 'supportEmail') {
      if (!supportEmail || !validateEmail(email)) {
        toast.error('Enter a valid email');
        return;
      }
    } else if (editEntity === 'phoneNumber') {
      if (!phoneNumber || phoneNumber?.length != 10) {
        toast.error('Enter a valid phone number');
        return;
      }
    } else if (editEntity === 'supportPhoneNumber') {
      if (
        !supportPhoneNumber ||
        supportPhoneNumber?.length != 10
      ) {
        toast.error('Enter a valid phone number');
        return;
      }
    }
    try {
      const data = await axios.post(
        'http://localhost:6969/api/v1/auth/send_otp',
        {
          email:
            editEntity === 'email' ? email : supportEmail,
          phoneNumber:
            editEntity === 'phoneNumber'
              ? phoneNumber
              : supportPhoneNumber,
          isSignUp: true,
        }
      );
      toast.success('Otp sent successfully');
      setIsOtpScreen(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || '');
    }
  };
  const onVerifyOtp = async () => {
    try {
      let payload = {
        email:
          editEntity === 'email'
            ? email
            : editEntity === 'supportEmail'
            ? supportEmail
            : '',
        phoneNumber:
          editEntity === 'phoneNumber'
            ? phoneNumber
            : editEntity === 'supportPhoneNumber'
            ? supportPhoneNumber
            : '',
        updateEntity: editEntity,
        otp: otp,
      };
      const data = await axiosInstance.post(
        'http://localhost:6969/api/v1/auth/update_verify_otp',
        payload
      );
      setCurrentUser(data.data.data);
      toast.success('Updated successfully');
      close();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || '');
    }
  };

  useEffect(() => {
    if (!opened) {
      setIsOtpScreen(false);
      setOtp('');
      setEditEntity('');
      setPreviousData();
      fetchUserData();
    }
  }, [opened]);
  useEffect(() => {
    setPreviousData();
  }, [user]);

  return {
    phoneNumber,
    setPhoneNumber,
    supportPhoneNumber,
    setSupportPhoneNumber,
    email,
    setEmail,
    supportEmail,
    setSupportEmail,
    opened,
    open,
    close,
    editEntity,
    setEditEntity,
    onClickEdit,
    isOtpScreen,
    setIsOtpScreen,
    onSendOtp,
    otp,
    setOtp,
    onVerifyOtp,
  };
};

export default useContactSupportDetails;
