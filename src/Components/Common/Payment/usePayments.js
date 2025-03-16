import { paymentHandlers } from '@/Components/Common/Payment/PaymentProvider';
import axiosInstance from '@/Utils/AxiosInstance';
import {
  checkIfPurchased,
  getUserId,
  isDevEnv,
} from '@/Utils/Common';
import useUser from '@/Utils/Hooks/useUser';
import {
  usePathname,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { pollOrderStatus } from './PollOrderStatus';

const usePayment = (
  onSuccess = () => {},
  onFailure = () => {},
  paymentProvider = isDevEnv()
    ? 'cf'
    : getUserId() === '67d14f4a21ff0f489e7bdceb'
      ? 'pp'
      : 'cf'
) => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const pathnameParts = usePathname().split('/');
  const productType = pathnameParts[1];
  const productId = pathnameParts[2];
  const [paymentState, setPaymentState] = useState({
    payinLoading: false,
    paymentDone: false,
    loading: false,
  });
  // const [coupon, setCoupon] = useState(null);
  const isPreview =
    usePathname().split('/')[1] === 'dashboard';
  const [purchased, setPurchased] = useState(false);

  const callBackHandler = isSuccessful => {
    if (isSuccessful) {
      setPaymentState(prev => ({
        ...prev,
        loading: true,
      }));
      pollOrderStatus(
        productId,
        user?._id,
        setPaymentState,
        onSuccess,
        onFailure
      );
    }
  };

  const openPaymentModal = async () => {
    if (paymentHandlers[paymentProvider]) {
      await paymentHandlers[paymentProvider](
        paymentState,
        user?.email,
        user?.phoneNumber,
        callBackHandler,
        setPaymentState
      );
    }
  };

  const onCreateOrder = async (
    amount = 1,
    creatorId,
    creatorDetails,
    bookingData,
    isCouponApplied,
    couponDetails
  ) => {
    if (isPreview) return;
    setPaymentState(prev => ({
      ...prev,
      payinLoading: true,
    }));
    const subscription =
      productType === 'tg'
        ? { ...bookingData.subscription }
        : {};
    const newBookingData = { ...bookingData };
    if (productType === 'tg') {
      delete newBookingData.subscription;
    }
    try {
      const { data } = await axiosInstance.post(
        '/payment/create_order',
        {
          userId: user?._id,
          productId,
          creatorId,
          creatorDetails,
          productType,
          paymentProvider,
          amount,
          subscription,
          isCouponApplied,
          couponDetails,
          bookingData: {
            ...newBookingData,
            query: {
              referrer: document.referrer,
              ...Object.fromEntries(
                searchParams.entries() || {}
              ),
            },
          },
        }
      );
      if (data.ok) {
        setPaymentState(prev => ({
          ...prev,
          ...data.data,
        }));
      } else {
        toast.error('Order creation failed');
      }
    } catch (error) {
      console.error(error);
      toast.error(
        'Error creating order, Please logout and login again'
      );
    } finally {
      setPaymentState(prev => ({
        ...prev,
        payinLoading: false,
      }));
    }
  };

  const checkOnLoad = async () => {
    if (isPreview || productType !== 'course') return;
    setPurchased(
      await checkIfPurchased(productId, getUserId())
    );
  };

  useEffect(() => {
    if (
      paymentState.payment_session_id ||
      paymentState.id ||
      paymentState.checkoutPageUrl
    ) {
      openPaymentModal();
    }
  }, [
    paymentState.payment_session_id,
    paymentState.id,
    paymentState.checkoutPageUrl,
  ]);

  useEffect(() => {
    checkOnLoad();
  }, []);

  return {
    onCreateOrder,
    paymentState,
    purchased,
  };
};

export default usePayment;
