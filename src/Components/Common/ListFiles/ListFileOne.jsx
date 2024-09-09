import axiosInstance from '@/Utils/AxiosInstance';
import { getUniqueId } from '@/Utils/Common';
import { handleFile } from '@/Utils/HandleFiles';
import { FileButton } from '@mantine/core';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UploadButtonOne from '../Upload/UploadButtonOne';
import ListFiles from './ListFiles';
const ListFileOne = ({
  onUpdate = () => {},
  maxSize = 5,
  type = 'upload',
  mimeTypes = ['image/*'],
  file = [],
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
        undefined,
        maxSize
      );
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
        typeof error === 'string'
          ? error
          : 'An error occurred while uploading the file'
      );
    }
  };

  const onFileDelete = async url => {
    const filteredFiles = files.filter(
      item => item.url !== url
    );
    setFiles(filteredFiles);
    try {
      await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/image/delete_image`,
        {
          key: url.replace(
            'https://nexify-try.s3.ap-south-1.amazonaws.com/',
            ''
          ),
        }
      );
    } catch (error) {
      toast.error(
        'An error occurred while deleting the file'
      );
    }
  };

  useEffect(() => {
    onUpdate(files);
  }, [files]);

  return (
    <div className="flex w-full flex-col gap-4">
      {type === 'upload' ? (
        <UploadButtonOne
          onUpload={onUpload}
          maxSize={maxSize}
          mimeTypes={mimeTypes}
        />
      ) : (
        <FileButton
          onChange={onUpload}
          accept={mimeTypes}
        />
      )}
      <ListFiles files={files} onDelete={onFileDelete} />
    </div>
  );
};

export default ListFileOne;
