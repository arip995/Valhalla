import { handleFile } from '@/Utils/HandleFiles';
import {
  ActionIcon,
  Button,
  Divider,
  TextInput,
} from '@mantine/core';
import classNames from 'classnames';
import { useState } from 'react';
import CropModal from '../Modal/CropModal';
import {
  IconFileUpload,
  IconUpload,
} from '@tabler/icons-react';
// import React, { useState } from 'react';

const UploadButtonOne = ({
  buttonText = 'Upload Images',
  description = '(16:9) recommended',
  maxSize = 5,
  showMaxSize = true,
  showButton = true,
  mimeTypes = 'image/*',
  onUpload = () => {},
  allowVideoLinks = false,
  disabled = false,
  crop = false,
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [fileKey, setFileKey] = useState(0);
  const [cropModalOpen, setCropModalOpen] = useState(false);

  const handleUpload = async file => {
    setImageName(file.name);
    setFileKey(prev => prev + 1);
    const data = await handleFile(
      file,
      mimeTypes,
      maxSize,
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
    <>
      <label className="relative w-full cursor-pointer">
        <div
          className={classNames(
            'flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-[rgba(15,15,15,0.2)] p-6'
          )}
        >
          <div className="upload-option upload-option-file">
            {showButton ? (
              <Button
                color="black"
                leftSection={<IconUpload />}
              >
                {buttonText}
              </Button>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <ActionIcon
                  variant="light"
                  size={50}
                  radius="xl"
                >
                  <IconFileUpload />
                </ActionIcon>
                <div className="flex gap-2">
                  <span className="text-violet-800">
                    {' '}
                    Browse
                  </span>{' '}
                  files from your system
                </div>
              </div>
            )}

            <div className="mt-4 text-center">
              {description ? `${description},` : ''}
              {showMaxSize &&
                ` max size - ${maxSize > 1000 ? maxSize / 1000 : maxSize}${maxSize > 1000 ? 'GB' : 'MB'}`}
            </div>
            <input
              id="upload-trigger"
              key={fileKey}
              className="invisible absolute left-0 top-0 h-full w-full"
              type="file"
              accept={mimeTypes}
              onChange={e => {
                if (crop) {
                  handleUpload(e.target.files[0]);
                } else {
                  onUpload(e.target.files[0]);
                }
              }}
              disabled={disabled}
            />
            {!!allowVideoLinks && (
              <>
                <div className="flex w-full items-center justify-center gap-3 text-sm font-medium leading-5 text-gray-500">
                  <Divider
                    className="my-2 w-full"
                    label="OR"
                    labelPosition="center"
                  />
                </div>

                <TextInput
                  rightSectionWidth={100}
                  placeholder="Add link to your files"
                  rightSection={
                    <Button
                      variant="default"
                      className="upload-link-button"
                      size="xs"
                      //   onClick={onAddUploadLink}
                    >
                      Add
                    </Button>
                  }
                >
                  {/* <TextInput
                  className="upload-link-input"
                  placeholder="Add link to your files"
                  value={uploadLink}
                  onChange={e =>
                    setUploadLink(e.target.value)
                  }
                /> */}
                </TextInput>
              </>
            )}
          </div>
        </div>
      </label>
      {imageSrc && (
        <CropModal
          open={cropModalOpen}
          imageSrc={imageSrc}
          imageName={imageName}
          circularCrop={false}
          onCropComplete={onUpload}
          aspect={16 / 9}
          onClose={() => {
            setCropModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default UploadButtonOne;
