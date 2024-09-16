import { Text } from '@mantine/core';
import {
  IconFileText,
  IconLink,
  IconMusic,
  IconPhoto,
  IconTrash,
  IconVideo,
} from '@tabler/icons-react';
import { useCallback } from 'react';
import '../../../styles/common/list-files.css';

const ListFiles = ({
  files,
  onDelete = () => {},
  showTrash = true,
}) => {
  console.log(files);
  const ListOfItems = useCallback(({ item }) => {
    if (!item) return null;
    const isImage =
      !item.loading && item.type.split('/')[0] === 'image'
        ? true
        : false;
    const isAudio =
      !item.loading && item.type.split('/')[0] === 'audio'
        ? true
        : false;
    const isVideo =
      !item.loading && item.type.split('/')[0] === 'video'
        ? true
        : false;
    const isLink = item.type === 'link' ? true : false;
    return (
      <div
        className="list-files-content-container"
        key={item.name}
      >
        <div className="list-files-image-container flex items-center gap-2">
          {isImage ? (
            <IconPhoto
              color="gray"
              className="list-files-image"
              stroke={1}
            />
          ) : isVideo ? (
            <IconVideo
              color="gray"
              className="list-files-image"
              stroke={1}
            />
          ) : isAudio ? (
            <IconMusic
              color="gray"
              className="list-files-image"
              stroke={1}
            />
          ) : isLink ? (
            <IconLink
              color="gray"
              className="list-files-image"
              stroke={1}
            />
          ) : (
            <IconFileText
              color="gray"
              className="list-files-image"
              stroke={1}
            />
          )}
          <div className="list-files-text">
            {item.name || item.link}
          </div>
        </div>
        {showTrash && (
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
        )}
      </div>
    );
  }, []);

  return (
    <div className="list-files-container">
      {files.map(item => {
        return (
          <>
            {item.loading ? (
              <Text c="dimmed" size="sm">
                Uploading...
              </Text>
            ) : (
              <ListOfItems item={item} />
            )}
          </>
        );
      })}
    </div>
  );
};

export default ListFiles;
