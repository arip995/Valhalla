import axiosInstance from '@/Utils/AxiosInstance';
import toast from 'react-hot-toast';

export const pollOrderStatus = (
  productId,
  userId,
  setPaymentState,
  onSuccess = () => {},
  onFailure = () => {}
) => {
  let attemptCount = 0;
  const MAX_ATTEMPTS = 10;
  const POLL_INTERVAL = 2500;
  const onPollSuccess = async () => {
    setTimeout(() => {
      setPaymentState(prev => ({
        ...prev,
        loading: false,
      }));
      onSuccess();
    }, 3500);

    setPaymentState(prev => ({
      ...prev,
      paymentDone: true,
      purchaseSuccessful: true,
    }));
    toast.success('Payment made successfully', {
      position: 'top-center',
    });
  };

  const onPollFailure = error => {
    setPaymentState(prev => ({
      ...prev,
      loading: false,
      paymentDone: false,
    }));
    toast.error(
      'Payment failed, amount will be refunded within 5-7 working days if applicable hours',
      {
        position: 'top-center',
      }
    );
    onFailure();
    console.error(error);
  };

  const timer = setInterval(async () => {
    if (attemptCount >= MAX_ATTEMPTS) {
      clearInterval(timer);
      onPollFailure();
      return;
    }
    try {
      const { data } = await axiosInstance.post(
        '/purchase/check',
        { productId, userId }
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
