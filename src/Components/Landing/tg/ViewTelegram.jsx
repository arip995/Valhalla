import React from 'react';
import GLTelegramContainer from './GraphyLike/GlTelegramContainer';

const ViewTelegram = ({ prefetchedData }) => {
  console.log(prefetchedData);
  return (
    <div className="min-h-svh w-full bg-white">
      <GLTelegramContainer data={prefetchedData} />
    </div>
  );
};

export default ViewTelegram;

// <div
//       dangerouslySetInnerHTML={{
//         __html: prefetchedData?.description,
//       }}
//     ></div>
