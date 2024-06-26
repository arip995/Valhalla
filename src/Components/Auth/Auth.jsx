'use client';

import { Toaster } from 'react-hot-toast';
import StepOneAuth from './StepOneAuth';
import StepTwoAuth from './StepTwoAuth';
import useAuth from './useAuth';
import '../../styles/auth/auth.css';

const Auth = props => {
  const {
    step,
    loginOrRegister,
    toggleLoginOrRegister,
    emailOrPhoneNumber,
    toggleEmailOrPhoneNumber,
    showOtp,
    toggleShowOtp,
    setIsClickedAtleastOnce,
    otpForm,
    handleSubmit,
    authForm,
    loading,
  } = useAuth({ tabName: props.tabName });

  return (
    <>
      <div className="signup-container signup-container-animation">
        <div className="w-full flex  flex-col items-center gap-2">
          {step === 1 ? (
            <StepOneAuth
              loading={loading}
              loginOrRegister={loginOrRegister}
              toggleLoginOrRegister={toggleLoginOrRegister}
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

export default Auth;
