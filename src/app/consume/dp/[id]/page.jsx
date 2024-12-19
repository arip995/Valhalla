import DPConsume from '@/Components/Consume/DigitalProduct/DPConsume';
import React from 'react';

const page = ({ params }) => {
  return <DPConsume productId={params.id} />;
};

export default page;
