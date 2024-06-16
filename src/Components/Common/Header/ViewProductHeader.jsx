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
        {/* <div
          className=""
          style={{
            width: '84px',
            height: '84px',
            overflow: 'hidden',
            borderRadius: '100%',
          }}
        >
          <Image
            src={profilePic}
            width={500}
            height={600}
            quality={100}
          />
        </div> */}
        <Avatar size="xl" color="blue" src={profilePic}>
          {firstName?.[0].toUpperCase()}
          {lastName?.[0].toUpperCase()}
        </Avatar>
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
