'use client';

import Header from '@/Components/Common/Header/Header';
import { AllProducts } from './AllProducts';
import HomeCards from './HomeCards';
import HomeChart from './HomeChart';

const Home = () => {
  return (
    <>
      <div className="flex h-[calc(100vh-52px)] w-full flex-col md:h-screen">
        <Header title="Home" />
        <div className="flex flex-1 flex-col gap-12 overflow-y-auto p-4 md:p-8">
          <HomeCards />
          <HomeChart />
          <AllProducts />
        </div>
      </div>
    </>
  );
};

export default Home;
