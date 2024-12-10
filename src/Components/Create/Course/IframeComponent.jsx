import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import {
  ColorSchemeScript,
  createTheme,
  MantineProvider,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const IframeComponent = ({ children }) => {
  const iframeRef = useRef < HTMLIFrameElement > null;
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [loadingTimeout, setLoadingTimeout] =
    useState(false);

  const renderChildInIframe = () => {
    if (!iframeLoaded) return null;

    const iframeDocument =
      iframeRef.current?.contentDocument;
    if (!iframeDocument) return null;

    // Ensure head is clear before injecting styles
    iframeDocument.head.innerHTML = '';

    // Add Tailwind CSS
    const tailwindLink =
      iframeDocument.createElement('link');
    tailwindLink.href =
      'https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css';
    tailwindLink.rel = 'stylesheet';
    iframeDocument.head.appendChild(tailwindLink);

    // Add Mantine styles (your existing style array)
    const mantineStyles = [
      // ... (your existing Mantine styles array)
    ];

    mantineStyles.forEach(style => {
      const link = iframeDocument.createElement('link');
      link.href = `https://cdn.jsdelivr.net/npm/${style}`;
      link.rel = 'stylesheet';
      iframeDocument.head.appendChild(link);
    });

    const theme = createTheme({
      cursorType: 'pointer',
    });

    const iframeBody = iframeDocument.body;

    return createPortal(
      <MantineProvider
        theme={theme}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>
          <Notifications />
          <ColorSchemeScript />
          {children}
        </ModalsProvider>
      </MantineProvider>,
      iframeBody
    );
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setIframeLoaded(true);
    };

    const handleError = () => {
      setLoadingTimeout(true);
    };

    // Add multiple event listeners for robustness
    iframe.addEventListener('load', handleLoad);
    iframe.addEventListener('error', handleError);

    return () => {
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
    };
  }, []);

  // Render loading or error state
  if (loadingTimeout) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4 text-center">
        <p>
          Failed to load content. Please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full transform">
      <iframe
        ref={iframeRef}
        className="h-full w-full border-0"
        // Add additional attributes for reliability
        sandbox="allow-scripts allow-same-origin"
        loading="eager"
      />
      {!iframeLoaded && <LayoutLoading />}
      {iframeLoaded && renderChildInIframe()}
    </div>
  );
};

export default IframeComponent;
