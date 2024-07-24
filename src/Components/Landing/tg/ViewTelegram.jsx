import React from 'react';

const ViewTelegram = ({ prefetchedData, id }) => {
  return <div>{prefetchedData?.title}</div>;
};

export default ViewTelegram;
