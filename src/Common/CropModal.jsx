import React, {
  useState,
  useRef,
  useCallback,
} from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import 'react-image-crop/dist/ReactCrop.css';
import { Button, Modal, Slider } from '@mantine/core';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function ImageCropModal({
  open,
  imageSrc,
  onClose,
  onCropComplete,
  aspect = 1,
  circularCrop = true,
}) {
  const [crop, setCrop] = useState({
    unit: '%',
  }); // Initial crop state with a 1:1 aspect ratio
  const [completedCrop, setCompletedCrop] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const imgRef = useRef(null);

  // Handle setting the image reference when loaded
  const onImageLoad = useCallback(e => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }, []);

  // Handle the crop completion
  const onComplete = crop => {
    setCompletedCrop(crop);
  };

  // Generate the cropped image using canvas
  const getCroppedImg = async () => {
    if (!completedCrop || !imgRef.current) return;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to crop area
    const cropWidth = completedCrop.width * scale;
    const cropHeight = completedCrop.height * scale;
    canvas.width = cropWidth;
    canvas.height = cropHeight;

    // Set transformation to rotate and scale the image
    ctx.translate(cropWidth / 2, cropHeight / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.translate(-cropWidth / 2, -cropHeight / 2);

    // Draw the image on the canvas
    ctx.drawImage(
      image,
      completedCrop.x * scale,
      completedCrop.y * scale,
      completedCrop.width * scale,
      completedCrop.height * scale,
      0,
      0,
      cropWidth,
      cropHeight
    );

    // Get the cropped image as a blob URL
    canvas.toBlob(blob => {
      if (blob) {
        const croppedImageUrl = URL.createObjectURL(blob);
        onCropComplete(croppedImageUrl);
        onClose();
      }
    }, 'image/jpeg');
  };

  return (
    <Modal opened={open} onClose={onClose} size="lg">
      <div
        style={{
          padding: 20,
          background: '#fff',
          margin: 'auto',
          maxWidth: 600,
        }}
      >
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
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>

        <div style={{ marginTop: 20 }}>
          <div className="mb-6 flex w-full items-center gap-2">
            Scale:
            <Slider
              className="w-full"
              label={scale}
              defaultValue={scale}
              min={1}
              max={5}
              step={0.2}
              onChange={setScale}
            />
          </div>
          <div className="mb-6 flex w-full items-center gap-2">
            Rotation:
            <Slider
              className="w-full"
              label={rotation}
              defaultValue={rotation}
              min={0}
              max={360}
              step={1}
              onChange={setRotation}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={getCroppedImg}
          >
            Crop
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ImageCropModal;
