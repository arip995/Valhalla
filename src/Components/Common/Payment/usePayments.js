import axiosInstance from '@/Utils/AxiosInstance';
import { isDevEnv } from '@/Utils/Common';
import { load } from '@cashfreepayments/cashfree-js';
import { useState } from 'react';

const usePayment = (
  onSuccess = () => {},
  onFailure = () => {}
) => {
  const [loading, setLoading] = useState(false);
  const onPay = async (phoneNumber, amount = 1) => {
    if (!amount || !phoneNumber) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        '/payment/create_order',
        {
          phoneNumber: phoneNumber,
          amount: amount,
        }
      );
      const { data: responseData } = data;
      const cashfree = await load({
        mode: isDevEnv() ? 'sandbox' : 'sandbox', //or production
      });
      let checkoutOptions = {
        paymentSessionId: responseData.payment_session_id,
        redirectTarget: '_modal',
      };
      cashfree
        .checkout(checkoutOptions)
        .then(function (result) {
          console.log(result);
          if (result.error) {
            onFailure();
            return;
          }
          onSuccess();
          return;
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { onPay, loading };
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
//     payinLoading: false,
//     orderCreationId: null,
//     paymentDone: false,
//     loading: false,
//     paymentCompleted:false
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
//           email:currentUser.Email || rest.email,
//           phone:currentUser.PhoneNumber || rest.phone,
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

//   const pollOrderStatus = ({ orderId, onSuccess, onFailure }) => {
//     let timesRun = 0
//     const timer = setInterval(async () => {
//       if (timesRun >= MAX_ATTEMPTS) {
//         clearInterval(timer)
//         onFailure('Maximum attempts reached')
//         return
//       }

//       try {
//         const response = await post('/muneem/order_details', { orderId })
//         if (response.data?.data?.success) {
//           clearInterval(timer)
//           onSuccess()
//         } else {
//           timesRun += 1
//         }
//       } catch (error) {
//         clearInterval(timer)
//         onFailure(error)
//       }
//     }, POLL_INTERVAL)
//   }

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

//     pollOrderStatus({
//       orderId,
//       onSuccess: () => {
//         setPaymentState((prev) => ({ ...prev, loading: false,paymentDone: true }))
//         callBackHandler(null, true)
//       },
//       onFailure: (error) => {
//         setPaymentState((prev) => ({ ...prev, loading: false,paymentDone: true }))
//         callBackHandler(error, false)
//       },
//     })
//   }

//   const callBackHandler = (e, paymentDone) => {
//     setTimeout(() => {
//       if (paymentDone) {
//         cogoToast.success('Payment made successfully', {
//           position: 'top-center',
//         })
//       } else {
//         cogoToast.error(
//           'There was some problem if your payment is deducted we will resolve within 24 hours',
//           {
//             position: 'top-center',
//             hideAfter: 10,
//           },
//         )
//       }

//       if (document.getElementById(closeId || 'mdismissc')) {
//         document.getElementById(closeId || 'mdismissc').click()
//       }
//       if (callBack) {
//         callBack(paymentDone, e)
//       }
//     }, 100)
//   }

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
