import { Avatar } from '@mantine/core';
import React from 'react';
import '../../../styles/common/view-product-header.css';

const ViewProductHeader = ({
  profilePic,
  firstName,
  lastName,
  username,
}) => {
  return (
    <div className="vph-avatar-container">
      {profilePic ? (
        <Avatar src={profilePic} size="xl"></Avatar>
      ) : (
        <Avatar size="xl" color="blue">
          {firstName?.toUpperCase()}
          {lastName?.toUpperCase()}
        </Avatar>
      )}
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
  );
};

export default ViewProductHeader;
