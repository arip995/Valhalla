import ContactUs2 from '@/Components/Common/ContactUs/ContactUs2';
import FooterThree from '@/Components/Common/Footer/FooterThree';
import LandingHeader from '@/Components/Common/Header/LandingHeader';
import CompareTable from '../ui/Compare/CompareTable';
import FAQs2 from '../ui/FAQs/FAQs2';
import Hero2 from '../ui/Hero/Hero2';
import Features2 from '../ui/Features/Features2';

const LandingPage = () => {
  return (
    <div className="hide-scrollbar min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation - Enhanced with dropdown hover effects */}
      <LandingHeader />

      {/* Hero Section - Completely revamped */}
      <Hero2 />

      {/* Features */}
      <Features2 />

      {/* Compare table */}
      <CompareTable />

      {/* Testimonials */}
      {/* <Testimonial2 /> */}

      {/* Blog Highlights Section */}
      {/* <Blog /> */}

      {/* FAQ Section */}
      <FAQs2 />

      {/* Contact Section */}
      <ContactUs2 />

      {/* Footer */}
      <FooterThree />

      {/* Final Call to Action */}
      {/* <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 py-12 text-white">
        <div className="absolute inset-0 bg-[url('/cta-background.jpg')] bg-cover bg-fixed opacity-30 blur-lg" />
        <div className="container relative mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
              Ready to Build Your Digital Empire?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              Sign up today and take the first step toward
              monetizing your passion and content.
            </p>
            <div className="flex w-full justify-center">
              <LandingPageButton />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LandingPage;
