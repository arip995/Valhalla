/* eslint-disable @next/next/no-img-element */
import CropModal from '@/Common/CropModal';
import { handleFile } from '@/Utils/HandleFiles';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  FileButton,
  LoadingOverlay,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';

const ProfilePic = ({
  avatarImage,
  name,
  loading,
  handleAvatarChange = () => {},
  onRemoveAvatar = () => {},
  showRemoveButton = false,
  mime_types = ['image/*'],
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileKey, setFileKey] = useState(0);
  const [cropModalOpen, setCropModalOpen] = useState(false);

  const handleUpload = async file => {
    setFileKey(prev => prev + 1);
    const data = await handleFile(
      file,
      undefined,
      undefined,
      undefined,
      true
    );
    if (data === 'validated') {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageSrc(reader.result);
          setCropModalOpen(true);
        };
        reader.readAsDataURL(file);
      }
    }
  };

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
          <img
            className="h-[88px] w-[88px] overflow-hidden rounded-full object-cover"
            alt=""
            src={avatarImage}
            width={88}
            height={88}
            // quality={100}
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
            key={fileKey}
            onChange={handleUpload}
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
      {imageSrc && (
        <CropModal
          open={cropModalOpen}
          imageSrc={imageSrc}
          onClose={() => {
            setCropModalOpen(false);
          }}
          onCropComplete={handleAvatarChange}
        />
      )}
    </div>
  );
};

export default ProfilePic;
