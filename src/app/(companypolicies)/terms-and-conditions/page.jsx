import Footer from '@/Components/Landing/main/ui/Footer';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col items-center gap-4 mr-4 ml-4 mb-4">
      <div className="h-36 w-screen bg-violet-600 "></div>
      <div className="p-8 md:p-16 flex flex-col gap-4 max-w-[750px]">
        <div className="text-2xl font-bold">
          Cancellation & Refund Policy
        </div>
        <div className="text-xl font-semibold">
          Last Updated: 30 Jun 2024
        </div>
        <div className="">
          Welcome to Nexify! These Terms and Conditions
          ("Terms") govern your use of our website and
          services. By accessing or using our platform, you
          agree to comply with and be bound by these Terms.
          If you do not agree with these Terms, please do
          not use our services.
        </div>
        <div className="text-2xl font-bold">
          1. Acceptance of Terms
        </div>
        <div className="">
          By using Nexify, you affirm that you are at least
          18 years old, or the legal age of majority in your
          jurisdiction, and are fully able and competent to
          enter into and comply with these Terms.
        </div>
        <div className="text-2xl font-bold">
          2. Changes to Terms
        </div>
        <div className="">
          We reserve the right to modify these Terms at any
          time. Any changes will be effective immediately
          upon posting the updated Terms on our website.
          Your continued use of our services after any
          changes constitutes your acceptance of the new
          Terms.
        </div>
        <div className="text-2xl font-bold">
          3. User Accounts
        </div>
        <div className="">
          a. Registration:
          <br />
          To access certain features of our platform, you
          must create an account. You agree to provide
          accurate and complete information during
          registration and to update your information as
          needed.
        </div>
        <div className="">
          b. Account Security:
          <br />
          You are responsible for maintaining the
          confidentiality of your account credentials and
          for all activities that occur under your account.
          You agree to notify us immediately of any
          unauthorized use of your account.
        </div>
        <div className="text-2xl font-bold">
          4. Use of Services
        </div>
        <div className="">
          a. Permitted Use:
          <br />
          You may use our services for lawful purposes only.
          You agree not to use our services in any way that
          violates any applicable laws or regulations.
        </div>
        <div className="">
          b. Prohibited Conduct:
          <br />
          You agree not to:
          <br />
          <ul className="list-disc flex flex-col gap-2">
            <li>
              Use our services for any fraudulent or
              unlawful purpose.
            </li>
            <li>
              Interfere with or disrupt the operation of our
              services.
            </li>
            <li>
              Upload or transmit any viruses or malicious
              code.
            </li>
            <li>
              Infringe on the intellectual property rights
              of others.
            </li>
          </ul>
        </div>
        <div className="text-2xl font-bold">5. Content</div>
        <div className="">
          a. Your Content:
          <br />
          You retain ownership of any content you upload or
          create using our services ("Your Content"). By
          posting Your Content, you grant Nexify a
          non-exclusive, royalty-free, worldwide license to
          use, display, and distribute Your Content in
          connection with our services.
        </div>
        <div className="">
          b. Prohibited Content:
          <br />
          You agree not to upload or share content that is:
          <br />
          <ul className="list-disc flex flex-col gap-2">
            <li>Illegal, harmful, or offensive.</li>
            <li>Infringing on any third-party rights.</li>
            <li>False, misleading, or deceptive.</li>
          </ul>
        </div>
        <div className="text-2xl font-bold">
          6. Payments and Refunds
        </div>
        <div className="">
          a. Payments:
          <br />
          All payments for our services are subject to our
          [Payment Terms]. You agree to pay all fees and
          charges associated with your account.
        </div>
        <div className="">
          b. Refunds:
          <br />
          Our refund policy is outlined in our [Refund
          Policy]. Please review it for details on
          requesting refunds.
        </div>
        <div className="text-2xl font-bold">
          7. Intellectual Property
        </div>
        <div className="">
          All content and materials on our platform,
          including text, graphics, logos, and software, are
          the property of Nexify or its licensors and are
          protected by intellectual property laws. You agree
          not to reproduce, distribute, or create derivative
          works from our content without our express written
          permission.
        </div>
        <div className="text-2xl font-bold">
          8. Disclaimers
        </div>
        <div className="">
          Our services are provided "as is" and "as
          available" without warranties of any kind, either
          express or implied. We do not warrant that our
          services will be uninterrupted, error-free, or
          secure.
        </div>
        <div className="text-2xl font-bold">
          9. Limitation of Liability
        </div>
        <div className="">
          To the fullest extent permitted by law, Nexify
          shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages, or
          any loss of profits or revenues, whether incurred
          directly or indirectly, or any loss of data, use,
          goodwill, or other intangible losses, resulting
          from (a) your use or inability to use our
          services; (b) any unauthorized access to or use of
          our servers and/or any personal information stored
          therein.
        </div>
        <div className="text-2xl font-bold">
          10. Indemnification
        </div>
        <div className="">
          You agree to indemnify and hold harmless Nexify
          and its affiliates, officers, agents, and
          employees from any claims, liabilities, damages,
          losses, and expenses, including reasonable
          attorneys' fees, arising out of or in any way
          connected with your use of our services or your
          violation of these Terms.
        </div>
        <div className="text-2xl font-bold">
          11. Governing Law
        </div>
        <div className="">
          These Terms shall be governed by and construed in
          accordance with the laws of State of Odisha,
          without regard to its conflict of laws principles.
          Any legal action or proceeding arising under these
          Terms will be brought exclusively in the federal
          or state courts located in State of Odisha.
        </div>
        <div className="text-2xl font-bold">
          12. Contact Us
        </div>
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
