import toast from 'react-hot-toast';
import axiosInstance from './AxiosInstance';
import axios from 'axios';

export const convertFileToBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      const fileExtension =
        file.type === 'image/svg+xml'
          ? 'image/svg'
          : file.type;

      const pushObject = {
        base64: base64String,
        type: fileExtension,
        name: file.name,
      };
      resolve(pushObject);
    };
    reader.onerror = error => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export const handleFile = async (
  file,
  mimeTypes = ['image/'],
  maxFileSize = 1,
  quality = 50,
  validateOnly = false,
  isPresigned = false
) => {
  try {
    // Validate file type
    if (
      !mimeTypes.some(mime =>
        file.type.startsWith(mime.slice(0, -1))
      )
    ) {
      throw new Error(
        `Only ${mimeTypes.map(item => item.slice(0, -1)).join(', ')} are allowed`
      );
    }

    // Validate file size
    if (file.size > maxFileSize * 1024 * 1024) {
      throw new Error(`File size exceeds ${maxFileSize}MB`);
    }
    if (validateOnly) return 'validated';

    const type =
      file.type === 'image/svg+xml'
        ? 'image/svg'
        : file.type;
    let payload = {
      type,
      quality,
      isPresigned,
    };

    if (!isPresigned) {
      // Convert file to base64
      const fileData = await convertFileToBase64(file);
      payload = {
        ...payload,
        ...fileData,
      };
    }

    // Upload file
    const data = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/image/save_image`,
      {
        file: { ...payload },
      }
    );
    let url = data.data.data.url;

    if (isPresigned) {
      await axios.put(data.data.data.signedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
    }
    // Return uploaded file URL
    return url;
  } catch (error) {
    // Handle errors
    console.error('Error handling file:', error);
    toast.error(error.message);
  }
};
