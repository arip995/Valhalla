import { validateLink } from '@/Constants/constants';
import { getUniqueId } from '@/Utils/Common';
import { handleFile } from '@/Utils/HandleFiles';
import {
  Button,
  Divider,
  FileButton,
  TextInput,
  Tooltip,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UploadButtonOne from '../Upload/UploadButtonOne';
import ListFiles from './ListFiles';
import useUploadVideo from '../Upload/useUploadVideo';
const ListFileOne = ({
  onUpdate = () => {},
  maxSize = 5,
  type = 'upload',
  onlyOne = false,
  mimeTypes = ['image/*'],
  file = [],
  showLink = false,
  uploadButtonText,
  uploadButtonDescription,
  showImagePreview = false,
  cropImage = false,
  quality = 50,
  onChangeLink = () => {},
  isUploadOnBunny,
}) => {
  const [files, setFiles] = useState(
    file.length ? file : []
  );
  const [link, setLink] = useState('');
  const [linkError, setLinkError] = useState('');

  const addLoading = () => {
    setFiles([
      ...files,
      { id: getUniqueId(), loading: true },
    ]);
  };

  const handleAfterBunnyUpload = uploadedFiles => {
    if (!uploadedFiles.length) return null;

    setFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      const loadingIndex = updatedFiles.findIndex(
        f => f.loading
      );
      if (loadingIndex !== -1) {
        updatedFiles[loadingIndex] = {
          id: updatedFiles[loadingIndex].id,
          ...uploadedFiles[0],
        };
      }
      return updatedFiles;
    });
  };

  const { uploadFile: uploadBunny } = useUploadVideo(
    handleAfterBunnyUpload,
    file
  );

  const onUpload = async file => {
    try {
      addLoading();
      if (
        isUploadOnBunny &&
        file.type.startsWith('video')
      ) {
        await handleFile(
          file,
          mimeTypes,
          maxSize,
          quality,
          true
        );
        uploadBunny(file);
      } else {
        const url = await handleFile(
          file,
          mimeTypes,
          maxSize,
          quality
        );
        if (!url) {
          setFiles(prevFiles => {
            const loadingIndex = prevFiles.findIndex(
              f => f.loading
            );
            return prevFiles.filter(
              (_, index) => index !== loadingIndex
            );
          });
          return;
        }
        setFiles(prevFiles => {
          const updatedFiles = [...prevFiles];
          const loadingIndex = updatedFiles.findIndex(
            f => f.loading
          );
          if (loadingIndex !== -1) {
            updatedFiles[loadingIndex] = {
              id: updatedFiles[loadingIndex].id,
              url,
              type: file.type,
              name: file.name,
            };
          }
          return updatedFiles;
        });
      }
    } catch (error) {
      setFiles(prevFiles => {
        const loadingIndex = prevFiles.findIndex(
          f => f.loading
        );
        return prevFiles.filter(
          (_, index) => index !== loadingIndex
        );
      });
      toast.error(
        typeof error === 'string' ? error : 'Network error'
      );
    }
  };

  const onFileDelete = async (url, id, _id) => {
    if (_id) {
      setFiles(prevFiles => {
        const filteredFiles = prevFiles.filter(
          item => item._id !== _id
        );

        return filteredFiles;
      });
      return;
    }
    if (id) {
      setFiles(prevFiles => {
        const filteredFiles = prevFiles.filter(
          item => item.id !== id
        );

        return filteredFiles;
      });
      return;
    }
    setFiles(prevFiles => {
      const filteredFiles = prevFiles.filter(
        item => item.url !== url
      );

      return filteredFiles;
    });
  };

  useEffect(() => {
    const nonLoadingFiles = files.filter(
      file => !file.loading
    );
    onUpdate(nonLoadingFiles);
  }, [files]);

  return (
    <div className="flex w-full flex-col gap-2">
      {type === 'upload' ? (
        <>
          {onlyOne && files?.length > 0 ? null : (
            <UploadButtonOne
              buttonText={uploadButtonText}
              description={uploadButtonDescription}
              onUpload={onUpload}
              maxSize={maxSize}
              mimeTypes={mimeTypes}
              crop={cropImage}
            />
          )}
        </>
      ) : (
        <FileButton
          disabled={link}
          onChange={onUpload}
          accept={mimeTypes}
        />
      )}

      {!!showLink && (
        <>
          <Divider position="center" label="OR" />
          <div className="flex w-full flex-col gap-4">
            <Tooltip
              disabled={files?.length < 1}
              label="Delete the uploaded video above to enable this field."
              events={{
                hover: true,
                focus: true,
                touch: true,
              }}
            >
              <TextInput
                label="Video Link"
                rightSectionWidth={65}
                rightSection={
                  <Button
                    radius={'md'}
                    onClick={() => {
                      if (!validateLink(link)) {
                        setLinkError('Enter a valid link');
                      } else {
                        onChangeLink(link);
                        setFiles(prev => {
                          return [
                            ...prev,
                            { type: 'link', link },
                          ];
                        });
                        setLink('');
                      }
                    }}
                  >
                    Add
                  </Button>
                }
                // rightSection={
                //   <div className="flex items-center gap-1">
                //     <IconBrandYoutubeFilled color="red" />
                //     <IconBrandVimeo color="cyan" />
                //   </div>
                // }
                error={linkError}
                placeholder="Link"
                value={link}
                // disabled={files.length >= 1}
                onChange={e => {
                  setLink(e.target.value);
                  setLinkError('');
                }}
              />
            </Tooltip>
          </div>
        </>
      )}

      {files.length > 0 && (
        <ListFiles
          files={files}
          onDelete={onFileDelete}
          showImagePreview={showImagePreview}
        />
      )}
    </div>
  );
};

export default React.memo(ListFileOne);
