import axiosInstance from '@/Utils/AxiosInstance';
import {
  ActionIcon,
  Divider,
  RingProgress,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import tus from 'tus-js-client';
import UploadButtonOne from './UploadButtonOne';
import {
  IconBrandVimeo,
  IconBrandYoutubeFilled,
  IconTrash,
  IconVideo,
} from '@tabler/icons-react';

const UploadVideoStream = ({ onUpload, file = [] }) => {
  const [progress, setProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState(file);
  const [fileData, setFileData] = useState(null);
  const [uploadInstance, setUploadInstance] =
    useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async file => {
    if (!file.name) return;
    setCurrentUpload([]);
    setIsUploading(true);
    let response;
    let uploadData;

    // If no previous upload found, create a new video ID
    response = await axiosInstance.post(
      '/bunny/create_video_id',
      {
        title: file.name,
      }
    );
    uploadData = response.data.data;

    // Save the upload data and file name in the uploadSessions array in localStorage
    setFileData(file);
    const newSession = {
      videoId: uploadData.videoId,
      libraryId: uploadData.libraryId,
      name: file.name,
      type: file.type,
    };

    // Start the TUS upload
    const upload = new tus.Upload(file, {
      endpoint: 'https://video.bunnycdn.com/tusupload',
      retryDelays: [
        0, 3000, 5000, 10000, 20000, 60000, 60000,
      ],
      headers: {
        AuthorizationSignature:
          uploadData.authorizationSignature, // SHA256 signature (library_id + api_key + expiration_time + video_id)
        AuthorizationExpire: uploadData.authorizationExpire, // Expiration time as in the signature,
        VideoId: uploadData.videoId, // The guid of a previously created video object
        LibraryId: uploadData.libraryId,
      },
      metadata: {
        filename: file.name,
        filetype: file.type,
        title: file.name,
      },
      onError: error => {
        console.log(error);
        setIsUploading(false);
        toast.error(
          typeof error.message === 'string'
            ? error.message
            : 'Error in uploading, please try again'
        );
        setProgress(0);
        setCurrentUpload([]);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = (
          (bytesUploaded / bytesTotal) *
          100
        ).toFixed(2);
        setProgress(percentage);
      },
      onSuccess: () => {
        toast.success('Uploaded successfully');
        setIsUploading(false);
        setProgress(0);
        setCurrentUpload(() => [{ ...newSession }]);
      },
    });

    setUploadInstance(upload);
    upload.start();
  };

  const cancelUpload = () => {
    if (uploadInstance) {
      uploadInstance.abort();
    }
    setFileData(null);
    setProgress(0);
    setCurrentUpload([]);
    setUploadInstance(null);
    setIsUploading(false);
  };

  useEffect(() => {
    onUpload(currentUpload);
  }, [currentUpload]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {currentUpload?.[0]?.videoId || isUploading ? (
        <div className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-50 p-3">
          <div className="flex gap-2">
            {isUploading ? (
              <RingProgress
                sections={[
                  { value: progress, color: 'violet' },
                ]}
                size={80}
                thickness={3}
                label={
                  <Text
                    c="violet"
                    fw={400}
                    ta="center"
                    size="sm"
                  >
                    {`${progress}%`}
                  </Text>
                }
                striped
                animated
              />
            ) : (
              <div className="flex items-center gap-2">
                <IconVideo
                  color="gray"
                  className="min-h-6 min-w-6 rounded-md"
                  stroke={1}
                />
                <Text color="gray.7" size="sm">
                  {fileData?.name ||
                    currentUpload?.[0]?.name}
                </Text>
              </div>
            )}
          </div>
          <ActionIcon
            variant="transparent"
            color="gray"
            size={20}
            onClick={cancelUpload}
          >
            <IconTrash color="gray" />
          </ActionIcon>
        </div>
      ) : (
        <UploadButtonOne
          buttonText="Upload videos"
          showMaxSize={false}
          onUpload={uploadFile}
          maxSize={1000000}
          mimeTypes={[
            '.mp4',
            '.webm',
            '.ogg',
            '.mov',
            '.avi',
            '.wmv',
            '.flv',
            '.mkv',
            '.m4v',
          ]}
        />
      )}
      <div className="flex w-full flex-col gap-2">
        <Divider position="center" label="OR" />
        <Tooltip
          disabled={
            !isUploading ||
            currentUpload?.[0]?.type === 'link'
          }
          label="Delete the uploaded video above to enable this field."
        >
          <TextInput
            label="Video Link"
            rightSectionWidth={60}
            disabled={
              isUploading ||
              (currentUpload?.[0]?.type !== 'link' &&
                currentUpload?.[0]?.type)
            }
            value={currentUpload?.[0]?.link || ''}
            rightSection={
              <div className="flex items-center gap-1">
                <IconBrandYoutubeFilled color="red" />
                <IconBrandVimeo color="cyan" />
              </div>
            }
            placeholder="https://www.youtube.com/watch?v=ZK4-oAARvo4"
            onChange={e =>
              setCurrentUpload(() => [
                {
                  link: e.target.value,
                  type: 'link',
                },
              ])
            }
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default UploadVideoStream;
