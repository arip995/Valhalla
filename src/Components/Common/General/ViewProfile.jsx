import { Avatar } from '@mantine/core';
import Image from 'next/image';

const ViewProfile = ({
  profilePic,
  name,
  title,
  description,
  inViewPage = true,
  type = false,
}) => {
  return (
    <>
      {type ? (
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
                    width={88}
                    height={88}
                    quality={100}
                    priority
                    alt={name}
                  />
                ) : (
                  <img
                    className="h-full w-full object-cover transition duration-300 hover:scale-110"
                    src={profilePic}
                    width={88}
                    height={88}
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
      ) : (
        <>
          <div className="flex items-center gap-3">
            {profilePic ? (
              <>
                {inViewPage ? (
                  <Image
                    className="h-[80px] w-[80px] overflow-hidden rounded-full object-cover"
                    src={profilePic}
                    width={50}
                    height={50}
                    quality={100}
                    priority
                    alt={name}
                  />
                ) : (
                  <img
                    className="h-[80px] w-[80px] overflow-hidden rounded-full object-cover"
                    src={profilePic}
                    width={50}
                    height={50}
                    alt={name}
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
              {!!inViewPage && (
                <div className="text-sm">Created by</div>
              )}
              <div className="text-sm font-semibold">
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
      )}
    </>
  );
};

export default ViewProfile;
