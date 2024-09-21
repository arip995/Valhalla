import React from 'react';
import ViewProfile from '../General/ViewProfile';

const ViewAbout = ({ value }) => {
  if (!value?.length) return null;

  return (
    <div className="flex w-full flex-col gap-4">
      <h3>About me</h3>
      <ViewProfile
        profilePic={value[0]?.image}
        name={value[0]?.name}
        description={value[0]?.description}
        inViewPage={false}
      />
    </div>
  );
};

export default ViewAbout;
