import ListFileOne from '@/Components/Common/ListFiles/ListFileOne';
import { Button } from '@mantine/core';
import React, { useState } from 'react';

const Gallery = ({ section, onSave = () => {} }) => {
  const [gallery, setGallery] = useState(section);
  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <ListFileOne
        file={gallery}
        onUpdate={setGallery}
        cropImage
        isPresigned
      />
      <div className="flex w-full justify-end">
        <Button
          color="black"
          className="w-max"
          onClick={() => onSave(gallery)}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Gallery;
