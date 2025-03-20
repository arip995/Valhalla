import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';

// const inter = Inter({ subsets: ["latin"] });
const theme = createTheme({
  /** Your theme override here */
  // fontFamily: 'Open Sans, sans-serif',
  // fontFamily: 'Inter, sans-serif',
  // fontFamilyMonospace: 'Monaco, Courier, monospace',
  // headings: { fontFamily: 'Greycliff CF, sans-serif' },
  primaryColor: 'violet',
  // primaryColor: 'nexify-purple',
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
  //   'nexify-purple': [
  //     '#faf5ff',
  //     '#f3e8ff',
  //     '#e9d5ff',
  //     '#d8b4fe',
  //     '#c084fc',
  //     '#a855f7',
  //     '#9333ea',
  //     '#7e22ce',
  //     '#6b21a8',
  //     '#581c87',
  //   ],
  // },

  cursorType: 'pointer',
});

export const metadata = {
  title:
    'Nexify: all-in-one platform for your digital products and services',
  description: 'Monetize your content',
  icons: {
    icon: '/favicon.ico',
  },
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
        </MantineProvider>
        <Toaster />
      </body>
    </html>
  );
}
