import React from 'react';
import GpayIcon from '../../../../../public/images/common/gpay.png';
import MastercardIcon from '../../../../../public/images/common/mastercard.png';
import PaytmIcon from '../../../../../public/images/common/paytm.png';
import PhonpeIcon from '../../../../../public/images/common/phonepe.png';
import VisacardIcon from '../../../../../public/images/common/visacard.png';

const ViewDPForm = ({ formatPrice, data }) => {
  return (
    <div className="space-y-6 rounded-none border border-gray-100 bg-white p-6 shadow-lg">
      <h2 className="text-xl font-medium text-gray-800">
        Payment Details
      </h2>

      {/* Payment Form */}
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-lg bg-gray-100 p-2"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">
            Phone
          </label>
          <input
            type="tel"
            className="w-full rounded-lg bg-gray-100 p-2"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Amount */}
        <div className="pt-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              Amount total
            </span>
            <span className="text-xl font-medium">
              {formatPrice(
                data.hasDiscountedPrice
                  ? data.discountedPrice
                  : data.price
              )}
            </span>
          </div>
        </div>

        {/* Payment Button */}
        <button className="w-full rounded-lg bg-purple-600 py-3 text-white transition-colors hover:bg-purple-700">
          Make Payment →
        </button>

        {/* Security Badge */}
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
