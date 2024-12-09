'use client';

import React from 'react';
import '../../styles/common/common-container.css';
import StepOneAuth from './StepOneAuth';
import useAuth from './useAuth';

const Auth = () => {
  const {
    pathname,
    emailOrPhoneNumber,
    toggleEmailOrPhoneNumber,
    showOtp,
    toggleShowOtp,
    setIsClickedAtleastOnce,
    otpForm,
    handleSubmit,
    authForm,
    loading,
  } = useAuth();

  return (
    <>
      <div className="container-animation top-container bg-gray-50">
        <div className="flex w-full flex-col items-center gap-2">
          <StepOneAuth
            loading={loading}
            pathname={pathname}
            emailOrPhoneNumber={emailOrPhoneNumber}
            toggleEmailOrPhoneNumber={
              toggleEmailOrPhoneNumber
            }
            showOtp={showOtp}
            toggleShowOtp={toggleShowOtp}
            setIsClickedAtleastOnce={
              setIsClickedAtleastOnce
            }
            otpForm={otpForm}
            handleSubmit={handleSubmit}
            authForm={authForm}
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(Auth);
