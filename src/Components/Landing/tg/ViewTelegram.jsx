import React from 'react';

const ViewTelegram = ({ prefetchedData, id }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: prefetchedData?.description,
      }}
    ></div>
  );
};

export default ViewTelegram;
