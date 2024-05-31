import {
  IconFile,
  IconFileText,
  IconTrash,
} from '@tabler/icons-react';
import React from 'react';
import '../../../styles/common/list-files.css';

const ListFiles = ({ files, onDelete = () => {} }) => {
  return (
    <div className="list-files-container">
      {files.map(item => {
        const isImage =
          item.type.split('/')[0] === 'image'
            ? true
            : false;

        return (
          <div className="list-files-content-container">
            <div className="list-files-image-container">
              {isImage ? (
                <img
                  src={item.showImage}
                  className="list-files-image"
                />
              ) : (
                <IconFileText
                  color="gray"
                  size={16}
                  className="list-files-image"
                  stroke={1}
                />
              )}
            </div>
            <div className="list-files-text-container">
              <div className="list-files-text">
                {item.name}
              </div>
              <div
                className="list-files-delete"
                onClick={() => onDelete(item.name)}
              >
                <IconTrash
                  className="list-files-delete-icon"
                  size={16}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListFiles;
