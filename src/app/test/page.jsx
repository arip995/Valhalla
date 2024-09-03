'use client';
import ImageCropModal from '@/Common/CropModal';
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
  const handleCropComplete = croppedImage => {
    console.log('Cropped Image URL:', croppedImage); // Do something with the cropped image
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
