import Footer from '@/Components/Landing/main/ui/Footer';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col items-center gap-4 mr-4 ml-4 mb-4">
      <div className="h-36 w-screen bg-violet-600"></div>

      <div className="p-8 md:p-16 flex flex-col gap-4 max-w-[750px]">
        <div className="text-2xl font-bold">
          Privacy Policy
        </div>
        <div className="text-xl font-semibold">
          Last Updated: 30 Jun 2024
        </div>
        <div className="">
          Nexify ("we," "our," or "us") is committed to
          protecting your privacy. This Privacy Policy
          explains how we collect, use, disclose, and
          safeguard your information when you use our
          website and services. Please read this policy
          carefully to understand our views and practices
          regarding your personal data and how we will treat
          it.
        </div>
        <div className="text-xl font-semibold">
          Information We Collect
        </div>
        <div className="text-xl font-semibold">
          Personal Information:
        </div>
        <div className="">
          <ul className="list-disc flex flex-col gap-2">
            <li>
              We collect personal information that you
              provide to us, such as your name, email
              address, phone number, payment information,
              and any other information you choose to
              provide when you create an account, purchase
              our services, or interact with our support
              team.
            </li>
          </ul>
        </div>
        <div className="text-xl font-semibold">
          Usage Data:
        </div>
        <div className="">
          <ul className="list-disc flex flex-col gap-2">
            <li>
              We automatically collect certain information
              about your device and how you interact with
              our website and services. This may include
              your IP address, browser type, operating
              system, referring URLs, access times, pages
              viewed, and other usage information.
            </li>
          </ul>
        </div>
        <div className="text-xl font-semibold">
          Cookies and Tracking Technologies:
        </div>
        <div className="">
          <ul>
            <li>
              We automatically collect certain information
              about your device and how you interact with
              our website and services. This may include
              your IP address, browser type, operating
              system, referring URLs, access times, pages
              viewed, and other usage information.
            </li>
          </ul>
        </div>
        <div className="text-xl font-bold">
          How We Use Your Information
        </div>
        <div className="">
          We use the information we collect in the following
          ways:
        </div>
        <ul className="list-disc flex flex-col gap-2">
          <li>
            <span className="font-bold">
              To Provide and Maintain Our Services:{' '}
            </span>
            To operate and provide you with our services,
            including creating and managing your account,
            processing transactions, and providing customer
            support.
          </li>
          <li>
            <span className="font-bold">
              To Improve Our Services:{' '}
            </span>
            To understand how our users interact with our
            services, identify trends, and improve our
            offerings and user experience.
          </li>
          <li>
            <span className="font-bold">
              To Communicate With You:{' '}
            </span>
            To send you updates, newsletters, marketing
            materials, and other information that may be of
            interest to you. You can opt-out of receiving
            these communications at any time.
          </li>
          <li>
            <span className="font-bold">
              To Enforce Our Policies:
            </span>
            To ensure compliance with our terms of service,
            policies, and to protect the rights, property,
            or safety of Nexify, our users, or others.
          </li>
          <li>
            <span className="font-bold">
              To Comply with Legal Obligations:{' '}
            </span>
            To comply with applicable laws, regulations, and
            legal processes.
          </li>
        </ul>
        <div className="text-xl font-bold">
          How We Share Your Information
        </div>
        <div className="">
          We may share your information with:
        </div>
        <ul className="list-disc flex flex-col gap-2">
          <li>
            <span className="font-bold">
              Service Providers:{' '}
            </span>
            Third-party vendors and service providers that
            perform services on our behalf, such as payment
            processing, data analysis, email delivery,
            hosting services, customer service, and
            marketing assistance.
          </li>
          <li>
            <span className="font-bold">
              Business Transfers:{' '}
            </span>
            In the event of a merger, acquisition, or sale
            of all or a portion of our assets, your
            information may be transferred to the acquiring
            company.
          </li>
          <li>
            <span className="font-bold">
              Legal Requirements:{' '}
            </span>
            When required by law or in response to valid
            legal processes, such as a subpoena, court
            order, or government request.
          </li>
          <li>
            <span className="font-bold">
              Protection of Rights:
            </span>
            To protect and defend the rights, property, or
            safety of Nexify, our users, or others.
          </li>
        </ul>
        <div className="text-xl font-bold">
          Data Security
        </div>
        <div className="">
          We use administrative, technical, and physical
          security measures to protect your personal
          information. While we strive to use commercially
          acceptable means to protect your personal data, we
          cannot guarantee its absolute security.
        </div>
        <div className="text-xl font-bold">
          Your Privacy Rights
        </div>
        <div className="">
          Depending on your location, you may have certain
          rights regarding your personal information,
          including:
        </div>
        <ul className="list-disc flex flex-col gap-2">
          <li>
            The right to access, update, or delete the
            personal information we hold about you.
          </li>
          <li>
            The right to object to or restrict the
            processing of your personal data.
          </li>
          <li>
            The right to withdraw your consent at any time
            where we rely on your consent to process your
            personal information.
          </li>
        </ul>
        <div className="">
          To exercise any of these rights, please contact us
          at [Contact Information].
        </div>
        <div className="text-xl font-bold">
          Changes to This Privacy Policy
        </div>
        <div className="">
          We may update our Privacy Policy from time to
          time. We will notify you of any changes by posting
          the new Privacy Policy on this page and updating
          the "Last Updated" date. You are advised to review
          this Privacy Policy periodically for any changes.
        </div>
        <div className="text-xl font-bold">Contact Us</div>
        <ul className="list-disc flex flex-col gap-2">
          <li>
            <span className="font-bold">Email:</span>
            support@nexify.club
          </li>
          <li>
            <span className="font-bold">Address:</span>
            D-101 Shrusti Elite, Sunderpada Bhubaneswar
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default page;
