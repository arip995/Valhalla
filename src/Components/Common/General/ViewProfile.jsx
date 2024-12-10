import { Avatar } from '@mantine/core';
import { IconBadge } from '@tabler/icons-react';
import Image from 'next/image';

const ViewProfile = ({
  profilePic,
  name,
  title,
  description,
  inViewPage = true,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-md ring-1 ring-gray-100 md:p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-transparent opacity-50" />

      <div className="flex flex-col items-center text-center">
        {profilePic ? (
          <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-2xl border-4 border-white shadow-lg">
            {inViewPage ? (
              <Image
                className="h-full w-full object-cover transition duration-300 hover:scale-110"
                src={profilePic}
                width={112}
                height={112}
                quality={100}
                priority
                alt={name}
              />
            ) : (
              <img
                className="h-full w-full object-cover transition duration-300 hover:scale-110"
                src={profilePic}
                width={112}
                height={112}
                alt={name}
              />
            )}
          </div>
        ) : (
          <Avatar
            className="mb-4 h-24 w-24 rounded-2xl border-4 border-white shadow-lg"
            color="blue"
            size="xl"
            name={name}
          />
        )}

        <div className="flex flex-col items-center">
          {!!inViewPage && (
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-blue-600">
              <IconBadge className="h-4 w-4" />
              <span>Course Instructor</span>
            </div>
          )}

          <h3 className="text-2xl font-bold tracking-tight text-gray-900">
            {name?.toUpperCase()}
          </h3>

          {!!title && (
            <p className="mt-1 text-base font-medium text-gray-600">
              {title}
            </p>
          )}

          {!!description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
