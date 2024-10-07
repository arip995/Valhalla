import axiosInstance from '@/Utils/AxiosInstance';
import { isDevEnv } from '@/Utils/Common';
import { load } from '@cashfreepayments/cashfree-js';
import { Button } from '@mantine/core';

const PaymentButton = async () => {
  const cashfree = await load({
    mode: isDevEnv() ? 'sandbox' : 'production', //or production
  });
  console.log(window.location.href);
  const pay = async () => {
    const { data } = await axiosInstance.post(
      '/payment/create_order',
      {
        phoneNumber: '7327039736',
        amount: 1,
      }
    );
    const { data: responseData } = data;
    let checkoutOptions = {
      paymentSessionId: responseData.payment_session_id,
      redirectTarget: '_modal',
      returnUrl: window.location.href,
    };
    cashfree
      .checkout(checkoutOptions)
      .then(function (result) {
        if (result.error) {
          alert(result.error.message);
        }
        if (result.redirect) {
          console.log('Redirection');
        }
      });
    console.log(responseData);
  };
  return <Button onClick={pay}>PaymentButton</Button>;
};

export default PaymentButton;
