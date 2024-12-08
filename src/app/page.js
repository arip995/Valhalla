/* eslint-disable no-unused-vars */
import LandingPage from '@/Components/Landing/main/Landing/LandingPage';
import '@mantine/notifications/styles.css';
import '../styles/landing/main.css';

export async function generateMetadata(
  // { params, searchParams },
  parent
) {
  const previousImages =
    (await parent).openGraph?.images || [];

  return {
    title:
      'Nexify: all-in-one platform for your digital products and services',
    description:
      'The all-in-one platform for your digital products and services',
    openGraph: {
      siteName: 'Nexify',
      title:
        'Nexify: all-in-one platform for your digital products and services',
      description:
        'The all-in-one platform for your digital products and services',
      images: [
        {
          url: 'https://nexify-try.s3.ap-south-1.amazonaws.com/499766c5-b634-4ec9-a0f6-1a2bc19a591a.png',
          width: 1200, // Add width for better specification
          height: 630, // Add height for better specification
          alt: 'Nexify', // Optional: Add alt text
        },
        ...previousImages,
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default function Page() {
  return <LandingPage />;
}
