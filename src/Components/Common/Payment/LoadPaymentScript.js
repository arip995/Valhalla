const ScriptMap = {
  rp: 'https://checkout.razorpay.com/v1/checkout.js',
  cf: 'https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js',
  pp: 'https://mercury.phonepe.com/web/bundle/checkout.js',
  eb: 'https://eazzbuzz.com/checkout/js/checkout.js',
  pt: 'https://paytm.com/checkout/js/checkout.js',
  pu: 'https://payu.in/checkout/js/checkout.js',
};

export const loadPaymentScript = paymentProvider => {
  const src = ScriptMap[paymentProvider];
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
