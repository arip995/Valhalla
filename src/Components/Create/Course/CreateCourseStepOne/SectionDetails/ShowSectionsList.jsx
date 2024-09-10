import { ActionIcon, Menu, rem } from '@mantine/core';
import {
  IconCertificate,
  IconDeviceMobile,
  IconDotsVertical,
  IconDownload,
  IconEdit,
  IconFileText,
  IconGripVertical,
  IconInfinity,
  IconPhoto,
  IconTrash,
  IconVideo,
} from '@tabler/icons-react';
import React from 'react';
import { SocialTitleMapping } from './Sections';
import ViewProductHeader from '@/Components/Common/Header/ViewProductHeader';
import { modals } from '@mantine/modals';
const Actions = [
  {
    label: 'Edit',
    icon: IconEdit,
    value: 'edit',
  },
  {
    label: 'Delete',
    icon: IconTrash,
    value: 'delete',
    color: 'red',
  },
];

const ActionMenu = ({ onClick = () => {}, type }) => {
  return (
    <Menu shadow="md" width={100} position="bottom-end">
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          color="rgba(199, 199, 199, 1)"
          onClick={() => () => {}}
          size="sm"
        >
          <IconDotsVertical
            style={{
              width: '70%',
              height: '70%',
            }}
          />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {Actions.map(action => {
          if (
            type === 'gallery' &&
            action.value === 'edit'
          ) {
            return null;
          }
          return (
            <Menu.Item
              key={action.value}
              color={action.color}
              leftSection={
                <action.icon
                  style={{
                    width: rem(16),
                    height: rem(16),
                  }}
                />
              }
              onClick={() => {
                onClick(action.value);
              }}
            >
              {action.label}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};

const ShowSectionsList = ({
  provided,
  item,
  showDrag,
  type,
  onAddOrEditSection = () => {},
  onDeleteSectionItems = () => {},
}) => {
  const onDelete = (type, item) => {
    modals.openConfirmModal({
      title: 'Delete section',
      overlayProps: {
        blur: 20,
      },
      children: (
        <div className="my-4 font-bold text-black">
          Are you sure you want to delete this {type}?
        </div>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        onDeleteSectionItems(type, item);
      },
    });
  };
  if (type === 'testimonial') {
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
          <img
            src={item.image}
            alt=""
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col justify-center gap-2 text-sm font-medium">
            <div className="text-truncate">{item.name}</div>
            <div className="text-xs text-neutral-500">
              {item.description}
            </div>
          </div>
        </div>
        <ActionMenu
          onClick={val => {
            if (val === 'delete') {
              onDelete('testimonial', item);
              return;
            }
            onAddOrEditSection('testimonial', item, true);
          }}
        />
      </div>
    );
  }
  if (type === 'faq') {
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
          <div className="flex flex-col justify-center gap-2 text-sm font-medium">
            <div className="text-truncate">
              {item.question}
            </div>
            <div className="text-xs text-neutral-500">
              {item.answer}
            </div>
          </div>
        </div>
        <ActionMenu
          onClick={val => {
            if (val === 'delete') {
              onDelete('faq', item);
              return;
            }
            onAddOrEditSection('faq', item, true);
          }}
        />
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
        {/* <ActionMenu
          onClick={val => {
            if (val === 'delete') {
              onDelete('benifit', item);
              return;
            }
            onAddOrEditSection('benifit', item, true);
          }}
        /> */}
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
      </div>
    );
  }
  if (type == 'about' && item?.name) {
    return (
      <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold">
          About me
        </div>
        <ViewProductHeader
          profilePic={item?.image}
          name={item.name}
          description={item.description}
          inViewPage={false}
        />
      </div>
    );
  }
  if (type == 'highlight') {
    return (
      <div className="max-w-2xl rounded-lg bg-white px-2 py-4">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          This course includes:
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-3">
            <IconVideo className="h-6 w-6 min-w-max text-blue-500" />
            <p className="font-thin text-gray-700">
              61 hours on-demand video
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <IconInfinity className="h-6 w-6 min-w-max text-green-500" />
            <p className="font-thin text-gray-700">
              Lifietime access
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <IconFileText className="h-6 w-6 min-w-max text-purple-500" />
            <p className="font-thin text-gray-700">
              65 articles
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <IconDownload className="h-6 w-6 min-w-max text-yellow-500" />
            <p className="font-thin text-gray-700">
              194 downloadable resources
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <IconDeviceMobile className="h-6 w-6 min-w-max text-red-500" />
            <p className="font-thin text-gray-700">
              Access on mobile and TV
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <IconCertificate className="h-6 w-6 min-w-max text-indigo-500" />
            <p className="font-thin text-gray-700">
              Certificate of completion
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (type === 'social') {
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
          <div className="flex flex-col items-start gap-2 text-sm font-medium">
            <div className="text-truncate">
              {SocialTitleMapping[item.type]}
            </div>
            <div className="text-xs text-neutral-500">
              {item.value}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default React.memo(ShowSectionsList);
