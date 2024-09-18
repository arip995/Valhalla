/* eslint-disable no-unused-vars */
import { Button, Modal, Slider } from '@mantine/core';
import { useCallback, useRef, useState } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: 'px',
        width: mediaWidth,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function CropModal({
  open,
  imageSrc,
  onClose,
  onCropComplete,
  aspect = 1,
  circularCrop = true,
  title = 'Edit Photo',
  children,
}) {
  const [crop, setCrop] = useState({
    aspect,
    unit: 'px',
    width: 100,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  // Handle setting the image reference when loaded
  const onImageLoad = useCallback(
    e => {
      if (aspect) {
        const { width, height } = e.currentTarget;
        const initialCrop = centerAspectCrop(
          width,
          height,
          aspect
        );
        setCrop(initialCrop);
        setCompletedCrop(initialCrop); // Set completedCrop when the image loads
      }
    },
    [aspect]
  );

  // Handle the crop completion
  const onComplete = async crop => {
    setCompletedCrop(crop);
  };

  // Generate the cropped image using canvas
  const getCroppedImg = async () => {
    if (!completedCrop || !imgRef.current) return;
    try {
      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('No 2d context');
      }

      // Set canvas size to crop area
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      // devicePixelRatio slightly increases sharpness on retina devices
      // at the expense of slightly slower render times and needing to
      // size the image back down if you want to download/upload and be
      // true to the images natural size.
      const pixelRatio = window.devicePixelRatio;
      // const pixelRatio = 1

      canvas.width = Math.floor(
        crop.width * scaleX * pixelRatio
      );
      canvas.height = Math.floor(
        crop.height * scaleY * pixelRatio
      );

      ctx.scale(pixelRatio, pixelRatio);
      ctx.imageSmoothingQuality = 'high';

      const cropX = crop.x * scaleX;
      const cropY = crop.y * scaleY;

      const centerX = image.naturalWidth / 2;
      const centerY = image.naturalHeight / 2;

      ctx.save();

      // 5) Move the crop origin to the canvas origin (0,0)
      ctx.translate(-cropX, -cropY);
      // 4) Move the origin to the center of the original position
      ctx.translate(centerX, centerY);
      // 3) Rotate around the origin
      // 2) Scale the image
      // 1) Move the center of the image to the origin (0,0)
      ctx.translate(-centerX, -centerY);
      ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight
      );

      // Get the MIME type of the original image
      // Get the MIME type of the original image
      const mimeType =
        image.src.split(';')[0].split(':')[1] ||
        'image/jpeg';

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL(mimeType);

      // Convert the data URL to a Blob
      const blob = await (await fetch(dataUrl)).blob();

      // Create a File object from the Blob
      const fileName = 'cropped-image.png'; // You can change this to any desired filename
      const file = new File([blob], fileName, {
        type: mimeType,
      });

      return file;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {children}
      <Modal
        opened={open}
        onClose={onClose}
        overlayProps={{
          blur: 20,
        }}
        size="lg"
        title={title}
        keepMounted={false}
      >
        <div className="mt-4">
          <div className="flex w-full justify-center bg-black">
            <ReactCrop
              crop={crop}
              circularCrop={circularCrop}
              aspect={aspect}
              onChange={c => setCrop(c)}
              onComplete={onComplete}
              onImageLoaded={onImageLoad}
              className="max-h-[300px]"
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imageSrc}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>

          <div className="mt-4 flex w-full flex-row-reverse">
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                onCropComplete(await getCroppedImg());
                onClose();
              }}
            >
              Crop
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CropModal;
