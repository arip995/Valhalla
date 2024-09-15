import React from 'react';

const Preview = ({ children }) => {
  return (
    <div className="relative hidden h-full w-full overflow-hidden lg:block">
      <div className="absolute inset-0 flex flex-col">
        {[...Array(20)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex flex-grow">
            {[...Array(20)].map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="flex-grow border border-gray-800 bg-gray-900"
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="relative z-10 p-4 md:p-10">
        <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg">
          <div className="overflow-hidden rounded-lg">
            {/* Browser toolbar */}
            <div className="flex items-center bg-gray-800 px-2 py-1">
              <div className="mr-2 flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto w-full rounded-md bg-gray-500 px-4 py-1 text-center text-[10px] text-gray-50 md:w-6/12">
                nexify.club/course/
              </div>
            </div>

            {/* Content area */}
            <div className="h-[calc(100vh-6rem)] rounded-b-2xl border-b-8 border-l-8 border-r-8 border-gray-800 bg-white p-4 md:h-[calc(100vh-18rem)]">
              {/* Render your content here */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
