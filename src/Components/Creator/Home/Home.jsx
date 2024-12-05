'use client';

import Header from '@/Components/Common/Header/Header';
import CompleteProfileModal from '@/Components/Common/Modal/CompleteProfileModal';
import useUser from '@/Utils/Hooks/useUser';
import { Button } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { AllProducts } from './AllProducts';
import HomeCards from './HomeCards';

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
          {user?.isKycDone ? (
            <>
              <HomeCards />
              {/* <HomeChart /> */}
            </>
          ) : (
            <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
              <div className="mb-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#7950f2] text-white">
                  <IconUser size={28} stroke={2.5} />
                </div>
              </div>

              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Complete Your KYC
              </h2>

              <p className="mb-6 text-gray-600">
                Please complete your KYC process to continue
                using our platform. This ensures the
                security of your account and provides you
                with full access.
              </p>

              <Button
                fullWidth
                onClick={() => {
                  setOpened(prev => !prev);
                }}
              >
                Continue
              </Button>
            </div>
          )}
          <AllProducts />
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
