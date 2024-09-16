import axiosInstance from '@/Utils/AxiosInstance';
import { Box, LoadingOverlay } from '@mantine/core';
import { useEffect, useState } from 'react';

const VideoOne = ({
  videoId,
  libraryId = 305839,
  link,
  checkIfVideoIsReady = false,
}) => {
  const [isVideoUploaded, setIsVideoUploaded] =
    useState(true);

  const checkIsVideoProcessed = async () => {
    try {
      const data = await axiosInstance.get(
        `/bunny/get_video_details/${videoId}`
      );

      setIsVideoUploaded(
        data.data?.data?.encodeProgress === 100
      );
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    let interval;
    if (checkIfVideoIsReady) {
      interval = setInterval(() => {
        if (isVideoUploaded) {
          clearInterval(interval);
          return;
        }
        checkIsVideoProcessed();
      }, 10000);
      checkIsVideoProcessed();
    }
    return () => clearInterval(interval);
  }, [isVideoUploaded]);

  return (
    <Box className="relative aspect-video h-full w-full">
      <LoadingOverlay
        visible={!isVideoUploaded}
        zIndex={1000}
        overlayProps={{ blur: 8 }}
        loaderProps={{
          children: 'Processing video...',
          color: 'violet',
          type: 'dots',
        }}
      />
      {videoId ? (
        <iframe
          src={`https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=false&loop=false&muted=false&preload=false&responsive=true`}
          loading="lazy"
          className="absolute top-0 h-full w-full border-0"
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
          allowfullscreen="true"
        />
      ) : (
        <iframe
          src={
            link.includes('vimeo.com')
              ? link.replace(
                  'https://vimeo.com/',
                  'https://player.vimeo.com/video/'
                )
              : link.replace('watch?v=', 'embed/')
          }
          className="absolute top-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </Box>
  );
};

export default VideoOne;
