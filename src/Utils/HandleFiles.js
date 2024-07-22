import toast from 'react-hot-toast';
import axiosInstance from './AxiosInstance';

export const convertFileToBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      const pushObject = {
        base64: base64String,
        type:
          file.type === 'image/svg+xml'
            ? 'image/svg'
            : file.type,
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
  mimetypes = ['image'],
  maxFileSize = 10,
  quality = 50
) => {
  const fileType = file.type;
  const fileSize = file.size;

  if (mimetypes.some(mime => fileType.startsWith(mime))) {
    if (fileSize <= maxFileSize * 1024 * 1024) {
      try {
        const payload = await convertFileToBase64(file);
        const data = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/image/save_image`,
          { file: { ...payload, quality: quality } }
        );
        return data.data.data.url;
      } catch (error) {
        console.error('Error converting file:', error);
      }
    } else {
      toast.error('File size exceeds 10MB');
    }
  } else {
    toast.error(
      `Only ${mimetypes.map(item => item.slice(0, -1)).join(', ')} are allowed`
    );
  }
};
