import { Button, Divider, TextInput } from '@mantine/core';
import classNames from 'classnames';
// import React, { useState } from 'react';

const UploadButtonOne = ({
  buttonText = 'Upload Images',
  description = '(16:9) recommended, max size',
  maxSize = 5,
  mimeTypes = 'image/*',
  onUpload = () => {},
  allowVideoLinks = false,
  disabled = false,
}) => {
  //   const [uploadLink, setUploadLink] = useState('');
  return (
    <label className="relative w-full cursor-pointer">
      <div
        className={classNames(
          'flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-[rgba(15,15,15,0.2)] p-6'
        )}
      >
        <div className="upload-option upload-option-file">
          <div className="flex w-full cursor-pointer items-center justify-center rounded-full bg-black/10 p-2 text-sm font-medium leading-4">
            {buttonText}
          </div>
          <div className="mt-4">
            {`${description} - ${maxSize}MB`}
          </div>
          <input
            id="upload-trigger"
            className="invisible absolute left-0 top-0 h-full w-full"
            type="file"
            accept={mimeTypes}
            onChange={e => onUpload(e.target.files[0])}
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
  );
};

export default UploadButtonOne;
