import axiosInstance from '@/Utils/AxiosInstance';
import { isDevEnv } from '@/Utils/Common';
import useUser from '@/Utils/Hooks/useUser';
import { load } from '@cashfreepayments/cashfree-js';
import {
  usePathname,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const MAX_ATTEMPTS = 3;
const POLL_INTERVAL = 5000; // 5 seconds

const usePayment = (
  onSuccess = () => {},
  onFailure = () => {},
  payInPayload,
  paymentProvider = 'cashfree'
) => {
  const { user } = useUser();
  const productId = usePathname().split('/')[2];
  const productType = usePathname().split('/')[1];
  const searchParams = useSearchParams();
  const [paymentState, setPaymentState] = useState({
    payinLoading: false,
    paymentSessionId: null,
    orderId: null,
    paymentDone: false,
    loading: false,
    paymentCompleted: false,
    purchaseSuccessful: false,
  });

  const callBackHandler = isSuccessful => {
    setTimeout(() => {
      if (isSuccessful) {
        toast.success('Payment made successfully', {
          position: 'top-center',
        });
        onSuccess(true);
      } else {
        toast.error(
          'There was a problem. If your payment was deducted, it will be resolved within 24 hours.',
          {
            position: 'top-center',
            duration: 10000,
          }
        );
      }
    }, 100);
  };

  const pollOrderStatus = ({
    // sessionId,
    onPollSuccess,
    onPollFailure,
  }) => {
    let attemptCount = 0;

    const timer = setInterval(async () => {
      if (attemptCount >= MAX_ATTEMPTS) {
        clearInterval(timer);
        onPollFailure('Maximum polling attempts reached.');
        return;
      }

      try {
        const { data } = await axiosInstance.post(
          '/purchase/details',
          { productId, userId: user._id }
        );
        if (data?.ok) {
          clearInterval(timer);
          onPollSuccess();
        } else {
          attemptCount += 1;
        }
      } catch (error) {
        clearInterval(timer);
        onPollFailure(error);
      }
    }, POLL_INTERVAL);
  };

  const openPaymentModal = async () => {
    switch (paymentProvider) {
      case 'cashfree':
        var cashfree = await load({
          mode: isDevEnv() ? 'sandbox' : 'sandbox',
        });
        var checkoutOptions = {
          paymentSessionId: paymentState.paymentSessionId,
          redirectTarget: '_modal',
        };

        cashfree.checkout(checkoutOptions).then(result => {
          if (result.error) {
            onFailure();
            return;
          }

          setPaymentState(prev => ({
            ...prev,
            loading: true,
            paymentCompleted: true,
          }));

          pollOrderStatus({
            sessionId: paymentState.paymentSessionId,
            onPollSuccess: () => {
              setTimeout(() => {
                setPaymentState(prev => ({
                  ...prev,
                  loading: false,
                }));
                callBackHandler(true);
              }, 3500);
              setPaymentState(prev => ({
                ...prev,
                paymentDone: true,
                purchaseSuccessful: true,
              }));
            },
            onPollFailure: error => {
              setPaymentState(prev => ({
                ...prev,
                loading: false,
                paymentDone: false,
              }));
              callBackHandler(false);
              console.error(error);
            },
          });
        });
        break;

      case 'razorpay':
        // Handle Razorpay implementation here
        break;

      default:
        break;
    }
  };

  const onCreateOrder = async (amount = 1) => {
    if (!amount) return;

    setPaymentState(prev => ({
      ...prev,
      payinLoading: true,
    }));

    try {
      const { data } = await axiosInstance.post(
        '/payment/create_order',
        {
          user,
          productId,
          productType,
          paymentProvider,
          amount,
          bookingData: {
            ...payInPayload,
            paymentProvider,
            query: {
              referrer: document.referrer,
              ...Object.fromEntries(
                searchParams.entries() || {}
              ),
            },
          },
        }
      );

      if (!data.ok || !data?.data) {
        toast.error('Order not created. Please try again.');
        return;
      }

      setPaymentState(prev => ({
        ...prev,
        paymentSessionId: data.data.payment_session_id,
        orderId: data.data.order_id,
      }));
    } catch (error) {
      console.error(error);
      toast.error(
        'An error occurred while creating the order.'
      );
    } finally {
      setPaymentState(prev => ({
        ...prev,
        payinLoading: false,
      }));
    }
  };

  useEffect(() => {
    if (paymentState.paymentSessionId) {
      openPaymentModal();
    }
  }, [paymentState.paymentSessionId]);

  return { onCreateOrder, paymentState };
};

export default usePayment;
