import React from 'react';

const ViewTelegram = ({ prefetchedData, productId }) => {
  console.log(productId);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: prefetchedData?.description,
      }}
    ></div>
  );
};

export default ViewTelegram;
