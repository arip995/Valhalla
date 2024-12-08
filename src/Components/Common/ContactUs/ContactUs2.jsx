import {
  IconLocation,
  IconMail,
} from '@tabler/icons-react';
import React from 'react';

const ContactUs2 = () => {
  return (
    <div
      id="contact"
      className="container mx-auto px-4 py-12 sm:px-6"
    >
      <div className="mx-auto max-w-2xl rounded-xl bg-white/50 p-8 backdrop-blur-sm">
        <h2 className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
          Contact Us
        </h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <IconLocation className="mt-1 min-h-5 min-w-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">
                FL NO-101-D, 1ST FLOOR, BLOCK-D, SRUSTI
                ELITE, SUNDARPADA, BHUBANESWAR, KHORDHA,
                ODISHA, 751002
              </p>
            </div>
          </div>
          {/* <div className="flex items-center space-x-3">
        <IconPhone className="h-5 w-5 text-purple-600" />
        <p className="text-sm text-gray-600">
          7327039736
        </p>
      </div> */}
          <div className="flex items-center space-x-3">
            <IconMail className="h-5 w-5 text-purple-600" />
            <p className="text-sm text-gray-600">
              support@nexify.club
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs2;
