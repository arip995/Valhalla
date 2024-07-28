import { Paper, Text } from '@mantine/core';
import React from 'react';
import ProfilePic from '../Common/General/ProfilePic';

const TelegramDashboardProfilepic = ({
  data,
  handleFileChange,
  loadingImage,
  onRemoveImage,
  onUpdate,
}) => {
  return (
    <Paper withBorder className="w-full p-4">
      <Text size="md" className="mb-2" fw={600}>
        Cover Image
      </Text>
      <ProfilePic
        avatarImage={
          data?.coverImage?.url ||
          data?.creatorDetails?.profilePic
        }
        loading={loadingImage}
        name={`${data?.creatorDetails?.firstName || ''} ${
          data?.creatorDetails?.lastName || ''
        }`}
        handleAvatarChange={handleFileChange}
        showRemoveButton={data?.coverImage?.url}
        onRemoveAvatar={() => {
          onUpdate('image', 'null');
        }}
      />
    </Paper>
  );
};

export default TelegramDashboardProfilepic;
