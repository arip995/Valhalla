/* eslint-disable no-unused-vars */
// import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
// import {
//   ColorSchemeScript,
//   createTheme,
//   MantineProvider,
// } from '@mantine/core';
// import { ModalsProvider } from '@mantine/modals';
// import { Notifications } from '@mantine/notifications';
// import { useEffect, useRef, useState } from 'react';
// import { createPortal } from 'react-dom';

// const IframeComponent = ({ children }) => {
//   const iframeRef = useRef(null);
//   const [iframeLoaded, setIframeLoaded] = useState(false);

//   const renderChildInIframe = () => {
//     if (!iframeLoaded) return null;

//     const iframeDocument =
//       iframeRef.current.contentDocument;

//     // Ensure head is clear before injecting styles
//     iframeDocument.head.innerHTML = '';

//     // Add Tailwind CSS
//     const tailwindLink =
//       iframeDocument.createElement('link');
//     tailwindLink.href =
//       'https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css';
//     tailwindLink.rel = 'stylesheet';
//     iframeDocument.head.appendChild(tailwindLink);

//     // Add @tailwindcss/typography plugin styles
//     const typographyLink =
//       iframeDocument.createElement('link');
//     typographyLink.href =
//       'https://cdn.jsdelivr.net/npm/@tailwindcss/typography@latest/dist/typography.min.css';
//     typographyLink.rel = 'stylesheet';
//     iframeDocument.head.appendChild(typographyLink);

//     // Add Mantine styles
//     const mantineStyles = [
//       '@mantine/core/styles/global.css',
//       '@mantine/core/styles/UnstyledButton.css',
//       '@mantine/core/styles/Button.css',
//       '@mantine/core/styles/ScrollArea.css',
//       '@mantine/core/styles/Paper.css',
//       '@mantine/core/styles/Popover.css',
//       '@mantine/core/styles/CloseButton.css',
//       '@mantine/core/styles/Loader.css',
//       '@mantine/core/styles/Overlay.css',
//       '@mantine/core/styles/ModalBase.css',
//       '@mantine/core/styles/Modal.css',
//       '@mantine/core/styles/Notification.css',
//       '@mantine/core/styles/Input.layer.css',
//       '@mantine/core/styles/InlineInput.layer.css',
//       '@mantine/core/styles/NumberInput.layer.css',
//       '@mantine/core/styles/PinInput.layer.css',
//       '@mantine/core/styles/Flex.css',
//       '@mantine/core/styles/Grid.css',
//       '@mantine/core/styles/SimpleGrid.css',
//       '@mantine/core/styles/Group.css',
//       '@mantine/core/styles/TypographyStylesProvider.css',
//       '@mantine/core/styles/AppShell.css',
//       '@mantine/core/styles/NavLink.css',
//       '@mantine/core/styles/Radio.css',
//       '@mantine/core/styles/RadioCard.css',
//       '@mantine/core/styles/RadioIndicator.css',
//       '@mantine/core/styles/CheckboxCard.css',
//       '@mantine/core/styles/CheckboxIndicator.css',
//       '@mantine/core/styles/Checkbox.css',
//       '@mantine/core/styles/Avatar.css',
//       '@mantine/core/styles/LoadingOverlay.css',
//       '@mantine/core/styles/ActionIcon.css',
//       '@mantine/core/styles/Fieldset.css',
//       '@mantine/core/styles/Combobox.css',
//       '@mantine/core/styles/Burger.css',
//       '@mantine/core/styles/Stack.css',
//       '@mantine/core/styles/Text.css',
//       '@mantine/core/styles/Divider.css',
//       '@mantine/core/styles/Switch.css',
//       '@mantine/core/styles/Drawer.css',
//       '@mantine/core/styles/Menu.css',
//       '@mantine/core/styles/Badge.css',
//       '@mantine/core/styles/Pagination.css',
//       '@mantine/core/styles/Kbd.css',
//       '@mantine/core/styles/Tooltip.css',
//       '@mantine/core/styles/Progress.css',
//       '@mantine/core/styles/RingProgress.css',
//       '@mantine/core/styles/Accordion.layer.css',
//       '@mantine/core/styles/Alert.css',
//       '@mantine/core/styles/Tabs.css',
//       '@mantine/core/styles/Chip.css',
//       '@mantine/core/styles/Spoiler.css',
//       '@mantine/core/styles/Slider.css',
//       '@mantine/core/styles/Rating.css',
//       '@mantine/core/styles/Card.css',
//       '@mantine/core/styles/Anchor.css',
//       '@mantine/core/styles/Stepper.css',
//       '@mantine/core/styles/ThemeIcon.css',
//       '@mantine/core/styles/ColorSwatch.css',
//       '@mantine/core/styles/ColorPicker.css',
//       '@mantine/core/styles/ColorInput.css',
//       '@mantine/dates/styles.css',
//       '@mantine/carousel/styles.css',
//     ];

