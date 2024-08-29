import { Avatar } from '@mantine/core';
import React from 'react';
import Image from 'next/image';

const ViewProductHeader = ({
  profilePic,
  firstName,
  lastName,
  username,
  title,
}) => {
  return (
    <>
      <div className="flex items-center gap-3">
        {profilePic ? (
          <Image
            className="h-[80px] w-[80px] overflow-hidden rounded-full object-cover"
            src={profilePic}
            width={80}
            height={80}
            quality={100}
            priority
          />
        ) : (
          <Avatar
            className="h-[80px] w-[80px]"
            color="initials"
            size="lg"
            name={`${firstName || ''} ${lastName || ''}`}
            key={lastName || ''}
          />
        )}
        <div className="flex flex-col justify-start">
          <div className="text-sm">Created by</div>
          <div className="text-sm font-bold">
            {firstName?.toUpperCase()}{' '}
            {lastName?.toUpperCase()}
          </div>
          <div className="text-sm">@{username}</div>
        </div>
      </div>
      {!!title && (
        <div
          className="text-lg font-bold text-black"
          style={{
            overflowWrap: 'anywhere',
          }}
        >
          {title}
        </div>
      )}
    </>
  );
};

export default ViewProductHeader;
