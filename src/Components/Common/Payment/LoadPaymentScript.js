export const loadRazorpayScript = src => {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const loadPayuScript = src => {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const loadPhonpeScript = src => {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const loadEazzbuzzScript = src => {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const loadPaytmScript = src => {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const loadCashfreeScript = src => {
  return new Promise(resolve => {
    const script = document.createElement('script');
    const isDevMode =
      process.env.NODE_ENV === 'development';
    script.src = isDevMode
      ? 'https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js'
      : src;
    script.onload = () => resolve(window.Cashfree);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
