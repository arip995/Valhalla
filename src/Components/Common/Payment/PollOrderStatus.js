import axiosInstance from '@/Utils/AxiosInstance';

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
  };

  const onPollFailure = error => {
    setPaymentState(prev => ({
      ...prev,
      loading: false,
      paymentDone: false,
    }));
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
