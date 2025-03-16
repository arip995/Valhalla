import React from 'react';
import GpayIcon from '../../../../public/images/common/gpay.png';
import MastercardIcon from '../../../../public/images/common/mastercard.png';
import PaytmIcon from '../../../../public/images/common/paytm.png';
import PhonpeIcon from '../../../../public/images/common/phonepe.png';
import VisacardIcon from '../../../../public/images/common/visacard.png';

const PaymentProviderImages = ({
  size = 'h-12',
  spacing = 'space-x-4',
}) => {
  return (
    <div className={`flex justify-center ${spacing}`}>
      <img
        className={`${size} w-auto transition-transform hover:scale-105`}
        src={PhonpeIcon.src}
        alt="PhonePe"
      />
      <img
        className={`${size} w-auto transition-transform hover:scale-105`}
        src={GpayIcon.src}
        alt="Google Pay"
      />
      <img
        className={`${size} w-auto transition-transform hover:scale-105`}
        src={PaytmIcon.src}
        alt="Paytm"
      />
      <img
        className={`${size} w-auto transition-transform hover:scale-105`}
        src={MastercardIcon.src}
        alt="Mastercard"
      />
      <img
        className={`${size} w-auto transition-transform hover:scale-105`}
        src={VisacardIcon.src}
        alt="Visa"
      />
    </div>
  );
};

export default PaymentProviderImages;
