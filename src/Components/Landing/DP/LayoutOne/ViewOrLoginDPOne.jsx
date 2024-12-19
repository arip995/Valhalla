'use client';

import AuthModal from '@/Components/Auth/LandingAuth/AuthModal';
import { checkIfPurchased } from '@/Utils/Common';
import useUser from '@/Utils/Hooks/useUser';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const ViewOrLoginDPOne = ({ productId }) => {
  const countRef = useRef();
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [purchased, setPurchased] = useState(-1);
  const [opened, setOpened] = useState(false);
  const check = async () => {
    setPurchased(
      await checkIfPurchased(productId, user._id)
    );
  };

  useEffect(() => {
    countRef.current = 1;
    if (!countRef.current) return;
    if (user?._id) {
      check();
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user?._id]);

  return (
    <>
      {!isLoggedIn ? (
        <div className="border-l-4 border-violet-400 bg-gray-50 px-4 py-1 text-sm">
          <div className="flex">
            <div className="flex-1">
              Already made a payment on this page?
              <button
                className="ml-1 text-blue-600 hover:text-blue-700"
                onClick={() => {
                  setOpened(true);
                }}
              >
                Sign in to view details
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {purchased && purchased !== -1 ? (
            <div className="border-l-4 border-green-400 bg-green-50 px-4 py-1 text-sm">
              <div className="flex">
                <div className="flex-1">
                  Your last purchase was successful!
                  <Link
                    href={`/consume/dp/${productId}`}
                    className="ml-1 text-blue-600 hover:text-blue-700"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
      {!!opened && (
        <AuthModal
          opened={opened}
          onClose={() => setOpened(false)}
          onAuthComplete={() => {
            setOpened(false);
          }}
        />
      )}
    </>
  );
};

export default ViewOrLoginDPOne;
