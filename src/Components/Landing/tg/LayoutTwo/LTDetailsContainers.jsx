import DisclaimerSebi from '@/Components/Common/Footer/DisclaimerSebi';
import FooterTwo from '@/Components/Common/Footer/FooterTwo';
import ViewPlans2 from '@/Components/Common/General/ViewPlans2';
import ViewProfile from '@/Components/Common/General/ViewProfile';
import {
  Spoiler,
  TypographyStylesProvider,
} from '@mantine/core';
import FAQs3 from '../../main/ui/FAQs/FAQs3';
import Disclaimer from '@/Components/Common/Footer/Disclaimer';

const LTDetailsContainer = ({ data }) => {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-lg flex-col gap-8 p-6 shadow-lg">
          <div className="w-full">
            <ViewProfile
              profilePic={
                data.coverImage?.url ||
                data.creatorDetails.profilePic
              }
              name={`${data.creatorDetails.firstName} ${data.creatorDetails.lastName}`}
              username={data.creatorDetails.username}
            />
            <div className="mb-4 mt-2 text-xl font-semibold text-black">
              {data.title}
            </div>
            <div className="flex-flex-col">
              {/* <div className="text-sm font-semibold text-gray-700">
                About this offering
              </div> */}
              <div className="mb-4 mt-2 flex gap-2 text-sm">
                <div className="shadow-xs rounded-sm bg-gray-100 px-2 py-1">
                  {data.genre}
                </div>
                <div className="rounded-sm bg-gray-100 px-2 py-1 shadow-sm">
                  ⚡️{data.subscriptionPlans.length} Plans
                </div>
              </div>
            </div>
            <div className="mb-4 flex w-full flex-col gap-2 rounded-md">
              {/* <div className="text-md text-gray-600">
                Description
              </div> */}
              {!!data?.description && (
                <Spoiler
                  maxHeight={150}
                  showLabel="Show more"
                  hideLabel="Hide"
                >
                  <TypographyStylesProvider>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.description,
                      }}
                    />
                  </TypographyStylesProvider>
                </Spoiler>
              )}
            </div>
            <ViewPlans2 data={data} />
          </div>
          <Disclaimer showTitle={false} />
          <DisclaimerSebi showTitle={false} />
          <FAQs3 />
        </div>
      </div>
      {/* <div className="mx-auto my-6 w-full max-w-lg"></div> */}
      <div className="mt-4 block md:hidden">
        <FooterTwo />
      </div>
      {/* <div className="sticky bottom-0 md:hidden">
        <GLManagePlans data={data} />
      </div> */}
    </>
  );
};

export default LTDetailsContainer;
