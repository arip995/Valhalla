import { Loader } from '@mantine/core';
import '../../../styles/view/locked-content.css';
import LockedContent from './LockedContent';

const ViewLockedContent = ({ data }) => {
  //   console.log(data);

  return (
    <div className="vlc-container">
      <LockedContent data={data} />
      {/* {data ? (
      ) : (
        <div className="h-svh w-svh flex items-center justify-center">
          <Loader color="blue" size={'sm'} />
        </div>
      )} */}
    </div>
  );
};

export default ViewLockedContent;
