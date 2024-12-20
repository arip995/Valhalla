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
  const [opened, setOpened] = useState(null);
  const [payoutError, setPayoutError] = useState(null);
  const form = useForm({
    initialValues: {
      withdrawAmount: '',
    },
    validate: {
      withdrawAmount: value => {
        if (!value || value < 10)
          return 'Amount must be greater than 10';
        if (value > walletDetails?.withdrawableBalance)
          return 'Amount exceeds available balance';
        return null;
      },
    },
  });

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
      await fetchWalletDetails();
      form.reset();
      toast.success(
        data?.message || 'Payout initiated successfully'
      );
    } catch (error) {
      setPayoutError(
        error.response?.data?.message ||
          'Failed to process payout request'
      );
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(0);
    }
  };

  const handleWithdraw = async values => {
    await requestPayout(values.withdrawAmount);
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
    opened,
    setOpened,
  };
};

export default useWallet;
