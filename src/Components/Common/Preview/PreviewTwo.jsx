import React from 'react';

const PreviewTwo = ({ children }) => {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
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
              value="https://www.example.com"
              readOnly
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm text-gray-500 focus:outline-none"
            />
          </div>
          {/* Extra space on the right */}
          <div className="w-16"></div>
        </div>

        {/* Browser Content */}
        <div className="bg-white p-4">
          <div className="flex h-full w-full items-center justify-center bg-red-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewTwo;
