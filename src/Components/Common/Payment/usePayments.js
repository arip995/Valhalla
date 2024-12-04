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
  const { user } = useUser();
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
          name: getFullName(user.firstName, user.lastName),
          order_id: paymentState.id,
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
                // {
                //   method: 'wallet',
                // },
                // {
                //   method: 'card',
                // },
                // {
                //   method: 'netbanking',
                // },
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
    bookingData
  ) => {
    // await axiosInstance.post(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}/webhook/payment/razorpay`,
    //   {
    //     payload: {
    //       payment: {
    //         entity: {
    //           order_id: 'order_PSzJeChlUvQstp',
    //           method: 'upi',
    //           payment: {
    //             cf_payment_id: 5114915060586,
    //             payment_status: 'SUCCESS',
    //             payment_amount: 222,
    //             payment_currency: 'INR',
    //             payment_message: null,
    //             payment_time: '2024-11-20T10:03:38+05:30',
    //             bank_reference: null,
    //             auth_id: null,
    //             payment_method: {
    //               netbanking: {
    //                 channel: null,
    //                 netbanking_bank_code: '3022',
    //                 netbanking_bank_name: 'ICICI Bank',
    //               },
    //             },
    //             payment_group: 'net_banking',
    //           },
    //           customer_details: {
    //             customer_name: 'Arindam Pandasx',
    //             customer_id: '6656ace66a7d6213c7b78ea7',
    //             customer_email: 'panda@gmail.coms',
    //             customer_phone: '8888888888',
    //           },
    //           payment_gateway_details: {
    //             gateway_name: 'CASHFREE',
    //             gateway_order_id: '2188135133',
    //             gateway_payment_id: '5114915060586',
    //             gateway_status_code: null,
    //             gateway_order_reference_id: 'null',
    //             gateway_settlement: 'CASHFREE',
    //           },
    //           payment_offers: null,
    //         },
    //       },
    //     },
    //     event: 'payment.captured',
    //     type: 'PAYMENT_SUCCESS_WEBHOOK',
    //   }
    // );
    // return;
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
        }
      );

      if (!data.ok || !data?.data) {
        toast.error('Order not created. Please try again.');
        return;
      }

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
    checkOnLoad();
  }, [user?._id]);
  return { onCreateOrder, paymentState, purchased };
};

export default usePayment;
