import { Alert, Button, Notification } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import Hero from '@/Components/Landing/main/ui/Hero';
import VisualFeatures from '@/Components/Landing/main/ui/VisualFeatures';
import Features from '@/Components/Landing/main/ui/Features';
import CTA from '@/Components/Landing/main/ui/CTA';
import Testimonial from '@/Components/Landing/main/ui/Testimonial';
import Pricing from '@/Components/Landing/main/ui/Pricing';
import FAQs from '@/Components/Landing/main/ui/FAQs';
import '../styles/landing/main.css';
import Navbar from '@/Components/Landing/main/ui/Navbar';
import Footer from '@/Components/Landing/main/ui/Footer';

export const metadata = {
  title:
    'Nexify: all-in-one platform for your digital products and services',
  description:
    'The all-in-one platform for your digital products and services',
  openGraph: {
    images: ['../../public/images/main/user6.webp'],
  },
};

export default function Page() {
  return (
    <div className="flex flex-col bg-gray-900 relative">
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
    // <div className="w-100 bg-white min-h-[100vh] text-black">
    //   <Button
    //     variant="filles"
    //     onClick={() =>
    //       notifications.show({
    //         variant: 'filled',
    //         withBorder: true,
    //         color: 'green',
    //         title: 'Default notification',
    //         message: 'Hey there, your code is awesome! 🤥',
    //       })
    //     }
    //   >
    //     Click
    //   </Button>
    // </div>
  );
}
