/* eslint-disable no-unused-vars */
'use client';
import ImageCropModal from '@/Common/CropModal';
import ListFileOne from '@/Components/Common/ListFiles/ListFileOne';
import UploadButtonOne from '@/Components/Common/Upload/UploadButtonOne';
import { handleFile } from '@/Utils/HandleFiles';
import React, { useEffect, useState } from 'react';

function page() {
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  // Handle image upload and show the crop modal
  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle crop completion
  const handleCropComplete = async file => {
    const url = await handleFile(file);
    console.log(url);
  };

  useEffect(() => {
    if (!cropModalOpen) setSelectedFile('');
  }, [cropModalOpen]);

  return (
    // <div>
    //   <input
    //     value={selectedFile}
    //     type="file"
    //     onChange={handleImageUpload}
    //   />
    //   {imageSrc && (
    //     <ImageCropModal
    //       open={cropModalOpen}
    //       imageSrc={imageSrc}
    //       onClose={() => setCropModalOpen(false)}
    //       onCropComplete={handleCropComplete}
    //     />
    //   )}
    // </div>
    <div className="w-full p-40">
      {/* <UploadButtonOne /> */}
      <ListFileOne />
    </div>
  );
}

export default page;
