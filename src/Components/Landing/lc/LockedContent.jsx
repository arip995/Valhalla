import { Anchor, Avatar, Button } from '@mantine/core';
import lockImage from '../../../../public/images/locked-content/lock.png';
import ViewProductHeader from '../../Common/Header/ViewProductHeader';
import Disclaimer from '../../Common/Footer/Disclaimer';
import Footer from '../../Common/Footer/Footer';

const LockedContent = ({ productData }) => {
  return (
    <>
      <div className="vlc-view-wrapper">
        <div className="vlc-view-container">
          <ViewProductHeader
            profilePic={
              productData?.creatorDetails?.profilePic
            }
            firstName={
              productData?.creatorDetails?.firstName
            }
            lastName={productData?.creatorDetails?.lastName}
            username={productData?.creatorDetails?.username}
          />
          <div className="vlc-view-product-title">
            {productData?.title}
          </div>
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
          <Disclaimer />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LockedContent;
