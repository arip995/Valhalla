import { Avatar } from '@mantine/core';
import React from 'react';
import '../../../styles/common/view-product-header.css';
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
      <div className="vph-avatar-container">
        {profilePic ? (
          <Image
            className="h-[80px] w-[80px] overflow-hidden rounded-full"
            src={profilePic}
            width={80}
            height={80}
            quality={100}
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

        {/* <Avatar size="xl" color="blue" src={profilePic}>
          {firstName?.[0].toUpperCase()}
          {lastName?.[0].toUpperCase()}
        </Avatar> */}
        <div className="vph-creator-details-container">
          <div className="vph-creator-details-heading">
            Created by
          </div>
          <div className="vph-creator-details-name">
            {firstName?.toUpperCase()}{' '}
            {lastName?.toUpperCase()}
          </div>
          <div className="vph-creator-details-username">
            @{username}
          </div>
        </div>
      </div>
      <div className="vlc-view-product-title">{title}</div>
    </>
  );
};

export default ViewProductHeader;
