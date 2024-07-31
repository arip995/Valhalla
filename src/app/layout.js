import { Inter } from 'next/font/google';
import './globals.css';
import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/ScrollArea.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Popover.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Loader.css';
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/Modal.css';
import '@mantine/core/styles/Notification.css';
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/InlineInput.css';
import '@mantine/core/styles/Flex.css';
import '@mantine/core/styles/Grid.css';
import '@mantine/core/styles/SimpleGrid.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Anchor.css';
import '@mantine/core/styles/TypographyStylesProvider.css';
import '@mantine/core/styles/AppShell.css';
import '@mantine/core/styles/NavLink.css';
import '@mantine/core/styles/NumberInput.css';
import '@mantine/core/styles/Radio.css';
import '@mantine/core/styles/RadioCard.css';
import '@mantine/core/styles/RadioIndicator.css';
import '@mantine/core/styles/CheckboxCard.css';
import '@mantine/core/styles/CheckboxIndicator.css';
import '@mantine/core/styles/Checkbox.css';
import '@mantine/core/styles/Avatar.css';
import '@mantine/core/styles/LoadingOverlay.css';
import '@mantine/core/styles/ActionIcon.css';
import '@mantine/core/styles/Fieldset.css';
import '@mantine/core/styles/Combobox.css';
import '@mantine/core/styles/PinInput.css';
import '@mantine/core/styles/Burger.css';
import '@mantine/core/styles/Stack.css';
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Divider.css';
import '@mantine/core/styles/Anchor.css';
import { ModalsProvider } from '@mantine/modals';

// const inter = Inter({ subsets: ["latin"] });
const theme = createTheme({
  /** Your theme override here */
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'violet',
  cursorType: 'pointer',
});

export const metadata = {
  title:
    'Nexify: all-in-one platform for your digital products and services',
  description: 'Monetize your content',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <ColorSchemeScript forceColorScheme="light" />
        <MantineProvider theme={theme}>
          <Notifications position="top-right" />
          <ModalsProvider>{children}</ModalsProvider>
          <SpeedInsights />
        </MantineProvider>
      </body>
    </html>
  );
}
