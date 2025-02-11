import React from 'react';
import GpayIcon from '../../../../../public/images/common/gpay.png';
import MastercardIcon from '../../../../../public/images/common/mastercard.png';
import PaytmIcon from '../../../../../public/images/common/paytm.png';
import PhonpeIcon from '../../../../../public/images/common/phonepe.png';
import VisacardIcon from '../../../../../public/images/common/visacard.png';
import ViewRegistrationQuestions from '@/Components/Common/SectionDetails/RgistrationQuestion/ViewRegistrationQuestions';

const ViewDPForm = ({ data }) => {
  return (
    <div className="space-y-6 rounded-none border border-gray-100 bg-white p-6 shadow-lg">
      <h2 className="text-xl font-medium text-gray-800">
        Payment Details
      </h2>

      {/* Payment Form */}
      <div className="space-y-4">
        <ViewRegistrationQuestions data={data} />

        {/* Security Badge */}
        {/* <div className="text-center text-sm text-gray-600">
          Please ensure your email and phone number are
          correct.
        </div> */}
        <div className="text-center text-sm text-gray-600">
          Guaranteed safe & secure payment
        </div>

        {/* Payment Methods */}
        <div className="flex justify-center space-x-4">
          <img
            className="h-12 w-auto transition-transform hover:scale-105"
            src={PhonpeIcon.src}
            alt="PhonePe"
          />
          <img
            className="h-12 w-auto transition-transform hover:scale-105"
            src={GpayIcon.src}
            alt="Google Pay"
          />
          <img
            className="h-12 w-auto transition-transform hover:scale-105"
            src={PaytmIcon.src}
            alt="Paytm"
          />
          <img
            className="h-12 w-auto transition-transform hover:scale-105"
            src={MastercardIcon.src}
            alt="Mastercard"
          />
          <img
            className="h-12 w-auto transition-transform hover:scale-105"
            src={VisacardIcon.src}
            alt="Visa"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewDPForm;
