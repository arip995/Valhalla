'use client';

import Script from 'next/script';

const FacebookScript = ({ pixelId }) => {
  if (!pixelId) {
    console.warn('Facebook Pixel ID is missing!');
    return null; // Prevent rendering if no Pixel ID is provided
  }

  return (
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

            if (typeof fbq === 'function') {
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            }
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

export default FacebookScript;
