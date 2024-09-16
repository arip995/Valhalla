import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioOne = ({ src }) => {
  if (!src) return null;
  return (
    <AudioPlayer
      src={src}
      autoPlay={false}
      preload="none"
    />
  );
};

export default AudioOne;
