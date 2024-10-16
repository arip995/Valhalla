/* eslint-disable no-unused-vars */
'use client';

import { Modal } from '@mantine/core';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
const Quill = require('quill');
import 'react-quill/dist/quill.snow.css';

const CustomQuillEditor = () => {
  const [editorContent, setEditorContent] = useState('');
  const [showImageCrop, setShowImageCrop] = useState(false);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 30,
    aspect: 16 / 9,
  });
  const [imageSrc, setImageSrc] = useState('');
  const [croppedImageUrl, setCroppedImageUrl] =
    useState('');
  const imageRef = useRef(null);
  const quillRef = useRef(null);
  const [quillModules, setQuillModules] = useState({
    toolbar: [
      [{ header: [1, 2, false] }],
      [
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
      ],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ImageResize =
        require('quill-image-resize-module-react').default;
      Quill.register('modules/imageResize', ImageResize);

      const BlockEmbed = Quill.import('blots/block/embed');
      class VideoBlot extends BlockEmbed {
        static create(value) {
          const node = super.create();
          node.setAttribute('src', value);
          node.setAttribute('controls', true);
          node.setAttribute('width', '100%');
          node.setAttribute(
            'style',
            'max-width: 100%; height: auto;'
          );
          return node;
        }

        static value(node) {
          return node.getAttribute('src');
        }
      }
      VideoBlot.blotName = 'video';
      VideoBlot.tagName = 'video';
      Quill.register(VideoBlot);

      setQuillModules({
        toolbar: [
          [{ header: [1, 2, false] }],
          [
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
          ],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        imageResize: {
          parchment: Quill.import('parchment'),
          modules: ['Resize', 'DisplaySize', 'Toolbar'],
        },
      });
    }
  }, []);

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
  ];

  const handleImageUpload = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result);
        setShowImageCrop(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleVideoUpload = e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        const videoSrc = e.target?.result;
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'video', videoSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = crop => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(
        imageRef.current,
        crop
      );
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL('image/jpeg');
  };

  const insertCroppedImage = () => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection(true);
    quill.insertEmbed(
      range.index,
      'image',
      croppedImageUrl
    );
    setShowImageCrop(false);
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div>
        <div>Rich Text Editor</div>
      </div>
      <div>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={editorContent}
          onChange={setEditorContent}
          modules={quillModules}
          formats={formats}
        />
        {/* <div className="mb-6 flex space-x-4">
          <Button
            onClick={() =>
              document
                .getElementById('image-upload')
                ?.click()
            }
            variant="outline"
            className="flex items-center space-x-2"
          >
            <IconMessageCircleQuestion className="h-4 w-4" />
            <span>Upload Image</span>
          </Button>
          <Button
            onClick={() =>
              document
                .getElementById('video-upload')
                ?.click()
            }
            variant="outline"
            className="flex items-center space-x-2"
          >
            <IconDashboard className="h-4 w-4" />
            <span>Upload Video</span>
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />
        </div> */}
        <Modal
          open={showImageCrop}
          onOpenChange={setShowImageCrop}
        >
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={handleCropComplete}
            aspect={16 / 9}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Upload"
              className="max-w-full"
            />
          </ReactCrop>
        </Modal>
        {/* <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">
            Preview
          </h2>
          <div>
            <div className="prose mt-4 max-w-full">
              <div
                dangerouslySetInnerHTML={{
                  __html: editorContent,
                }}
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CustomQuillEditor;
