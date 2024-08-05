import React from 'react';
import GLDetailsContainer from './GraphyLike/GLDetailsContainer';
import GLTelegramContainer from './GraphyLike/GLTelegramContainer';

const ViewTelegram = ({ prefetchedData }) => {
  console.log(prefetchedData);
  return (
    <div className="min-h-svh w-full bg-white">
      <GLTelegramContainer data={prefetchedData} />
      <GLDetailsContainer data={prefetchedData} />
    </div>
  );
};

export default ViewTelegram;
