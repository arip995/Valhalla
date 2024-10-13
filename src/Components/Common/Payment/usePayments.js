import axiosInstance from '@/Utils/AxiosInstance';
import { isDevEnv } from '@/Utils/Common';
import { load } from '@cashfreepayments/cashfree-js';

const usePayment = (
  onSuccess = () => {},
  onFailure = () => {}
) => {
  const onPay = async (phoneNumber, amount = 1) => {
    if (!amount || !phoneNumber) return;

    const cashfree = await load({
      mode: isDevEnv() ? 'sandbox' : 'production', //or production
    });
    const { data } = await axiosInstance.post(
      '/payment/create_order',
      {
        phoneNumber: phoneNumber,
        amount: amount,
      }
    );
    const { data: responseData } = data;
    console.log(responseData);
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
  };
  return { onPay };
};

export default usePayment;
