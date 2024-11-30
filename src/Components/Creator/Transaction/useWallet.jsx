// useWallet.js
import { useEffect, useState } from 'react';
import axiosInstance from '@/Utils/AxiosInstance';
import toast from 'react-hot-toast';
import { useForm } from '@mantine/form';

const useWallet = () => {
  const [walletDetails, setWalletDetails] = useState(null);
  const [loading, setLoading] = useState(-1);
  const [activePayoutRequest, setActivePayoutRequest] =
    useState(null);
  const [payoutList, setPayoutList] = useState(null);
  const [payoutError, setPayoutError] = useState(null);
  const form = useForm({
    initialValues: {
      withdrawAmount: '',
    },
    validate: {
      withdrawAmount: value => {
        if (!value || value <= 0)
          return 'Amount must be greater than 0';
        if (value > walletDetails?.withdrawableBalance)
          return 'Amount exceeds available balance';
        return null;
      },
    },
  });

  const handleWithdraw = async values => {
    const response = await requestPayout(
      values.withdrawAmount
    );
    if (response?.success) {
      form.reset();
    }
  };

  const fetchWalletDetails = async () => {
    try {
      const { data } = await axiosInstance.get(
        '/payment/get_wallet_details'
      );
      setWalletDetails(data.data);
      setActivePayoutRequest(data.data.payoutDetails);
      setPayoutList(data.data.payoutList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(0);
    }
  };

  const requestPayout = async amount => {
    setLoading(1);
    setPayoutError(null);
    try {
      const { data } = await axiosInstance.post(
        '/payment/request_payout',
        {
          amount: Number(amount),
        }
      );
      fetchWalletDetails();
      toast.success(
        data?.message || 'Payout initiated successfully'
      );
      return { success: true, message: data.message };
    } catch (error) {
      setPayoutError(
        error.response?.data?.message ||
          'Failed to process payout request'
      );
      return {
        success: false,
        message: error.response?.data?.message,
      };
    } finally {
      setLoading(0);
    }
  };

  const cancelPayout = async transferId => {
    try {
      setLoading(1);
      const { data } = await axiosInstance.post(
        '/payment/cancel_payout',
        {
          transferId,
        }
      );
      setActivePayoutRequest(null);
      fetchWalletDetails();
      toast.success(
        data?.message || 'Payout cancelled successfully'
      );
      return { success: true, message: data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message,
      };
    } finally {
      setLoading(0);
    }
  };

  useEffect(() => {
    fetchWalletDetails();
  }, []);

  return {
    walletDetails,
    loading,
    requestPayout,
    cancelPayout,
    payoutError,
    payoutList,
    activePayoutRequest,
    handleWithdraw,
    form,
  };
};

export default useWallet;
