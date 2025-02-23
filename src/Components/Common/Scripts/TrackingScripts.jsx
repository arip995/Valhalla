'use client';

import Script from 'next/script';

const TrackingScripts = ({
  facebookPixelId,
  googleMeasurementId,
}) => {
  if (!facebookPixelId && !googleMeasurementId) {
    return null;
  }

  return (
    <>
      {/* Google Analytics & Ads */}
      {googleMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){ dataLayer.push(arguments); }
                
                if (!window.gtagLoaded) {
                  gtag('js', new Date());
                  gtag('config', '${googleMeasurementId}');
                  gtag('config', 'AW-${googleMeasurementId}'); // Google Ads tracking
                  window.gtagLoaded = true;
                }
              `,
            }}
          />
        </>
      )}

      {/* Facebook Pixel */}
      {facebookPixelId && (
        <>
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(f,b,e,v,n,t,s){
                  if(f.fbq) return;
                  n = f.fbq = function(){
                    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                  };
                  if (!f._fbq) f._fbq = n;
                  n.push = n;
                  n.loaded = true;
                  n.version = '2.0';
                  n.queue = [];
                  t = b.createElement(e);
                  t.async = true;
                  t.src = v;
                  s = b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t, s);
                })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

                if (typeof fbq === 'function' && !window.fbqLoaded) {
                  fbq('init', '${facebookPixelId}');
                  fbq('track', 'PageView');
                  window.fbqLoaded = true;
                }
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
};

export default TrackingScripts;
