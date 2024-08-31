import Disclaimer from '@/Components/Common/Footer/Disclaimer';
import ViewProductHeader from '@/Components/Common/Header/ViewProductHeader';
import GLManagePlans from './GLManagePlans';
import FooterTwo from '@/Components/Common/Footer/FooterTwo';

const GLDetailsContainer = ({ data }) => {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="block w-full max-w-[768px] gap-8 p-4 md:flex">
          <div className="w-full md:w-7/12">
            <ViewProductHeader
              profilePic={
                data.coverImage?.url ||
                data.creatorDetails.profilePic
              }
              firstName={data.creatorDetails.firstName}
              lastName={data.creatorDetails.lastName}
              username={data.creatorDetails.username}
            />
            <div className="leading-title1 mb-8 mt-6 text-xl font-semibold text-black">
              {data.title}
            </div>
            <div className="flex-flex-col">
              <div className="text-sm font-semibold text-gray-900">
                About this offering
              </div>
              <div className="mb-4 mt-2 flex gap-2">
                <div className="rounded-sm bg-gray-100 px-2 py-1 shadow-sm">
                  {data.genre}
                </div>
                <div className="rounded-sm bg-gray-100 px-2 py-1 shadow-sm">
                  ⚡️{data.subscriptionPlans.length} Plans
                </div>
              </div>
            </div>
            {!!data?.description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.description,
                }}
              ></div>
            )}
            <Disclaimer showTitle={false} />
            <div className="mb-16 mt-4 block md:hidden">
              <FooterTwo />
            </div>
          </div>

          <div className="w-full md:w-5/12">
            <GLManagePlans data={data} />
          </div>
        </div>
      </div>
      {/* <div className="sticky bottom-0 md:hidden">
        <GLManagePlans data={data} />
      </div> */}
    </>
  );
};

export default GLDetailsContainer;
