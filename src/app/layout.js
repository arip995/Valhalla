import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ModalsProvider } from '@mantine/modals';
import './globals.css';
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
import '@mantine/core/styles/Switch.css';
import '@mantine/core/styles/Drawer.css';
import '@mantine/core/styles/Menu.css';
import '@mantine/core/styles/Badge.css';
import '@mantine/core/styles/Pagination.css';
import '@mantine/core/styles/Kbd.css';
import '@mantine/core/styles/Tooltip.css';
import '@mantine/core/styles/Progress.css';
import '@mantine/core/styles/Accordion.css';
import '@mantine/core/styles/Alert.css';
import '@mantine/core/styles/Tabs.css';
import '@mantine/core/styles/Slider.css';
import '@mantine/core/styles/Anchor.css';

// const inter = Inter({ subsets: ["latin"] });
const theme = createTheme({
  /** Your theme override here */
  fontFamily: 'Open Sans, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Greycliff CF, sans-serif' },
  primaryColor: 'violet',
  // primaryColor: 'bright-blue',
  // colors: {
  //   'bright-blue': [
  //     '#e5f4ff',
  //     '#cde2ff',
  //     '#9bc2ff',
  //     '#64a0ff',
  //     '#3984fe',
  //     '#1d72fe',
  //     '#0969ff',
  //     '#0058e4',
  //     '#004ecc',
  //     '#0043b5',
  //   ],
  // },

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
