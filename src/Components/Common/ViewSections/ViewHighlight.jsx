import {
  IconCertificate,
  IconDeviceMobile,
  IconDownload,
  IconFileText,
  IconInfinity,
  IconVideo,
} from '@tabler/icons-react';
import React from 'react';

const ViewHighlight = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4">
      <div className="flex items-center space-x-3">
        <IconVideo className="h-6 w-6 min-w-max text-blue-500" />
        <p className="font-thin text-gray-700">
          61 hours on-demand video
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <IconInfinity className="h-6 w-6 min-w-max text-green-500" />
        <p className="font-thin text-gray-700">
          Lifetime access
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <IconFileText className="h-6 w-6 min-w-max text-purple-500" />
        <p className="font-thin text-gray-700">
          65 articles
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <IconDownload className="h-6 w-6 min-w-max text-yellow-500" />
        <p className="font-thin text-gray-700">
          194 downloadable resources
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <IconDeviceMobile className="h-6 w-6 min-w-max text-red-500" />
        <p className="font-thin text-gray-700">
          Access on mobile and TV
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <IconCertificate className="h-6 w-6 min-w-max text-indigo-500" />
        <p className="font-thin text-gray-700">
          Certificate of completion
        </p>
      </div>
    </div>
  );
};

export default ViewHighlight;
