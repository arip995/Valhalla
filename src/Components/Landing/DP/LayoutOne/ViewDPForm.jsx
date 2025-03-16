import PaymentProviderImages from '@/Components/Common/Payment/PaymentProviderImages';
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
        <PaymentProviderImages />
      </div>
    </div>
  );
};

export default ViewDPForm;
