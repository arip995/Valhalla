import React from 'react';

const LayoutLoading = () => {
  return (
    <div className="fixed flex h-svh w-full items-center justify-center">
      <div
        className="inline-block size-8 animate-spin rounded-full border-[4px] border-current border-t-transparent text-violet-600 dark:text-violet-500"
        role="status"
        aria-label="loading"
      ></div>
    </div>
  );
};

export default LayoutLoading;
