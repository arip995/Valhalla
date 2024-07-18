/* eslint-disable @next/next/no-img-element */
import {
  IconFile,
  IconFileText,
  IconTrash,
  IconVideo,
} from '@tabler/icons-react';
import React from 'react';
import '../../../styles/common/list-files.css';
import { Text } from '@mantine/core';

const ListFiles = ({ files, onDelete = () => { } }) => {
  return (
    <div className="list-files-container">
      {files.map(item => {
        const isImage =
          !item.loading &&
            item.type.split('/')[0] === 'image'
            ? true
            : false;
        const isVideo =
          !item.loading &&
            item.type.split('/')[0] === 'video'
            ? true
            : false;

        return (
          <>
            {item.loading ? (
              <Text c="dimmed" size="sm">
                Uploading...
              </Text>
            ) : (
              <div
                className="list-files-content-container"
                key={item.name}
              >
                <div className="list-files-image-container flex gap-2 items-center">
                  {isImage ? (
                    <img
                      src={item.url}
                      alt=''
                      className="list-files-image"
                    />
                  ) : isVideo ? (
                    <IconVideo
                      color="gray"
                      size={16}
                      className="list-files-image"
                      stroke={1}
                    />
                  ) : (
                    <IconFileText
                      color="gray"
                      size={16}
                      className="list-files-image"
                      stroke={1}
                    />
                  )}
                  <div className="list-files-text">
                    {item.name}
                  </div>
                </div>
                <div className="list-files-text-container">

                  <div
                    className="list-files-delete"
                    onClick={() => onDelete(item.url)}
                  >
                    <IconTrash
                      className="list-files-delete-icon"
                      size={18}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default ListFiles;
