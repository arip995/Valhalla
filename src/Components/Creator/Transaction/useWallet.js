// useWallet.js
import { useEffect, useState } from 'react';
import axiosInstance from '@/Utils/AxiosInstance';
import toast from 'react-hot-toast';
import { useForm } from '@mantine/form';
import useUser from '@/Utils/Hooks/useUser';

const useWallet = () => {
  const [walletDetails, setWalletDetails] = useState(null);
  const { user, fetchUserData } = useUser();
  const [loading, setLoading] = useState(-1);
  const [activePayoutRequest, setActivePayoutRequest] =
    useState(null);
  const [payoutList, setPayoutList] = useState(null);
  const [opened, setOpened] = useState(null);
  const [openedBankDetails, setOpenedBankDetails] =
    useState(null);
  const [payoutError, setPayoutError] = useState(null);
  const form = useForm({
    initialValues: {
      withdrawAmount: '',
      bankAccount: '{}',
    },
    validate: {
      withdrawAmount: value => {
        console.log(value);
        if (!value || value < 1000 || value > 499999)
          return 'Amount must range from 1000 to 499999';
        if (value > walletDetails?.withdrawableBalance)
          return 'Amount exceeds available balance';
        return null;
      },
      bankAccount: value => {
        value = JSON.parse(value || '{}');
        if (!value?.beneficiaryId)
          return 'Select a bank account';
        return null;
      },
    },
    transformValues: values => ({
      amount: Number(values.withdrawAmount),
      bankAccount: JSON.parse(values.bankAccount || '{}'),
    }),
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

  const requestPayout = async values => {
    setLoading(1);
    setPayoutError(null);
    try {
      const { data } = await axiosInstance.post(
        '/payment/request_payout',
        values
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
    await requestPayout(values);
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
    openedBankDetails,
    setOpenedBankDetails,
    user,
    fetchUserData,
  };
};

export default useWallet;
