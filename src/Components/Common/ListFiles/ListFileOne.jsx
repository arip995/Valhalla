import { getUniqueId } from '@/Utils/Common';
import { handleFile } from '@/Utils/HandleFiles';
import {
  Divider,
  FileButton,
  TextInput,
  Tooltip,
} from '@mantine/core';
import {
  IconBrandVimeo,
  IconBrandYoutubeFilled,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UploadButtonOne from '../Upload/UploadButtonOne';
import ListFiles from './ListFiles';
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
  link = '',
  showImagePreview = false,
  cropImage = false,
  quality = 50,
  onChangeLink = () => {},
  isPresigned,
}) => {
  const [files, setFiles] = useState(
    file.length ? file : []
  );

  const addLoadingImage = () => {
    setFiles([
      ...files,
      { id: getUniqueId(), loading: true },
    ]);
  };

  const onUpload = async file => {
    try {
      addLoadingImage();
      const url = await handleFile(
        file,
        mimeTypes,
        maxSize,
        quality,
        false,
        isPresigned
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

  const onFileDelete = async url => {
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
      {files.length > 0 && (
        <ListFiles
          files={files}
          onDelete={onFileDelete}
          showImagePreview={showImagePreview}
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
                rightSectionWidth={60}
                rightSection={
                  <div className="flex items-center gap-1">
                    <IconBrandYoutubeFilled color="red" />
                    <IconBrandVimeo color="cyan" />
                  </div>
                }
                placeholder="Link"
                disabled={files.length >= 1}
                onChange={e => onChangeLink(e.target.value)}
              />
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
};

export default ListFileOne;
