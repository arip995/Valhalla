import { getUniqueId } from '@/Utils/Common';
import { handleFile } from '@/Utils/HandleFiles';
import { Button, FileButton, Input } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UploadButtonOne from '../Upload/UploadButtonOne';
import useUploadVideo from '../Upload/useUploadVideo';
import ListFiles from './ListFiles';
import { IconUpload } from '@tabler/icons-react';
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
  isUploadOnBunny,
  showMaxSize = true,
  showButton = true,
  labelText = '',
  error = '',
  id,
}) => {
  const [files, setFiles] = useState(
    file.length ? file : []
  );

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
      console.log(error?.response?.data?.message);
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
    <div className="flex w-full flex-col gap-2" id={id}>
      {type === 'upload' ? (
        <>
          {onlyOne && files?.length > 0 ? null : (
            <>
              {!!labelText && labelText}
              <UploadButtonOne
                buttonText={uploadButtonText}
                description={uploadButtonDescription}
                onUpload={onUpload}
                maxSize={maxSize}
                mimeTypes={mimeTypes}
                crop={cropImage}
                showMaxSize={showMaxSize}
                showButton={showButton}
                showLink={showLink}
                onChangeLink={val => {
                  if (!val.link) return null;
                  setFiles(prev => {
                    return [...prev, { ...val }];
                  });
                }}
              />
            </>
          )}
        </>
      ) : (
        <FileButton
          // disabled={link}
          onChange={onUpload}
          accept={mimeTypes}
        >
          {props => (
            <Button
              variant="outline"
              leftSection={<IconUpload size={20} />}
              {...props}
            >
              Upload files
            </Button>
          )}
        </FileButton>
      )}
      {!!error && <Input.Error>{error}</Input.Error>}

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
