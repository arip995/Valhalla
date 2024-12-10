import React from 'react';
import {
  IconCertificate,
  IconDeviceMobile,
  IconDownload,
  IconFileText,
  IconInfinity,
  IconVideo,
} from '@tabler/icons-react';
import { convertMinutesToHours } from '@/Utils/Common';

const ViewHighlight = ({ value }) => {
  if (!value) return null;

  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-4 shadow-md ring-1 ring-gray-100 sm:grid-cols-2 md:p-8 lg:grid-cols-3">
      {!!value.totalDuration && (
        <div className="group flex items-center gap-4 rounded-xl bg-blue-50/50 p-4 transition-all hover:bg-blue-50">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-all group-hover:scale-110">
            <IconVideo className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-blue-900">
              {convertMinutesToHours(
                value.totalDuration || 0
              )}
            </p>
            <p className="text-sm text-blue-600">
              On-demand video
            </p>
          </div>
        </div>
      )}

      {!!value.articles && (
        <div className="group flex items-center gap-4 rounded-xl bg-purple-50/50 p-4 transition-all hover:bg-purple-50">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-all group-hover:scale-110">
            <IconFileText className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-purple-900">
              {value.articles} Articles
            </p>
            <p className="text-sm text-purple-600">
              Additional reading
            </p>
          </div>
        </div>
      )}

      {!!value.downlodableResources && (
        <div className="group flex items-center gap-4 rounded-xl bg-yellow-50/50 p-4 transition-all hover:bg-yellow-50">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 transition-all group-hover:scale-110">
            <IconDownload className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-yellow-900">
              {value.downlodableResources} Resources
            </p>
            <p className="text-sm text-yellow-600">
              Downloadable content
            </p>
          </div>
        </div>
      )}

      <div className="group flex items-center gap-4 rounded-xl bg-green-50/50 p-4 transition-all hover:bg-green-50">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-all group-hover:scale-110">
          <IconInfinity className="h-6 w-6" />
        </div>
        <div>
          <p className="font-semibold text-green-900">
            Full Access
          </p>
          <p className="text-sm text-green-600">
            Lifetime access
          </p>
        </div>
      </div>

      <div className="group flex items-center gap-4 rounded-xl bg-red-50/50 p-4 transition-all hover:bg-red-50">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-600 transition-all group-hover:scale-110">
          <IconDeviceMobile className="h-6 w-6" />
        </div>
        <div>
          <p className="font-semibold text-red-900">
            Multi-device
          </p>
          <p className="text-sm text-red-600">
            Mobile and TV access
          </p>
        </div>
      </div>

      <div className="group flex items-center gap-4 rounded-xl bg-indigo-50/50 p-4 transition-all hover:bg-indigo-50">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 transition-all group-hover:scale-110">
          <IconCertificate className="h-6 w-6" />
        </div>
        <div>
          <p className="font-semibold text-indigo-900">
            Certificate
          </p>
          <p className="text-sm text-indigo-600">
            Upon completion
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewHighlight;
