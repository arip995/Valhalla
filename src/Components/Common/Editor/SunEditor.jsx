import { handleFile } from '@/Utils/HandleFiles';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const CustomSunEditor = ({
  setContents,
  onChange,
  placeholder = '',
  setDefaultStyle = '',
  setOptions,
  defaultValue,
}) => {
  const onImageUploadBefore = async (
    files,
    info,
    uploadHandler
  ) => {
    const file = files[0];
    const { name } = file;
    const url = handleFile(file);

    const response = {
      result: [
        {
          url,
          name: name,
          size: file.size,
        },
      ],
    };
    uploadHandler(response);

    return false;
  };

  return (
    <SunEditor
      setContents={setContents}
      defaultValue={defaultValue}
      showToolbar={true}
      onChange={onChange}
      setDefaultStyle={setDefaultStyle}
      onImageUploadBefore={onImageUploadBefore}
      placeholder={placeholder}
      setOptions={setOptions}
    />
  );
};

export default CustomSunEditor;
