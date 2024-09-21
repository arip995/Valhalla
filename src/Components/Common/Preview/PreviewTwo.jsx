import React from 'react';

const PreviewTwo = ({ children }) => {
  return (
    <div className="flex h-full w-full max-w-3xl items-center justify-center p-8">
      <div className="h-full w-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
        {/* Browser Header */}
        <div className="flex items-center justify-between border-b border-gray-300 bg-gray-200 px-4 py-2">
          <div className="flex items-center space-x-2">
            {/* Safari Buttons */}
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          {/* Address Bar */}
          <div className="mx-4 flex-grow">
            <input
              type="text"
              value="https://www.nexify.club"
              readOnly
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm text-gray-500 focus:outline-none"
            />
          </div>
          {/* Extra space on the right */}
          <div className="w-16"></div>
        </div>

        {/* Browser Content */}
        <div className="bg-white p-4">
          <div className="h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden rounded-b-2xl border-b-8 border-l-8 border-r-8 bg-white p-4 md:h-[calc(100vh-18rem)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewTwo;
