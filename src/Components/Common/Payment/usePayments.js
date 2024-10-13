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
      const cashfree = await load({
        mode: isDevEnv() ? 'sandbox' : 'sandbox', //or production
      });
      const { data } = await axiosInstance.post(
        '/payment/create_order',
        {
          phoneNumber: phoneNumber,
          amount: amount,
        }
      );
      const { data: responseData } = data;
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
