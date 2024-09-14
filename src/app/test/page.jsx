/* eslint-disable no-unused-vars */
'use client';
import axiosInstance from '@/Utils/AxiosInstance';
import {
  Button,
  FileButton,
  RingProgress,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import tus from 'tus-js-client';

const page = () => {
  const [progress, setProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState(null);

  const uploadFile = async file => {
    if (!file.name) return;
    let response;
    let uploadData;

    // If no previous upload found, create a new video ID
    response = await axiosInstance.post(
      '/bunny/get_video_id',
      {
        title: file.name,
      }
    );
    uploadData = response.data.data;

    // Save the upload data and file name in the uploadSessions array in localStorage
    const newSession = {
      ...uploadData,
      fileName: file.name,
      fileType: file.type,
    };

    setCurrentUpload(newSession);

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
        collection: '406ed803-d4f5-4757-b0df-a774f1c96401',
      },
      onError: error => {
        console.log(error);
        toast.error(
          typeof error.message === 'string'
            ? error.message
            : 'Error in uploading, please try again'
        );
        setProgress(0);
        setCurrentUpload(null);
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
        setProgress(0);
        setCurrentUpload(null);
      },
    });

    upload.start();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-40">
      <FileButton
        onChange={uploadFile}
        accept=".mp4,.webm,.ogg,.mov,.avi,.wmv,.flv,.mkv,.m4v"
      >
        {props => <Button {...props}>Upload videos</Button>}
      </FileButton>
      <RingProgress
        sections={[{ value: progress, color: 'blue' }]}
        size={80}
        autoContrast
        thickness={3}
        label={
          <Text c="blue" fw={400} ta="center" size="sm">
            {`${progress}%`}
          </Text>
        }
        striped
        animated
        // className="mt-4 w-full"
      />
      <div
        style={{
          position: 'relative',
          marginTop: '200px',
          aspectRatio: '16/9',
          // maxHeight: '500px',
          // maxWidth: '500px',
          height: '100%',
          width: '100%',
        }}
      >
        <iframe
          src="https://iframe.mediadelivery.net/embed/305839/d7bf59f4-5702-483c-9298-f8edbcf26eb3?autoplay=false&loop=false&muted=false&preload=false&responsive=true"
          loading="lazy"
          style={{
            border: '0',
            position: 'absolute',
            top: '0',
            height: '100%',
            width: '100%',
          }}
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
          allowfullscreen="true"
        ></iframe>
      </div>
      <Toaster />
    </div>
  );
};

export default page;
