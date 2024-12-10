import React from 'react';
import ViewProfile from '../General/ViewProfile';

const ViewAbout = ({ value }) => {
  if (!value?.length) return null;

  return (
    <div>
      <ViewProfile
        profilePic={value[0]?.image}
        name={value[0]?.name}
        description={value[0]?.description}
        inViewPage={false}
        type
      />
    </div>
  );
};

export default ViewAbout;
