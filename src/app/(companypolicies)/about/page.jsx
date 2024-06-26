import Footer from '@/Components/Landing/main/ui/Footer';
import React from 'react';

const Page = () => {
  return (
    <div className="flex flex-col items-center gap-4 mr-4 ml-4 mb-4 ">
      <div className="h-36 w-screen bg-violet-600"></div>
      <div className="p-8 md:p-16 flex flex-col gap-4 max-w-[750px]">
        <div className="text-xl font-semibold">
          About Us
        </div>
        <div className="">
          {`Welcome to Nexify, the all-in-one solution for
          creators to monetize their content effortlessly.
          We understand the value of your expertise and
          passion, and we're here to help you turn it into a
          profitable venture. Our comprehensive platform is
          designed to empower you to create, manage, and
          monetize courses, webinars, events, and
          communities with ease.`}
        </div>
        <div className="text-xl font-semibold">
          Our Mission
        </div>
        <div className="">
          {`Our mission is to provide creators with the tools
          and support they need to share their knowledge,
          engage their audience, and generate sustainable
          income. We believe in the power of knowledge
          sharing and aim to make it accessible and
          profitable for everyone.`}
        </div>
        <div className="text-xl font-semibold">
          What We Offer
        </div>
        <ul className="list-disc flex flex-col gap-2">
          <li>
            Course Creation and Management: Develop and
            manage engaging courses with our user-friendly
            tools, designed to help you deliver high-quality
            content and maximize your reach.
          </li>
          <li>
            Webinar and Event Management: Host seamless
            webinars and events, engage with your audience
            in real-time, and monetize your live sessions
            effortlessly.
          </li>
          <li>
            Community Management: Build and nurture vibrant
            communities where members can interact, learn,
            and grow together, all while generating revenue.
          </li>
          <li>
            Payment Solutions: Our integrated payment
            options ensure you get paid promptly and
            securely, with multiple methods available to
            suit your needs.
          </li>
          <li>
            24/7 Support: Our dedicated support team is
            available around the clock to assist you with
            any questions or issues, ensuring a smooth and
            hassle-free experience.
          </li>
        </ul>
        <div className="text-xl font-semibold">
          Why Choose Us?
        </div>
        <div className="">
          {' '}
          {`At nexify, we are committed to your success. Our
          platform is built with creators in mind, offering
          intuitive features, robust analytics, and flexible
          monetization options. Whether you're an educator,
          expert, or content creator, we provide the
          resources you need to thrive in the digital`}
          marketplace.
        </div>
        <div className="">
          {`Join our community of successful creators and
          start monetizing your content today. With Nexify,
          the possibilities are endless.`}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
