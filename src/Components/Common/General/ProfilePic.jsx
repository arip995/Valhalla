import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  FileButton,
  LoadingOverlay,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';

const ProfilePic = ({
  avatarImage,
  name,
  loading,
  handleAvatarChange,
  onRemoveAvatar,
  showRemoveButton = false,
  mime_types = ['image/*'],
}) => {
  return (
    <div className="flex items-center gap-3">
      <Box pos="relative">
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
          loaderProps={{
            color: 'violet',
            type: 'dots',
          }}
        />
        {avatarImage ? (
          <Image
            className="h-[88px] w-[88px] overflow-hidden rounded-full object-cover"
            alt=""
            src={avatarImage}
            width={88}
            height={88}
            quality={100}
          />
        ) : (
          <Avatar
            color="initials"
            size="lg"
            className="h-[88px] w-[88px]"
            name={name || 'A'}
            key={name || 'A'}
          />
        )}
      </Box>
      {!loading ? (
        <>
          <FileButton
            onChange={handleAvatarChange}
            accept={mime_types}
          >
            {props => (
              <Button
                variant="outline"
                color="gray"
                size="xs"
                radius="xl"
                {...props}
              >
                {avatarImage ? 'Change' : 'Upload'}
              </Button>
            )}
          </FileButton>
          {showRemoveButton && avatarImage ? (
            <ActionIcon
              variant="outline"
              color="gray"
              size="md"
              radius="xl"
              onClick={onRemoveAvatar}
            >
              <IconX
                style={{ width: '70%', height: '70%' }}
                stroke={1.5}
                color="gray"
              />
            </ActionIcon>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default ProfilePic;
