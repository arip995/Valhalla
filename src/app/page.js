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
        'https://nexify-try.s3.ap-south-1.amazonaws.com/499766c5-b634-4ec9-a0f6-1a2bc19a591a.png',
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
  return (
    <div className="relative flex flex-col bg-gray-900">
      <div className="fixed top-0 z-50 w-full bg-gray-900">
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
