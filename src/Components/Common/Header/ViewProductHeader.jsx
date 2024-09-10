import { Avatar } from '@mantine/core';
import React from 'react';
import Image from 'next/image';

const ViewProductHeader = ({
  profilePic,
  name,
  // username,
  title,
  description,
  showVercelImageTag = true,
}) => {
  return (
    <>
      <div className="flex items-center gap-3">
        {profilePic ? (
          <>
            {showVercelImageTag ? (
              <Image
                className="h-[80px] w-[80px] overflow-hidden rounded-full object-cover"
                src={profilePic}
                width={80}
                height={80}
                quality={100}
                priority
              />
            ) : (
              <img
                className="h-[80px] w-[80px] overflow-hidden rounded-full object-cover"
                src={profilePic}
                width={80}
                height={80}
              />
            )}
          </>
        ) : (
          <Avatar
            className="h-[80px] w-[80px]"
            color="initials"
            size="lg"
            name={name}
            key={name || ''}
          />
        )}
        <div className="flex flex-col justify-start">
          <div className="text-sm">Created by</div>
          <div className="text-sm font-bold">
            {name?.toUpperCase()}
          </div>
          {/* <div className="text-sm">@{username}</div> */}
        </div>
      </div>
      {!!title && (
        <div
          className="mt-2 text-lg font-bold text-black"
          style={{
            overflowWrap: 'anywhere',
          }}
        >
          {title}
        </div>
      )}
      {!!description && (
        <div
          className="mt-2 text-sm font-normal text-gray-700"
          style={{
            overflowWrap: 'anywhere',
          }}
        >
          {description}
        </div>
      )}
    </>
  );
};

export default ViewProductHeader;
