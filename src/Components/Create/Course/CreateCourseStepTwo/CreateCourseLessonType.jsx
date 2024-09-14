import { Input } from '@mantine/core';
import {
  IconFileText,
  IconFileUpload,
  IconMusic,
  IconVideo,
} from '@tabler/icons-react';

const CreateCourseLessonType = ({
  onSelect,
  label,
  children,
}) => {
  return (
    <div className="flex flex-col bg-white">
      <Input.Label>{label}</Input.Label>
      <div className="rounded-lg border p-3">
        {children ? (
          children
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div
              className="flex cursor-pointer items-center space-x-4 rounded-lg p-2 transition duration-300 hover:bg-gray-100"
              onClick={() => onSelect('video')}
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 p-3">
                <IconVideo color="#0d8db4" />
              </div>
              <div>
                <h2 className="font-semibold">Video</h2>
                <p className="text-sm text-gray-600">
                  Upload or embed a video
                </p>
              </div>
            </div>

            <div
              className="flex cursor-pointer items-center space-x-4 rounded-lg p-2 transition duration-300 hover:bg-gray-100"
              onClick={() => onSelect('textImage')}
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 p-3">
                <IconFileText color="#0d8db4" />
              </div>
              <div>
                <h2 className="font-semibold">
                  Text/Image
                </h2>
                <p className="text-sm text-gray-600">
                  Add text and image
                </p>
              </div>
            </div>

            <div
              className="flex cursor-pointer items-center space-x-4 rounded-lg p-2 transition duration-300 hover:bg-gray-100"
              onClick={() => onSelect('audio')}
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 p-3">
                <IconMusic color="#0d8db4" />
              </div>
              <div>
                <h2 className="font-semibold">Audio</h2>
                <p className="text-sm text-gray-600">
                  Upload Audio files
                </p>
              </div>
            </div>

            <div
              className="flex cursor-pointer items-center space-x-4 rounded-lg p-2 transition duration-300 hover:bg-gray-100"
              onClick={() => onSelect('file')}
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 p-3">
                <IconFileUpload color="#0d8db4" />
              </div>
              <div>
                <h2 className="font-semibold">File</h2>
                <p className="text-sm text-gray-600">
                  Upload PDF, ZIP or etc.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCourseLessonType;
