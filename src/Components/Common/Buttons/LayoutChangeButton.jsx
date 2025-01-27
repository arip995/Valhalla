import { IconLayout2, IconList } from '@tabler/icons-react';
import classNames from 'classnames';
import React from 'react';

const LayoutChangeButton = ({ isGrid, setIsGrid }) => {
  return (
    <div className="flex h-[40px] items-center gap-1 rounded-sm border border-gray-200 p-1">
      <IconList
        onClick={e => {
          e.stopPropagation();
          setIsGrid(false);
        }}
        color="gray"
        stroke={1}
        className={classNames(
          'cursor-pointer rounded-sm hover:bg-gray-200',
          {
            'bg-gray-200 text-black': !isGrid,
          }
        )}
      />
      <IconLayout2
        onClick={e => {
          e.stopPropagation();
          setIsGrid(true);
        }}
        color="gray"
        stroke={1}
        className={classNames(
          'cursor-pointer rounded-sm hover:bg-gray-200',
          {
            'bg-gray-200 text-black': isGrid,
          }
        )}
      />
    </div>
  );
};

export default LayoutChangeButton;
