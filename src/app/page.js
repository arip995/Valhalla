import CTA from '@/Components/Landing/main/ui/CTA';
import FAQs from '@/Components/Landing/main/ui/FAQs';
import Features from '@/Components/Landing/main/ui/Features';
import Footer from '@/Components/Landing/main/ui/Footer';
import Hero from '@/Components/Landing/main/ui/Hero';
import Navbar from '@/Components/Landing/main/ui/Navbar';
import Pricing from '@/Components/Landing/main/ui/Pricing';
import Testimonial from '@/Components/Landing/main/ui/Testimonial';
import VisualFeatures from '@/Components/Landing/main/ui/VisualFeatures';
import '@mantine/notifications/styles.css';
import '../styles/landing/main.css';

export async function generateMetadata(
  { params, searchParams },
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
        'https://nexify-try.s3.ap-south-1.amazonaws.com/11d6044f-d452-4c13-b4de-e9aa1a08a164.png',
        ...previousImages,
      ],
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function Page({ params, searchParams }) {
  return (
    <div className="relative flex flex-col bg-gray-900">
      <div className="sticky top-0 z-50 bg-gray-900">
        <Navbar />
      </div>
      <div className="flex flex-col">
        <Hero />
        <VisualFeatures />
        <Features />
        <CTA />
        <Testimonial />
        <Pricing />
        <FAQs />
        <Footer />
      </div>
    </div>
  );
}
