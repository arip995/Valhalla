import { Box } from '@mantine/core';

const VideoOne = ({
  videoId,
  libraryId = 305839,
  link,
}) => {
  return (
    <Box className="relative aspect-video h-full w-full">
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
