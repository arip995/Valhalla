import Footer from '@/Components/Landing/main/ui/Footer';
import React from 'react';

const Page = () => {
  return (
    <div className="flex flex-col items-center gap-4 mr-4 ml-4 mb-4">
      <div className="h-36 w-screen bg-violet-600 "></div>

      <div className="p-8 md:p-16 flex flex-col gap-4 max-w-[750px]">
        <div className="text-2xl font-bold">
          Terms and Conditions
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
