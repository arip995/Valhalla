import { isDevEnv } from '@/Utils/Common';
import { load } from '@cashfreepayments/cashfree-js';

const usepayment = async () => {
  const cashfree = await load({
    mode: isDevEnv() ? 'sandbox' : 'production', //or production
  });

  console.log(cashfree);
  return {};
};

export default usepayment;
