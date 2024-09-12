import useOfflineStatus from '@/Utils/Hooks/useOfflineStatus';
// import useIsBrowser from '@/Utils/useIsBrowser';
import { IconCloudOff } from '@tabler/icons-react';
// import dynamic from 'next/dynamic';
// const DisableDevtool = dynamic(
//   () => import('disable-devtool'),
//   {
//     ssr: false, // disable server-side rendering for this module
//   }
// );
const OfflineOverlay = () => {
  const isOnline = useOfflineStatus();
  // const isBrowser = useIsBrowser();
  // if (process.env.NEXT_PUBLIC_ENV !== 'DEV' && isBrowser) {
  //   DisableDevtool();
  // }
  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-[200000] flex h-dvh w-full select-none justify-center bg-[#00000070] p-4 font-semibold">
      <div className="flex h-max gap-2 rounded-md bg-gray-900 px-4 py-2">
        <IconCloudOff color="white" />
        <h1 style={{ color: 'white' }}>You are offline.</h1>
      </div>
    </div>
  );
};

export default OfflineOverlay;
