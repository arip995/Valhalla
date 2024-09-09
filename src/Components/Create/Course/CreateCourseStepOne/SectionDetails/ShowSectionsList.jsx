import { ActionIcon, rem } from '@mantine/core';
import {
  IconDotsVertical,
  IconGripVertical,
  IconPhoto,
} from '@tabler/icons-react';
import React from 'react';
import { SocialTitleMapping } from './Sections';

const ShowSectionsList = ({
  provided,
  item,
  showDrag,
  type,
  // onAddOrEditSection,
}) => {
  if (type === 'testimonial') {
    return (
      <div className="flex items-center justify-between gap-2 border-b border-solid border-b-neutral-200 bg-white px-2 py-4">
        <div className="flex w-full items-start gap-2">
          {!!showDrag && (
            <div
              {...(provided?.dragHandleProps || {})}
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
            <div className="text-truncate">{item.name}</div>
            <div className="text-xs text-neutral-500">
              {item.description}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ActionIcon
            variant="subtle"
            color="rgba(199, 199, 199, 1)"
            onClick={() => () => {}}
            size="xs"
          >
            <IconDotsVertical />
          </ActionIcon>
        </div>
      </div>
    );
  }
  if (type === 'faq') {
    return (
      <div className="flex items-center justify-between gap-2 border-b border-solid border-b-neutral-200 bg-white px-2 py-4">
        <div className="flex w-full items-start gap-2">
          {!!showDrag && (
            <div
              {...(provided?.dragHandleProps || {})}
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
              {item.question}
            </div>
            <div className="text-xs text-neutral-500">
              {item.answer}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ActionIcon
            variant="subtle"
            color="rgba(199, 199, 199, 1)"
            onClick={() => () => {}}
            size="xs"
          >
            <IconDotsVertical />
          </ActionIcon>
        </div>
      </div>
    );
  }
  if (type === 'benifit') {
    return (
      <div className="flex items-center justify-between gap-2 border-b border-solid border-b-neutral-200 bg-white px-2 py-4">
        <div className="flex w-full items-center gap-2">
          {!!showDrag && (
            <div
              {...(provided?.dragHandleProps || {})}
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
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className="text-truncate">
              {item.value}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ActionIcon
            variant="subtle"
            color="rgba(199, 199, 199, 1)"
            onClick={() => () => {}}
            size="xs"
          >
            <IconDotsVertical />
          </ActionIcon>
        </div>
      </div>
    );
  }
  if (type === 'gallery') {
    return (
      <div className="flex items-center justify-between gap-2 border-b border-solid border-b-neutral-200 bg-white px-2 py-4">
        <div className="flex w-full items-center gap-2">
          {!!showDrag && (
            <div
              {...(provided?.dragHandleProps || {})}
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
          <div className="flex items-center gap-2 text-sm font-medium">
            <IconPhoto className="min-w-max" />
            <div className="text-truncate">{item.name}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ActionIcon
            variant="subtle"
            color="rgba(199, 199, 199, 1)"
            onClick={() => () => {}}
            size="xs"
          >
            <IconDotsVertical />
          </ActionIcon>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between gap-2 border-b border-solid border-b-neutral-200 bg-white px-2 py-4">
      <div className="flex w-full items-start gap-2">
        {!!showDrag && (
          <div
            {...(provided?.dragHandleProps || {})}
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
        <div className="flex flex-col items-start gap-2 text-sm font-medium">
          <div className="text-truncate">
            {SocialTitleMapping[item.type]}
          </div>
          <div className="text-xs text-neutral-500">
            {item.value}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ActionIcon
          variant="subtle"
          color="rgba(199, 199, 199, 1)"
          onClick={() => () => {}}
          size="xs"
        >
          <IconDotsVertical />
        </ActionIcon>
      </div>
    </div>
  );
};

export default React.memo(ShowSectionsList);
