import { Paper } from '@mantine/core';
import React from 'react';
import ProfilePic from '../Common/General/ProfilePic';

const TelegramDashboardProfilepic = ({ data }) => {
  return <Paper withBorder className="p-4 w-full">
    {/* <ProfilePic avatarImage={data?.profilePic} loading={false} name={`${data?.firstName || ''} ${data?.lastName || ''
      }`} handleAvatarChange={handleFileChange} onRemoveAvatar={onRemoveImage} /> */}
  </Paper>;
};

export default TelegramDashboardProfilepic;
