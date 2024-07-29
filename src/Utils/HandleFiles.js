import toast from 'react-hot-toast';
import axiosInstance from './AxiosInstance';

/**
 * Converts a file to a base64 encoded string.
 *
 * @param {File} file - The file to convert.
 * @returns {Promise<{ base64: string, type: string, name: string }>} A promise resolving to an object containing the base64 encoded string, file type, and file name.
 */
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

/**
 * Handles file upload with validation for mime types and file sizes.
 *
 * @param {File} file - The file to upload.
 * @param {string[]} [mimetypes=['image']] - An array of allowed mime types.
 * @param {number} [maxFileSize=1] - The maximum file size in megabytes.
 * @param {number} [quality=50] - The image quality (1-100).
 * @returns {Promise<string>} A promise resolving to the uploaded file URL.
 */
export const handleFile = async (
  file,
  mimetypes = ['image'],
  maxFileSize = 1,
  quality = 50
) => {
  try {
    // Validate file type
    if (
      !mimetypes.some(mime => file.type.startsWith(mime))
    ) {
      throw new Error(
        `Only ${mimetypes.map(item => item.slice(0, -1)).join(', ')} are allowed`
      );
    }

    // Validate file size
    if (file.size > maxFileSize * 1024 * 1024) {
      throw new Error(`File size exceeds ${maxFileSize}MB`);
    }

    // Convert file to base64
    const payload = await convertFileToBase64(file);

    // Upload file
    const data = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/image/save_image`,
      {
        file: { ...payload, quality },
      }
    );

    // Return uploaded file URL
    return data.data.data.url;
  } catch (error) {
    // Handle errors
    console.error('Error handling file:', error);
    toast.error(error.message);
  }
};
