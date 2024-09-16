import axiosInstance from '@/Utils/AxiosInstance';
import { Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';

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

  if (!isVideoUploaded) {
    return (
      <div className="flex items-center justify-center gap-2">
        Processing video
        <Loader type="dots" />
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '16/9',
        height: '100%',
        width: '100%',
      }}
    >
      {videoId ? (
        <iframe
          src={`https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=false&loop=false&muted=false&preload=false&responsive=true`}
          loading="lazy"
          style={{
            border: '0',
            position: 'absolute',
            top: '0',
            height: '100%',
            width: '100%',
          }}
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
          style={{
            border: '0',
            position: 'absolute',
            top: '0',
            height: '100%',
            width: '100%',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default VideoOne;
