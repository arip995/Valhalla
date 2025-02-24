// utils/paymentProviders.js
import { load } from '@cashfreepayments/cashfree-js';
import { loadRazorpayScript } from './LoadPaymentScript';
import { isDevEnv } from '@/Utils/Common';
import axiosInstance from '@/Utils/AxiosInstance';

export const handleCashfreePayment = async (
  paymentState,
  email,
  phoneNumber,
  callBackHandler
) => {
  const cf = await load({
    mode: isDevEnv() ? 'sandbox' : 'production',
  });
  const checkoutOptions = {
    paymentSessionId: paymentState.payment_session_id,
    redirectTarget: '_modal',
  };
  console.log('checkoutOptions', checkoutOptions);
  cf.checkout(checkoutOptions).then(result => {
    if (result.error) {
      callBackHandler(false);
      return;
    }
    callBackHandler(true);
  });
};

export const handleRazorpayPayment = async (
  paymentState,
  email,
  phoneNumber,
  callBackHandler
) => {
  const res = await loadRazorpayScript(
    'https://checkout.razorpay.com/v1/checkout.js'
  );
  if (!res) {
    alert('Razorpay failed to load!');
    return;
  }

  const options = {
    key: process.env.RAZORPAY_PG_CLIENT_ID,
    name: 'Nexify',
    order_id: paymentState.id,
    prefill: { email, contact: `+91${phoneNumber}` },
    // eslint-disable-next-line no-unused-vars
    handler: async response => {
      try {
        await axiosInstance.post('/payment/update_order', {
          ...response,
        });
      } catch (error) {
        console.log(error);
      }
      callBackHandler();
    },
    modal: {
      ondismiss: () => console.log('Payment dismissed'),
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

export const handlePaytmPayment = async (
  paymentState,
  email,
  phoneNumber,
  callBackHandler
) => {
  try {
    // Load Paytm checkout JS
    const script = document.createElement('script');
    script.src = `https://securegw${isDevEnv() ? '-staging' : ''}.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MERCHANT_ID}.js`;
    script.async = true;
    script.onload = () => {
      const config = {
        root: '',
        flow: 'DEFAULT',
        data: {
          orderId: paymentState.id,
          token: paymentState.payment_token, // Get from backend
          tokenType: 'TXN_TOKEN',
          amount: paymentState.amount,
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log(
              'notifyMerchant handler',
              eventName,
              data
            );
          },
          transactionStatus: async function (
            paymentStatus
          ) {
            callBackHandler(
              paymentStatus.transactionStatus ===
                'TXN_SUCCESS'
            );
          },
        },
      };

      if (window.Paytm && window.Paytm.CheckoutJS) {
        window.Paytm.CheckoutJS.init(config)
          .then(function onSuccess() {
            window.Paytm.CheckoutJS.invoke();
          })
          .catch(function onError(error) {
            console.log('Error => ', error);
            callBackHandler(false);
          });
      }
    };
    document.body.appendChild(script);
  } catch (error) {
    console.error('Paytm payment error:', error);
    callBackHandler(false);
  }
};

export const paymentHandlers = {
  cf: handleCashfreePayment,
  rp: handleRazorpayPayment,
  paytm: handlePaytmPayment,
};
