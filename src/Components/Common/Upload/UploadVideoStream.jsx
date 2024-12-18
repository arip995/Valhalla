import {
  ActionIcon,
  Divider,
  Loader,
  RingProgress,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import {
  IconBrandVimeo,
  IconBrandYoutubeFilled,
  IconTrash,
  IconVideo,
} from '@tabler/icons-react';
import UploadButtonOne from './UploadButtonOne';
import useUploadVideo from './useUploadVideo';

const UploadVideoStream = ({ onUpload, file = [] }) => {
  const {
    uploadFile,
    cancelUpload,
    progress,
    currentUpload,
    fileData,
    isUploading,
    setCurrentUpload,
  } = useUploadVideo(onUpload, file);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {currentUpload?.[0]?.videoId || isUploading ? (
        <div className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-gray-50 p-3">
          <div className="flex items-center gap-2">
            {isUploading ? (
              <>
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
                      {progress == 100 ? (
                        <Loader size="xs" />
                      ) : (
                        `${progress}%`
                      )}
                    </Text>
                  }
                  striped
                  animated
                />
                {progress == 100 ? 'Saving video...' : null}
              </>
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
          events={{ hover: true, focus: true, touch: true }}
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
