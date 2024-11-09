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
      } else {
        toast.error(
          'There was a problem. If your payment was deducted, it will be resolved within 24 hours.',
          {
            position: 'top-center',
            duration: 10000,
          }
        );
      }
      onSuccess(isSuccessful);
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

// import { useState, useEffect } from 'react'
// import cogoToast from 'cogo-toast'
// import { payinRequest } from './payinRequest'
// import { post } from '../../../config/API'
// const MAX_ATTEMPTS = 3
// const POLL_INTERVAL = 5000 // 5 seconds
// import { useSelector } from 'react-redux'

// const usePayment = ({
//   amount,
//   payInPayload,
//   router,
//   closeId,
//   callBack,
//   paymentProvider,
//   onCreateOrderSuccess = () => {},
//   ...rest
// }) => {
//   const [paymentState, setPaymentState] = useState({
// payinLoading: false,
// orderCreationId: null,
// paymentDone: false,
// loading: false,
// paymentCompleted:false
//   })

//   const currentUser = useSelector((state) => state.user.currentUser) || {}
//   // Function to initiate order creation
//   const onCreateOrder = async () => {

//     if (!amount || amount < 1) {
//       return cogoToast.error('Minimum transaction amount should be ₹1.', {
//         position: 'top-center',
//         hideAfter: 10,
//       });
//     }

//     try {
//       setPaymentState(prev => ({ ...prev, payinLoading: true }));

//       const requestBody = {
//         ...payInPayload,
//         bookingData: {
//           ...payInPayload?.bookingData,
//           paymentProvider,
// email:currentUser.Email || rest.email,
// phone:currentUser.PhoneNumber || rest.phone,
//           queryParams: {
//             referrer: document.referrer,
//             ...(router?.query || {}),
//           },
//         },
//       };

//       const { data, success } = await payinRequest(requestBody);

//       if (!success) {
//         throw new Error('Order creation was unsuccessful. Please try again.');
//       }

//       onCreateOrderSuccess(data);
//       setPaymentState(prev => ({
//         ...prev,
//         payinLoading: false,
//         orderCreationId: data.id,
//       }));

//       const invocationKey = data.access_key || data.payment_session_id;
//       launchPaymentGateway(invocationKey);
//     } catch (error) {
//       console.log('Payment initiation failed:', error);
//       // cogoToast.error(error.message || 'Failed to initiate payment. Please try again.', {
//       //   position: 'top-center',
//       //   hideAfter: 10,
//       // });
//       // setPaymentState(prev => ({ ...prev, payinLoading: false }));
//     }
//   };

//   // Function to handle checkout
//   const launchPaymentGateway = async (invocationKey) => {
//     try{
//       switch (paymentProvider) {
//         case 'paytm':
//           ///This logic is handled inside paytm component itself
//           break
//         case 'easebuzz':
//           var easebuzzCheckout = new EasebuzzCheckout('1W92W2QOF3', 'prod')
//           var options = {
//             access_key: invocationKey, // access key received via Initiate Payment
//             onResponse: (response) => {
//               if (response.status !== 'userCancelled') {
//                 setPaymentState((prev) => ({ ...prev, loading: true,paymentCompleted:true }))
//               }
//             },
//             theme: '#045BE7', // color hex
//           }
//           easebuzzCheckout.initiatePayment(options)
//           break
//         case 'cashfree':
//           const cashfree = Cashfree({
//             mode: 'production', //or production

//           })

//           let checkoutOptions = {
//             paymentSessionId: invocationKey,
//             redirectTarget: "_modal",
//           }

//           if (document.getElementById('mdismissc')) {
//             document.getElementById('mdismissc').click()
//           }
//           cashfree.checkout(checkoutOptions)
//           .then(res => {
//             setPaymentState((prev) => ({ ...prev, loading: true,paymentCompleted:true }))
//           })
//           .catch(err => {
//             console.error("Checkout error!")
//           })
//           break
//         default:
//           console.log('DefaultPaymentProvider')
//       }
//     }catch(err){
//       cogoToast.error(
//         'There was some problem please try again',
//         {
//           position: 'top-center',
//           hideAfter: 10,
//         },
//       )
//     }

//   }

// const pollOrderStatus = ({ orderId, onSuccess, onFailure }) => {
//   let timesRun = 0
//   const timer = setInterval(async () => {
//     if (timesRun >= MAX_ATTEMPTS) {
//       clearInterval(timer)
//       onFailure('Maximum attempts reached')
//       return
//     }

//     try {
//       const response = await post('/muneem/order_details', { orderId })
//       if (response.data?.data?.success) {
//         clearInterval(timer)
//         onSuccess()
//       } else {
//         timesRun += 1
//       }
//     } catch (error) {
//       clearInterval(timer)
//       onFailure(error)
//     }
//   }, POLL_INTERVAL)
// }

//   const onCheckoutSuccess = async () => {
//     const orderId = paymentState.orderCreationId;
//     if (process.env.NEXT_PUBLIC_ENV === 'uat') {
//       const endpoints = {
//         paytm:{
//           path:'/payment/razorpay/payment_sucessful_webhook_paytm',
//           body:{
//             ORDERID: orderId,
//           }
//         },
//         easebuzz:{
//           path:'muneem/payment_status_webhook_easebuzz'
//       },
//         cashfree:{
//           path:'muneem/payment_status_webhook_cashfree'
//         },
//         razorpay:{
//           path:'/payment/razorpay/payment_sucessful_webhook'
//         },
//       }
//       await post(endpoints[paymentProvider].path,endpoints[paymentProvider].body)
//     }

// pollOrderStatus({
//   orderId,
//   onSuccess: () => {
//     setPaymentState((prev) => ({ ...prev, loading: false,paymentDone: true }))
//     callBackHandler(null, true)
//   },
//   onFailure: (error) => {
//     setPaymentState((prev) => ({ ...prev, loading: false,paymentDone: true }))
//     callBackHandler(error, false)
//   },
// })
//   }

// const callBackHandler = (e, paymentDone) => {
//   setTimeout(() => {
//     if (paymentDone) {
//       cogoToast.success('Payment made successfully', {
//         position: 'top-center',
//       })
//     } else {
//       cogoToast.error(
//         'There was some problem if your payment is deducted we will resolve within 24 hours',
//         {
//           position: 'top-center',
//           hideAfter: 10,
//         },
//       )
//     }

//     if (document.getElementById(closeId || 'mdismissc')) {
//       document.getElementById(closeId || 'mdismissc').click()
//     }
//     if (callBack) {
//       callBack(paymentDone, e)
//     }
//   }, 100)
// }

//   useEffect(() => {
//     if(paymentState.paymentCompleted){
//       onCheckoutSuccess();
//     }
//   },[paymentState.paymentCompleted])

//   return { paymentState, onCreateOrder, setPaymentState }
// }

// export default usePayment

// import React from 'react'
// import usePayment from '../Common/usePayment'
// import PaymentButton from '../Common/PaymentButton'
// import CheckoutScript from '../Common/CheckoutScript'

// const CashFree = ({paymentProvider='cashfree',...props}) => {
//   const { paymentState, onCreateOrder } = usePayment({ paymentProvider,...props })

//   return (
//     <>
//       <CheckoutScript paymentProvider= {paymentProvider} />
//       <PaymentButton
//         {...props}
//         loading={paymentState.loading}
//         onCreateOrder={onCreateOrder}
//         payinLoading={paymentState.payinLoading}
//         paymentProvider = {paymentProvider}
//       />
//     </>
//   )
// }

// export default CashFree
