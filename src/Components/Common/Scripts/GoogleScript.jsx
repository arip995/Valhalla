'use client';

import Script from 'next/script';

const GoogleScript = ({ googleAnalyticsId }) => {
  if (!googleAnalyticsId) {
    console.warn('Google Analytics ID is missing!');
    return null; // Prevent rendering if no ID is provided
  }

  return (
    <>
      {/* Load Google Tag Manager script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />

      {/* Initialize Google Analytics & Google Ads tracking */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            
            if (!window.gtagLoaded) {
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
              gtag('config', 'AW-${googleAnalyticsId}'); // Google Ads tracking
              window.gtagLoaded = true;
            }
          `,
        }}
      />
    </>
  );
};

export default GoogleScript;
