'use client';
import ImageCropModal from '@/Common/CropModal';
import { handleFile } from '@/Utils/HandleFiles';
import React, { useState } from 'react';

function page() {
  const [imageSrc, setImageSrc] = useState(null);
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

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {imageSrc && (
        <ImageCropModal
          open={cropModalOpen}
          imageSrc={imageSrc}
          onClose={() => setCropModalOpen(false)}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
}

export default page;
