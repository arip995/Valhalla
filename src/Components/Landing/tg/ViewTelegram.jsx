import React from 'react';
import GLTelegramContainer from './GraphyLike/GlTelegramContainer';
import GLDetailsContainer from './GraphyLike/GLDetailsContainer';

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
