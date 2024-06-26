'use client';
import useUser from '@/Utils/Hooks/useUser';
import { Button } from '@mantine/core';
import React, { useState } from 'react';
import lockImage from '../../../../public/images/locked-content/lock.png';

const LockedContentDetails = ({ data }) => {
  const { user } = useUser();
  const [productData, setProductData] = useState(data);

  return (
    <>
      <div className="vlc-view-product-container">
        {true ? (
          <div className="vlc-view-product-locked-state">
            <img
              src={lockImage.src}
              alt=""
              className="vlc-view-product-locked-state-image"
            />
            <div className="vlc-view-product-locked-state-text">
              Message is locked
            </div>
          </div>
        ) : (
          <div className="vlc-view-product-unlocked-state"></div>
        )}
      </div>
      <div className="vlc-view-product-button">
        <Button size="md">
          Unlock for ₹{productData?.price}
        </Button>
      </div>
    </>
  );
};

export default LockedContentDetails;
