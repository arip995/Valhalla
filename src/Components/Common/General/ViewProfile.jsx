import { Avatar } from '@mantine/core';
import React from 'react';
import Image from 'next/image';

const ViewProfile = ({
  profilePic,
  name,
  title,
  description,
  inViewPage = true,
}) => {
  return (
    <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center gap-4">
        {profilePic ? (
          <div className="relative h-[90px] w-[90px] overflow-hidden rounded-full">
            {inViewPage ? (
              <Image
                className="object-cover"
                src={profilePic}
                width={90}
                height={90}
                quality={100}
                priority
              />
            ) : (
              <img
                className="object-cover"
                src={profilePic}
                width={90}
                height={90}
              />
            )}
          </div>
        ) : (
          <Avatar
            className="h-[90px] w-[90px]"
            color="initials"
            size="lg"
            name={name}
          />
        )}
        <div className="flex flex-col justify-center">
          {!!inViewPage && (
            <div className="text-sm text-gray-500">
              Created by
            </div>
          )}
          <div className="text-xl font-semibold text-gray-900">
            {name?.toUpperCase()}
          </div>
        </div>
      </div>
      {!!title && (
        <div className="mt-4 text-2xl font-semibold text-gray-800">
          {title}
        </div>
      )}
      {!!description && (
        <div className="mt-4 text-sm leading-relaxed text-gray-600">
          {description}
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
