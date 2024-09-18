import Disclaimer from '@/Components/Common/Footer/Disclaimer';
import FooterTwo from '@/Components/Common/Footer/FooterTwo';
import ViewProfile from '@/Components/Common/General/ViewProfile';
import ClientSpoiler from './ClientSpoiler';
import ViewPlans2 from '@/Components/Common/General/ViewPlans2';

const LTDetailsContainer = ({ data }) => {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-md flex-col gap-8 p-4">
          <div className="w-full">
            <ViewProfile
              profilePic={
                data.coverImage ||
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
                <ClientSpoiler>
                  <div
                    className="prose prose-sm prose-p:mx-0 [&>p]:my-4"
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                  ></div>
                </ClientSpoiler>
              )}
            </div>
            <ViewPlans2 data={data} />
          </div>
          <Disclaimer showTitle={false} />
        </div>
      </div>
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
