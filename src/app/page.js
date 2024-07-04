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

export const metadata = {
  title:
    'Nexify: all-in-one platform for your digital products and services',
  description:
    'The all-in-one platform for your digital products and services',
  openGraph: {
    images: [
      'https://nexify-try.s3.ap-south-1.amazonaws.com/a4aa635c-bae8-4b6a-9201-fd48eb3175fd.png',
    ],
  },
};

export default function Page() {
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
