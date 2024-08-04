import Disclaimer from '@/Components/Common/Footer/Disclaimer';
import ViewProductHeader from '@/Components/Common/Header/ViewProductHeader';
import React from 'react';

const GLDetailsContainer = ({ data }) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-[768px] gap-8 p-2 md:p-4">
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
          <div className="my-4 flex gap-2">
            <div className="rounded-sm bg-gray-100 px-2 py-1 shadow-sm">
              {data.genre}
            </div>
            <div className="rounded-sm bg-gray-100 px-2 py-1 shadow-sm">
              ⚡️{data.subscriptionPlans.length} Plans
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
        </div>
        <div className="hidden w-5/12 md:block"></div>
      </div>
    </div>
  );
};

export default GLDetailsContainer;
