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
  validateOnly = false
) => {
  try {
    // Validate file type and size
    if (
      !mimeTypes.some(mime =>
        file.type.startsWith(mime.slice(0, -1))
      )
    ) {
      throw new Error(
        `Only ${mimeTypes.map(item => item.slice(0, -1)).join(', ')} are allowed`
      );
    }
    if (file.size > maxFileSize * 1024 * 1024) {
      throw new Error(`File size exceeds ${maxFileSize}MB`);
    }
    if (validateOnly) return 'validated';

    const type =
      file.type === 'image/svg+xml'
        ? 'image/svg'
        : file.type;
    const payload = { type };

    // Get signed URL
    const data = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/image/save_image`,
      { file: payload }
    );
    const url = data.data.data.url;
    const signedUrl = data.data.data.signedUrl;

    // Upload to S3 with retry on 403
    try {
      await axios.put(signedUrl, file, {
        headers: { 'Content-Type': file.type },
      });
    } catch (error) {
      if (error.response?.status === 403) {
        console.warn('Retrying due to 403 error...');
        const retryData = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/image/save_image`,
          { file: payload }
        );
        await axios.put(
          retryData.data.data.signedUrl,
          file,
          {
            headers: { 'Content-Type': file.type },
          }
        );
        return retryData.data.data.url;
      }
      throw error;
    }

    return url;
  } catch (error) {
    console.error('Error handling file:', error);
    toast.error(error.message || 'Upload failed');
  }
};
