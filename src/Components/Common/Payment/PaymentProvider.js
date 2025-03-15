// utils/paymentProviders.js
import axiosInstance from '@/Utils/AxiosInstance';
import { isDevEnv } from '@/Utils/Common';
import { load } from '@cashfreepayments/cashfree-js';
import { loadPaymentScript } from './LoadPaymentScript';

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
  const res = await loadPaymentScript('rp');
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

export const handleEazzbuzzPayment = async (
  paymentState,
  email,
  phoneNumber,
  callBackHandler
) => {
  try {
    const script = document.createElement('script');
    script.src = `https://checkout.easebuzz.in/v1/checkout.js`;
    script.async = true;
    script.onload = () => {
      const config = {
        access_key: process.env.EASEBUZZ_ACCESS_KEY,
        pay_mode: isDevEnv() ? 'test' : 'prod',
        txnid: paymentState.id,
        amount: paymentState.amount,
        email: email,
        phone: phoneNumber,
        name: 'Customer',
        surl: window.location.origin + '/payment/success',
        furl: window.location.origin + '/payment/failure',
      };

      if (window.Easebuzz && window.Easebuzz.checkout) {
        window.Easebuzz.checkout(config)
          .then(function (response) {
            if (response.status === 'success') {
              callBackHandler(true);
            } else {
              callBackHandler(false);
            }
          })
          .catch(function (error) {
            console.error('Easebuzz payment error:', error);
            callBackHandler(false);
          });
      }
    };
    document.body.appendChild(script);
  } catch (error) {
    console.error('Easebuzz payment error:', error);
    callBackHandler(false);
  }
};

export const handlePayuPayment = async (
  paymentState,
  email,
  phoneNumber,
  callBackHandler
) => {
  try {
    const script = document.createElement('script');
    script.src = `https://secure.payu.in/js/payu.js`;
    script.async = true;
    script.onload = () => {
      const config = {
        key: process.env.PAYU_MERCHANT_KEY,
        txnid: paymentState.id,
        amount: paymentState.amount,
        productinfo: 'Product Info',
        firstname: 'Customer',
        email: email,
        phone: phoneNumber,
        surl: window.location.origin + '/payment/success',
        furl: window.location.origin + '/payment/failure',
        env: isDevEnv() ? 'test' : 'prod',
      };

      if (window.PayU) {
        window.PayU.setup(config);
        window.PayU.onSuccess(function () {
          callBackHandler(true);
        });
        window.PayU.onFailure(function (error) {
          console.error('PayU payment error:', error);
          callBackHandler(false);
        });
        window.PayU.startPayment();
      }
    };
    document.body.appendChild(script);
  } catch (error) {
    console.error('PayU payment error:', error);
    callBackHandler(false);
  }
};

export const handlePhonpePayment = async (
  paymentState,
  email,
  phoneNumber,
  callBackHandler
) => {
  try {
    await loadPaymentScript('pp');
    window.PhonePeCheckout.transact({
      tokenUrl: paymentState.checkoutPageUrl,
      closeFrame: () => {
        console.log('message');
        callBackHandler(false);
      },
      callback: response => {
        console.log(response);
        if (response === 'USER_CANCEL') {
          callBackHandler(false);
          window.PhonePeCheckout.closePage({
            token: paymentState.checkoutPageUrl,
          });
        } else if (response === 'CONCLUDED') {
          callBackHandler(true);
        }
      },
      type: 'IFRAME',
    });
  } catch (error) {
    console.error('PhonePe payment error:', error);
    callBackHandler(false);
  }
};

export const paymentHandlers = {
  cf: handleCashfreePayment,
  rp: handleRazorpayPayment,
  pt: handlePaytmPayment,
  pp: handlePhonpePayment,
  eb: handleEazzbuzzPayment,
  pu: handlePayuPayment,
};
