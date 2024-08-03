'use client';

import Header from '@/Components/Common/Header/Header';
import { AllProducts } from './AllProducts';
import HomeCards from './HomeCards';
import HomeChart from './HomeChart';

const Home = () => {
  return (
    <div className="top-container">
      <Header title="Home" />
      <div className="flex flex-col gap-12 p-4 md:p-8">
        <HomeCards />
        <HomeChart />
        <AllProducts />
      </div>
    </div>
  );
};

export default Home;
