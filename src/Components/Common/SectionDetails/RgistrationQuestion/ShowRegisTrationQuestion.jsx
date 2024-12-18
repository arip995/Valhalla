import { rem } from '@mantine/core';
import { IconGripVertical } from '@tabler/icons-react';
import React from 'react';
import { ActionMenu } from '../ShowSectionsList';
import { capitalizeFirstLetter } from '@/Utils/Common';

const ShowRegisTrationQuestion = ({
  dragHandleProps,
  item,
  showDrag,
  onAddOrEditSection = () => {},
  onDelete = () => {},
}) => {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-solid border-b-neutral-200 bg-white px-2 py-4">
      <div className="flex w-full items-center gap-2">
        {!!showDrag && (
          <div
            {...(dragHandleProps || {})}
            className="cursor-grab"
          >
            <IconGripVertical
              color="rgba(199, 199, 199, 1)"
              style={{
                width: rem(16),
                height: rem(16),
              }}
            />
          </div>
        )}
        <div className="flex flex-col justify-center gap-2 text-sm font-medium">
          <div className="text-truncate">
            {capitalizeFirstLetter(item.type)}
          </div>
          <div className="text-xs text-neutral-500">
            {item.question}
          </div>
        </div>
      </div>
      <ActionMenu
        onClick={val => {
          if (val === 'delete') {
            onDelete('registrationQuestion', item);
            return;
          }
          onAddOrEditSection(
            'registrationQuestion',
            item,
            true
          );
        }}
      />
    </div>
  );
};

export default ShowRegisTrationQuestion;
