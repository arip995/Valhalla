import axiosInstance from '@/Utils/AxiosInstance';
import { useEffect, useState } from 'react';
import tus from 'tus-js-client';
import toast from 'react-hot-toast';

const useUploadVideo = (onUpload = () => {}, file) => {
  const [progress, setProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState(file);
  const [fileData, setFileData] = useState(null);
  const [uploadInstance, setUploadInstance] =
    useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async file => {
    if (!file.name) return;
    setCurrentUpload([]);
    setIsUploading(true);
    let response;
    let uploadData;
    const fileSizeInMB = (
      file.size /
      (1024 * 1024)
    ).toFixed(2);

    // If no previous upload found, create a new video ID
    response = await axiosInstance.post(
      '/bunny/create_video_id',
      {
        title: file.name,
        fileSize: fileSizeInMB,
      }
    );
    uploadData = response.data.data;

    // Save the upload data and file name in the uploadSessions array in localStorage
    setFileData(file);
    const newSession = {
      videoId: uploadData.videoId,
      libraryId: uploadData.libraryId,
      name: file.name,
      type: file.type,
    };

    // Start the TUS upload
    const upload = new tus.Upload(file, {
      endpoint: 'https://video.bunnycdn.com/tusupload',
      retryDelays: [
        0, 3000, 5000, 10000, 20000, 60000, 60000,
      ],
      headers: {
        AuthorizationSignature:
          uploadData.authorizationSignature, // SHA256 signature (library_id + api_key + expiration_time + video_id)
        AuthorizationExpire: uploadData.authorizationExpire, // Expiration time as in the signature,
        VideoId: uploadData.videoId, // The guid of a previously created video object
        LibraryId: uploadData.libraryId,
      },
      metadata: {
        filename: file.name,
        filetype: file.type,
        title: file.name,
      },
      onError: error => {
        console.log(error);
        setIsUploading(false);
        toast.error(
          typeof error.message === 'string'
            ? error.message
            : 'Error in uploading, please try again'
        );
        setProgress(0);
        setCurrentUpload([]);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = (
          (bytesUploaded / bytesTotal) *
          100
        ).toFixed(2);
        setProgress(percentage);
      },
      onSuccess: () => {
        toast.success('Uploaded successfully');
        setIsUploading(false);
        setProgress(0);
        setCurrentUpload(() => [{ ...newSession }]);
      },
    });

    setUploadInstance(upload);
    upload.start();
  };

  const cancelUpload = () => {
    if (uploadInstance) {
      uploadInstance.abort();
    }
    setFileData(null);
    setProgress(0);
    setCurrentUpload([]);
    setUploadInstance(null);
    setIsUploading(false);
  };

  useEffect(() => {
    onUpload(currentUpload);
  }, [currentUpload]);

  return {
    uploadFile,
    cancelUpload,
    progress,
    currentUpload,
    fileData,
    isUploading,
    setCurrentUpload,
  };
};

export default useUploadVideo;
