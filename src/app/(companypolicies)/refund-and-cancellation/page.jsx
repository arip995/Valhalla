import Footer from '@/Components/Landing/main/ui/Footer';
import React from 'react';

const Page = () => {
  return (
    <div className="mb-4 ml-4 mr-4 flex flex-col items-center gap-4">
      <div className="h-36 w-screen bg-violet-600"></div>

      <div className="flex max-w-[750px] flex-col gap-4 p-8 md:p-16">
        <h1 className="mb-4 text-center text-3xl font-bold">
          Refund and Cancellation Policy
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          At{' '}
          <strong>
            POLMI SOFTWARE SERVICES TECHNOLOGIES PRIVATE
            LIMITED
          </strong>
          , we are committed to providing high-quality
          products and services to our customers. Please
          note the following policy regarding refunds and
          cancellations:
        </p>

        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-semibold text-gray-800">
            Refund Policy
          </h2>
          <ul className="ml-6 list-disc text-gray-700">
            <li>
              <strong>No Refunds:</strong> Once a purchase
              is made, it is considered final. We do not
              offer refunds for any product or service under
              any circumstances.
            </li>
            <li>
              This policy applies to all transactions
              completed on our platform.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-semibold text-gray-800">
            Cancellation Policy
          </h2>
          <ul className="ml-6 list-disc text-gray-700">
            <li>
              <strong>No Cancellations:</strong> Orders or
              subscriptions cannot be canceled once they
              have been processed or confirmed.
            </li>
            <li>
              We encourage you to review your purchase
              carefully before completing the transaction.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-semibold text-gray-800">
            Why No Refunds or Cancellations?
          </h2>
          <p className="text-gray-700">
            Our products and services are digital in nature,
            and access is granted immediately upon purchase.
            This ensures the delivery of value but makes it
            impossible to reverse the transaction.
          </p>
          <p className="text-gray-700">
            This policy helps us maintain fairness and
            consistency across all customer interactions.
          </p>
        </div>
        {/* <div className="text-2xl font-bold">
          Terms and Conditions
        </div>
        <div className="">
          Cancellation & Refund Policy Last updated on
          12-11-2024 13:47:41 POLMI SOFTWARE SERVICES
          TECHNOLOGIES PRIVATE LIMITED believes in helping
          its customers as far as possible, and has
          therefore a liberal cancellation policy. Under
          this policy: • Cancellations will be considered
          only if the request is made immediately after
          placing the order. However, the cancellation
          request may not be entertained if the orders have
          been communicated to the vendors/merchants and
          they have initiated the process of shipping them.
          • POLMI SOFTWARE SERVICES TECHNOLOGIES PRIVATE
          LIMITED does not accept cancellation requests for
          perishable items like flowers, eatables etc.
          However, refund/replacement can be made if the
          customer establishes that the quality of product
          delivered is not good. • In case of receipt of
          damaged or defective items please report the same
          to our Customer Service team. The request will,
          however, be entertained once the merchant has
          checked and determined the same at his own end.
          This should be reported within 7 Days days of
          receipt of the products. In case you feel that the
          product received is not as shown on the site or as
          per your expectations, you must bring it to the
          notice of our customer service within 7 Days days
          of receiving the product. The Customer Service
          Team after looking into your complaint will take
          an appropriate decision. • In case of complaints
          regarding products that come with a warranty from
          manufacturers, please refer the issue to them. In
          case of any Refunds approved by the POLMI SOFTWARE
          SERVICES TECHNOLOGIES PRIVATE LIMITED, it’ll take
          9-15 Days days for the refund to be processed to
          the end customer.
        </div>
        <div className="">
          If you decide to purchase a plan, it is important
          to understand that your subscription will
          automatically renew and you will be charged on a
          recurring basis until you choose to cancel your
          subscription. The cancellation may not take effect
          until the next billing cycle.
          <br />
          If you have set your subscription for auto-renewal
          at the end of each billing cycle, you can cancel
          it by adjusting your account settings. For users
          who make payments through third-party
          applications, the subscription can be cancelled by
          modifying the relevant options within those
          applications. Alternatively, you can reach out to
          our customer care team or send an email to
          support@nexify.club for assistance with cancelling
          your subscription. Once the company receives your
          email or request for cancellation, the
          auto-renewal feature will be deactivated
          accordingly.
          <br />
          Please note that even after cancellation, you will
          still have access to the service until the end of
          your current billing cycle.
        </div>
        <div className="text-2xl font-bold">
          If you decide to purchase a plan, it is important
          to understand that your subscription will
          automatically renew and you will be charged on a
          recurring basis until you choose to cancel your
          subscription. The cancellation may not take effect
          until the next billing cycle.
        </div>
        <div className="">
          Version 1: If you decide not to utilize your
          subscription, you will still have access to the
          Service until the end of your current billing
          cycle. However, please note that choosing not to
          use the services after subscribing does not
          entitle you to a refund for the unused portion of
          your subscription.
          <br />
          Version 2: In the event that you opt not to
          utilize your subscription, rest assured that you
          will retain access to the Service until the
          conclusion of your ongoing billing cycle. It is
          important to note, however, that refraining from
          using the services following subscription does not
          warrant a refund for either the entire or partial
          unused subscription.
          <br />
          Version 3: By deleting your account, it is crucial
          to understand that you will forfeit any remaining
          paid time and services within your subscription.
          During the account deletion process, you
          explicitly agree to relinquish the unused time and
          services in your current paid subscription,
          acknowledging that no refund will be provided for
          the Service.
          <br />
          Version 4: We retain the right to modify these
          terms and conditions at any given time. This may
          include altering the existing terms or introducing
          additional terms that are applicable to the
          service, such as reflecting changes in the law or
          our services. It is advisable to regularly review
          the terms. Your continued use of the services
          following an amendment will be considered as an
          acceptance of the modified terms and conditions.
          <br />
          Version 5: These terms should be read in
          conjunction with the Terms and Conditions
          available <a href="terms-and-conditions">here</a>.
          All terms defined therein carry the same meaning
          as stated in the Terms and Conditions document.
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
