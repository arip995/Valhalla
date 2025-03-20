import DPConsume from '@/Components/Consume/DigitalProduct/DPConsume';
import React from 'react';

const page = async props => {
  const params = await props.params;
  return <DPConsume productId={params.id} />;
};

export default page;
