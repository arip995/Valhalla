import React from 'react';
import GLDetailsContainer from './GraphyLike/GLDetailsContainer';
import GLTelegramContainer from './GraphyLike/GLTelegramContainer';
import FooterTwo from '@/Components/Common/Footer/FooterTwo';

const ViewTelegram = ({ prefetchedData }) => {
  console.log(prefetchedData);
  return (
    <div className="flex min-h-svh w-full flex-col bg-white">
      <GLTelegramContainer data={prefetchedData} />
      <div className="flex flex-1 flex-col justify-between">
        <GLDetailsContainer data={prefetchedData} />
        <div className="hidden md:block">
          <FooterTwo />
        </div>
      </div>
    </div>
  );
};

export default ViewTelegram;
