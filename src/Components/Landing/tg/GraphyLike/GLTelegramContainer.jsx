import React from 'react';
import GLProductheader from './GLProductheader';

const GLTelegramContainer = ({ data }) => {
  return (
    <div className="sticky top-0 w-full bg-white">
      <GLProductheader data={data} />
    </div>
  );
};

export default GLTelegramContainer;
