import React from 'react';

const LayoutLoading = () => {
  return (
    <div className="h-svh w-full fixed flex items-center justify-center">
      <div
        class="animate-spin inline-block size-8 border-[4px] border-current border-t-transparent text-violet-600 rounded-full dark:text-violet-500"
        role="status"
        aria-label="loading"
      ></div>
    </div>
  );
};

export default LayoutLoading;
