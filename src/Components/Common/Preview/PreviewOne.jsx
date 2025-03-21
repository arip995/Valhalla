import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconExternalLink,
  IconX,
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const PreviewOne = ({
  children,
  setIsPreviewScreen,
  isPreviewScreen,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [isDeskTop, setIsDesktop] = useState(false);
  const productId = usePathname().split('/')[3];
  const productType = usePathname().split('/')[2];

  return (
    <div
      className={`relative h-full w-full overflow-hidden lg:block ${isPreviewScreen ? 'block' : 'hidden'}`}
    >
      {/* For the background stripes */}
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
      <div
        className={`relative z-10 mx-auto p-4 md:p-10 ${
          isDeskTop ? 'w-full' : 'max-w-[550px]'
        }`}
      >
        <div className="relative mx-auto w-full max-w-5xl transform overflow-hidden rounded-lg">
          <div className="flex items-center justify-between bg-gray-800 px-2 py-1">
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              Preview
              <a
                target="_blank"
                rel="noreferrer"
                href={`${process.env.NEXT_PUBLIC_HOST}/${productType}/${productId}`}
              >
                <IconExternalLink
                  className="cursor-pointer text-gray-400 hover:text-white"
                  size={20}
                />
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <IconDeviceDesktop
                onClick={() => setIsDesktop(true)}
                className={`cursor-pointer text-gray-400 ${
                  isDeskTop ? 'text-white' : ''
                }`}
                size={20}
              />
              <IconDeviceMobile
                onClick={() => setIsDesktop(false)}
                className={`cursor-pointer text-gray-400 ${
                  !isDeskTop ? 'text-white' : ''
                }`}
                size={20}
              />
            </div>
            <div className="lg:hidden">
              <IconX
                onClick={() => {
                  setIsPreviewScreen(prev => !prev);
                }}
                className="cursor-pointer text-gray-400 hover:text-gray-100"
                size={20}
              />
            </div>
          </div>
          <div className="relative w-full overflow-hidden rounded-b-lg">
            <div className="flex items-center bg-gray-800 px-2 py-1">
              <div className="mr-2 flex space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto w-full rounded-md bg-gray-500 px-4 py-1 text-center text-[10px] text-gray-50 md:w-6/12">
                nexify.club/{productType}/
              </div>
            </div>
            <div className="hide-scrollbar relative h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden rounded-b-2xl border-b-8 border-l-8 border-r-8 border-gray-800 bg-white lg:h-[calc(100vh-8rem)]">
              {/* <div
                className={
                  isDeskTop
                    ? 'absolute left-1/2 top-[35%] h-[1080px] w-[1920px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.52083]'
                    : ''
                }
              > */}
              {children}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewOne;
