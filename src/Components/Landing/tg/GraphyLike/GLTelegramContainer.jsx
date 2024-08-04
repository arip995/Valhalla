import React from 'react';
import GLProductheader from './GLProductheader';

const GLTelegramContainer = ({ data }) => {
  return (
    <div className="min-h-svh w-full bg-white">
      <GLProductheader data={data} />
    </div>
  );
};

export default GLTelegramContainer;
