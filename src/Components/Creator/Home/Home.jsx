'use client';

import React from 'react';
import Header from '@/Components/Common/Header/Header';
import HomeCards from './HomeCards';
import { AllProducts } from './AllProducts';
import HomeChart from './HomeChart';

const Home = () => {
  return (
    <div>
      <Header title="Home" />
      <div className="p-4 md:p-8 flex flex-col gap-12">
        <HomeCards />
        <HomeChart />
        <AllProducts />
      </div>
    </div>
  );
};

export default Home;
