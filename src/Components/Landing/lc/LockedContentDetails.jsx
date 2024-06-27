import lockImage from '../../../../public/images/locked-content/lock.png';
import LockedContentBuyButton from './LockedContentBuyButton';

const LockedContentDetails = ({ data }) => {
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
              Content is locked
            </div>
          </div>
        ) : (
          <div className="vlc-view-product-unlocked-state"></div>
        )}
      </div>
      <LockedContentBuyButton data={data} />
    </>
  );
};

export default LockedContentDetails;
