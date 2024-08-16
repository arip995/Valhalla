import useOfflineStatus from '@/Utils/Hooks/useOfflineStatus';
import { IconAlertTriangle } from '@tabler/icons-react';
import React from 'react';

const OfflineOverlay = () => {
  const isOnline = useOfflineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-[200000] flex h-dvh w-full select-none justify-center bg-[#00000070] p-4">
      <div className="flex h-max gap-2 rounded-md bg-gray-900 px-4 py-2">
        <IconAlertTriangle color="white" />
        <h1 style={{ color: 'white' }}>You are offline.</h1>
      </div>
    </div>
  );
};

export default OfflineOverlay;
