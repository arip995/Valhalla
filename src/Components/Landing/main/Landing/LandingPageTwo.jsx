import React from 'react';
import Navbar from '../ui/Navbar';
import Hero from '../ui/Hero';
import VisualFeatures from '../ui/VisualFeatures';
import Features from '../ui/Features';
import CTA from '../ui/CTA';
import Testimonial from '../ui/Testimonial';
import FAQs from '../ui/FAQs';
import ContactUs from '@/Components/Common/ContactUs/ContactUs';
import Footer from '../ui/Footer';

const LandingPageTwo = () => {
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
        {/* <Pricing /> */}
        <FAQs />
        <ContactUs />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPageTwo;
