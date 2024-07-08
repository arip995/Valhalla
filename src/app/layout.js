import { Inter } from 'next/font/google';
import '@mantine/core/styles.css';
import './globals.css';
import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { SpeedInsights } from '@vercel/speed-insights/next';

// const inter = Inter({ subsets: ["latin"] });
const theme = createTheme({
  /** Your theme override here */
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'violet',
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
          {children}
          <SpeedInsights />
        </MantineProvider>
      </body>
    </html>
  );
}
