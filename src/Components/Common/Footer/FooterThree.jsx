import React from 'react';

const FooterThree = () => {
  return (
    <footer className="bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 sm:px-6">
        <div className="text-center text-sm text-gray-600">
          <p className="mb-4">
            © 2024 Polmi Software Services Technologies
            Private Limited. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/about"
              className="hover:text-purple-600"
            >
              About Us
            </a>
            <a
              href="/privacy-policy"
              className="hover:text-purple-600"
            >
              Privacy Policy
            </a>
            <a
              href="/refund-and-cancellation"
              className="hover:text-purple-600"
            >
              Refund & Cancellation
            </a>
            <a
              href="terms-and-conditions"
              className="hover:text-purple-600"
            >
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterThree;
