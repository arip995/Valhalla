import { convertMinutesToHours } from '@/Utils/Common';
import {
  IconDeviceMobile,
  IconDownload,
  IconFileText,
  IconInfinity,
  IconVideo,
} from '@tabler/icons-react';

const ViewHighlight = ({ value }) => {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4">
      {value.totalDuration ? (
        <div className="flex items-center space-x-3">
          <IconVideo className="h-6 w-6 min-w-max text-blue-500" />
          <p className="font-thin text-gray-700">
            {convertMinutesToHours(
              value.totalDuration || 0
            )}{' '}
            on-demand video
          </p>
        </div>
      ) : null}

      <div className="flex items-center space-x-3">
        <IconInfinity className="h-6 w-6 min-w-max text-green-500" />
        <p className="font-thin text-gray-700">
          Lifetime access
        </p>
      </div>
      {value.articles ? (
        <div className="flex items-center space-x-3">
          <IconFileText className="h-6 w-6 min-w-max text-purple-500" />
          <p className="font-thin text-gray-700">
            {value.articles} articles
          </p>
        </div>
      ) : null}
      {value.downlodableResources ? (
        <div className="flex items-center space-x-3">
          <IconDownload className="h-6 w-6 min-w-max text-yellow-500" />
          <p className="font-thin text-gray-700">
            {value.downlodableResources} downloadable
            resources
          </p>
        </div>
      ) : null}
      <div className="flex items-center space-x-3">
        <IconDeviceMobile className="h-6 w-6 min-w-max text-red-500" />
        <p className="font-thin text-gray-700">
          Access on mobile and TV
        </p>
      </div>
      {/* <div className="flex items-center space-x-3">
        <IconCertificate className="h-6 w-6 min-w-max text-indigo-500" />
        <p className="font-thin text-gray-700">
          Certificate of completion
        </p>
      </div> */}
    </div>
  );
};

export default ViewHighlight;
