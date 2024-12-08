'use client';

import Header from '@/Components/Common/Header/Header';
import KycCard from '@/Components/Common/KycCard';
import CompleteProfileModal from '@/Components/Common/Modal/CompleteProfileModal';
import useUser from '@/Utils/Hooks/useUser';
import { useEffect, useState } from 'react';
import HomeCards from './HomeCards';
import { AllProducts } from './AllProducts';

const Home = () => {
  const { user, setUserData } = useUser();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) {
      setUserData();
    }
  }, [opened]);

  if (!user?._id || user === -1) return null;

  return (
    <>
      <div className="flex h-[calc(100vh-52px)] w-full flex-col md:h-screen">
        <Header title="Home" />
        <div className="flex flex-1 flex-col gap-12 overflow-y-auto p-4 md:p-8">
          {!user.isKycDone ? (
            <KycCard
              onClick={() => {
                setOpened(prev => !prev);
              }}
            />
          ) : (
            <HomeCards />
          )}
          <AllProducts />

          {/* <HomeChart /> */}
        </div>
      </div>
      {!!opened && (
        <CompleteProfileModal
          opened={opened}
          onClose={() => setOpened(false)}
        />
      )}
    </>
  );
};

export default Home;
