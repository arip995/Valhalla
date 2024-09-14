/* eslint-disable no-unused-vars */
'use client';
import {
  Button,
  FileButton,
  Progress,
} from '@mantine/core';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import tus from 'tus-js-client';
import axiosInstance from '@/Utils/AxiosInstance';

const page = () => {
  const [progress, setProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState(null);

  useEffect(() => {
    // Check if there's a saved upload session in localStorage
    const savedUploads = localStorage.getItem(
      'uploadSessions'
    );
    if (savedUploads) {
      setCurrentUpload(JSON.parse(savedUploads));
    }
  }, []);

  const uploadFile = async file => {
    let response;
    let uploadData;
    let uploadSessions =
      JSON.parse(localStorage.getItem('uploadSessions')) ||
      [];

    // Check if the file has been previously uploaded
    const existingUpload = uploadSessions.find(
      session => session.fileName === file.name
    );

    if (existingUpload && existingUpload.videoId) {
      console.log('Resuming previous upload');
      uploadData = existingUpload;
    } else {
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
      };
      uploadSessions.push(newSession);
      localStorage.setItem(
        'uploadSessions',
        JSON.stringify(uploadSessions)
      );
      setCurrentUpload(newSession);
    }

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

        // Remove the completed upload session from the array
        uploadSessions = uploadSessions.filter(
          session => session.fileName !== file.name
        );
        localStorage.setItem(
          'uploadSessions',
          JSON.stringify(uploadSessions)
        );
        setCurrentUpload(null);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = (
          (bytesUploaded / bytesTotal) *
          100
        ).toFixed(2);
        setProgress(percentage);
        console.log(`Uploaded ${percentage}%`);
      },
      onSuccess: () => {
        toast.success('Uploaded successfully');
        setProgress(0);

        // Remove the completed upload session from the array
        uploadSessions = uploadSessions.filter(
          session => session.fileName !== file.name
        );
        localStorage.setItem(
          'uploadSessions',
          JSON.stringify(uploadSessions)
        );
        setCurrentUpload(null);
      },
    });

    upload.start();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-40">
      <FileButton onChange={uploadFile} accept="video/*">
        {props => <Button {...props}>Upload videos</Button>}
      </FileButton>
      <Progress
        autoContrast
        value={progress}
        striped
        animated
        className="mt-4 w-full"
      />
      <Toaster />
    </div>
  );
};

export default page;

// <div
//   style={{
//     position: 'relative',
//     marginTop: '200px',
//     height: '500px',
//     width: '500px',
//   }}
// >
//   <iframe
//     src="https://iframe.mediadelivery.net/embed/305839/456e7258-c937-4a2b-ad5f-ce94fe067f54?autoplay=false&loop=false&muted=false&preload=false&responsive=true"
//     loading="lazy"
//     style={{
//       border: '0',
//       position: 'absolute',
//       top: '0',
//       height: '100%',
//       width: '100%',
//     }}
//     allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
//     allowfullscreen="true"
//   ></iframe>
// </div>
