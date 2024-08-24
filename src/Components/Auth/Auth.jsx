'use client';

import { Toaster } from 'react-hot-toast';
import StepOneAuth from './StepOneAuth';
import StepTwoAuth from './StepTwoAuth';
import useAuth from './useAuth';
import '../../styles/common/common-container.css';
import React from 'react';

const Auth = () => {
  const {
    step,
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
      <div className="container-animation container">
        <div className="flex w-full flex-col items-center gap-2">
          {step === 1 ? (
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
          ) : (
            <StepTwoAuth />
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default React.memo(Auth);
