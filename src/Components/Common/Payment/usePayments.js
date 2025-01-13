import axiosInstance from '@/Utils/AxiosInstance';
import { getFullName, isDevEnv } from '@/Utils/Common';
import { checkIfPurchased } from '@/Utils/Common';
import { useRedirectAfterPurchased } from '@/Utils/Hooks/hooks';
import useUser from '@/Utils/Hooks/useUser';
import { load } from '@cashfreepayments/cashfree-js';
import {
  usePathname,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const MAX_ATTEMPTS = 5;
const POLL_INTERVAL = 5000; // 5 seconds

function loadRazorpayScript(src) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const usePayment = (
  onSuccess = () => {},
  onFailure = () => {},
  paymentProvider = 'rp'
) => {
  const productId = usePathname().split('/')[2];
  const productType = usePathname().split('/')[1];
  const isPreview =
    usePathname().split('/')[1] === 'dashboard';
  const redirectAfterPurchased =
    useRedirectAfterPurchased();
  const { user, fetchUserData } = useUser();
  const searchParams = useSearchParams();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [paymentState, setPaymentState] = useState({
    payinLoading: false,
    paymentSessionId: null,
    orderId: null,
    paymentDone: false,
    loading: false,
    paymentCompleted: false,
    purchaseSuccessful: false,
  });
  const [purchased, setPurchased] = useState(false);

  const callBackHandler = isSuccessful => {
    setTimeout(() => {
      if (isSuccessful) {
        toast.success('Payment made successfully', {
          position: 'top-center',
        });
        onSuccess();
        checkOnLoad();
      } else {
        toast.error(
          'There was a problem. If your payment was deducted, it will be resolved within 5-7 working days.',
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
          '/purchase/check',
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
      case 'cf': {
        var cf = await load({
          mode: isDevEnv() ? 'sandbox' : 'sandbox',
        });
        var checkoutOptions = {
          paymentSessionId: paymentState.paymentSessionId,
          redirectTarget: '_modal',
        };

        cf.checkout(checkoutOptions).then(result => {
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
            onPollSuccess: async () => {
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
      }
      case 'rp': {
        const res = await loadRazorpayScript(
          'https://checkout.razorpay.com/v1/checkout.js'
        );

        if (!res) {
          alert('Razropay failed to load!!');
          return;
        }

        const options = {
          key: process.env.RAZORPAY_PG_CLIENT_ID,
          name: 'Nexify',
          order_id: paymentState.id,
          prefill: {
            //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            name: getFullName(
              user.firstName,
              user.lastName
            ),

            email,
            contact: `+ 91${phoneNumber}`, //Provide the customer's phone number for better conversion rates
          },
          config: {
            display: {
              sequence: [
                'method.upi',
                'method.card',
                'method.netbanking',
              ],
              preferences: {
                show_default_blocks: true,
              },
              hide: [
                {
                  method: 'wallet',
                },
                // {
                //   method: 'card',
                // },
                {
                  method: 'netbanking',
                },
              ],
            },
          },
          handler: async response => {
            setPaymentState(prev => ({
              ...prev,
              loading: true,
              paymentCompleted: true,
            }));
            pollOrderStatus({
              sessionId: paymentState.paymentSessionId,
              onPollSuccess: async () => {
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
            try {
              await axiosInstance.post(
                '/payment/update_order',
                { ...response }
              );
            } catch (error) {
              console.log(error);
            }
          },
          modal: {
            ondismiss: function () {
              console.log('panda'); //make the payment failed here
            },
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        break;
      }

      default:
        break;
    }
  };

  const onCreateOrder = async (
    amount = 1,
    creatorId,
    creatorDetails,
    bookingData,
    phoneNumber,
    email
  ) => {
    if (!amount || isPreview) return;
    if (purchased) {
      redirectAfterPurchased();
      return;
    }

    setPaymentState(prev => ({
      ...prev,
      payinLoading: true,
    }));

    try {
      const subscription =
        productType === 'tg'
          ? { ...bookingData.subscription }
          : {};
      const newBookingData = { ...bookingData };
      if (productType === 'tg') {
        delete newBookingData.subscription;
      }

      if (!user?.email) {
        setEmail(email);
        user.email = email;
      }
      if (!user?.phoneNumber) {
        setPhoneNumber(phoneNumber);
        user.phoneNumber = phoneNumber;
      }

      const { data } = await axiosInstance.post(
        '/payment/create_order',
        {
          user,
          productId,
          productType,
          paymentProvider,
          amount,
          creatorId,
          creatorDetails,
          subscription,
          bookingData: {
            ...newBookingData,
            query: {
              referrer: document.referrer,
              ...Object.fromEntries(
                searchParams.entries() || {}
              ),
            },
          },
        },
        {
          withCredentials: true,
        }
      );

      if (!data.ok || !data?.data) {
        toast.error('Order not created. Please try again.');
        return;
      }

      fetchUserData();

      setPaymentState(prev => ({
        ...prev,
        ...data.data,
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

  const checkOnLoad = async () => {
    if (isPreview || productType !== 'course') return;
    setPurchased(
      await checkIfPurchased(productId, user._id)
    );
  };

  useEffect(() => {
    if (paymentState.paymentSessionId || paymentState.id) {
      openPaymentModal();
    }
  }, [paymentState.paymentSessionId, paymentState.id]);

  useEffect(() => {
    if (user === -1) return;
    if (user.email) {
      setEmail(user.email);
    }
    if (user.phoneNumber) {
      setPhoneNumber(user.phoneNumber);
    }
    checkOnLoad();
  }, [user?._id]);
  return { onCreateOrder, paymentState, purchased };
};

export default usePayment;