//     mantineStyles.forEach(style => {
//       const link = iframeDocument.createElement('link');
//       link.href = `https://cdn.jsdelivr.net/npm/${style}`;
//       link.rel = 'stylesheet';
//       iframeDocument.head.appendChild(link);
//     });

//     // const mantineStyles = [
//     //   'https://unpkg.com/@mantine/carousel@7.15.1/styles.layer.css',
//     //   'https://unpkg.com/@mantine/core@7.15.1/styles.css',
//     // ];
//     // mantineStyles.forEach(styleUrl => {
//     //   const link = iframeDocument.createElement('link');
//     //   link.href = styleUrl;
//     //   link.rel = 'stylesheet';
//     //   iframeDocument.head.appendChild(link);
//     // });

//     const theme = createTheme({
//       cursorType: 'pointer',
//     });

//     const iframeBody = iframeDocument.body;

//     return createPortal(
//       <MantineProvider
//         theme={theme}
//         withGlobalStyles
//         withNormalizeCSS
//       >
//         <ModalsProvider>
//           <Notifications />
//           <ColorSchemeScript />
//           {children}
//         </ModalsProvider>
//       </MantineProvider>,
//       iframeBody
//     );
//   };

//   useEffect(() => {
//     const iframe = iframeRef.current;
//     if (iframe) {
//       iframe.onload = () => setIframeLoaded(true);
//     }
//     setTimeout(() => {
//       setIframeLoaded(true);
//     }, 5000);
//   }, []);

//   return (
//     <div className="relative h-full w-full transform">
//       <iframe
//         ref={iframeRef}
//         className="h-full w-full border-0"
//       />
//       {!iframeLoaded ? (
//         <LayoutLoading />
//       ) : (
//         renderChildInIframe()
//       )}
//     </div>
//   );
// };

// export default IframeComponent;

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const IframeComponent = ({
  children,
  productId,
  productType,
}) => {
  const iframeRef = useRef(null);
  const [mountNode, setMountNode] = useState(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const iframeDocument = iframe.contentDocument;

    // Reset and prepare iframe document
    iframeDocument.documentElement.style.height = '100%';
    iframeDocument.body.style.height = '100%';
    iframeDocument.body.style.margin = '0';

    // Copy styles from parent document to iframe
    const parentStyles = Array.from(
      document.head.querySelectorAll(
        'style, link[rel="stylesheet"]'
      )
    );
    parentStyles.forEach(style => {
      const clonedStyle = style.cloneNode(true);
      iframeDocument.head.appendChild(clonedStyle);
    });

    // Create and set up the container
    const container = iframeDocument.createElement('div');
    container.style.height = '100%';
    container.style.width = '100%';
    container.style.position = 'relative';
    container.style.overflow = 'auto';

    // Clear existing content and append new container
    iframeDocument.body.innerHTML = '';
    iframeDocument.body.appendChild(container);

    // Set the mount node for the portal
    setMountNode(container);

    return () => {
      setMountNode(null);
    };
  }, []);

  return (
    <>
      <iframe
        // src={`${process.env.NEXT_PUBLIC_HOST}/${productType}/${productId}`}
        ref={iframeRef}
        className="h-full w-full border-0"
        title="content-frame"
      >
        {mountNode && createPortal(children, mountNode)}
      </iframe>
    </>
  );
};

export default IframeComponent;

// import React, { useRef } from 'react';

// const ParentComponent = ({ children }) => {
//   const parentRef = useRef(null);

//   return (
//     <div ref={parentRef}>
//       {React.cloneElement(children)}
//     </div>
//   );
// };

// export default function App({ children }) {
//   return <ParentComponent>{children}</ParentComponent>;
// }
