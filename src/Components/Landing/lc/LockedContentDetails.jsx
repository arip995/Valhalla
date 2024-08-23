/* eslint-disable @next/next/no-img-element */
import lockImage from '../../../../public/images/locked-content/lock.png';
import LockedContentBuyButton from './LockedContentBuyButton';

const LockedContentDetails = ({ data }) => {
  return (
    <>
      <div className="vlc-view-product-container">
        {data ? (
          <div className="vlc-view-product-locked-state bg-gradient-to-r from-teal-100 via-fuchsia-200 to-slate-100">
            <img
              src={lockImage.src}
              alt=""
              className="vlc-view-product-locked-state-image"
            />
            <div className="flex flex-col items-center justify-center gap-2 text-center text-sm font-semibold text-black">
              Content is locked
              <div>
                {data.files.length
                  ? `${data.files.length + 1} items`
                  : `1 item`}{' '}
              </div>
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
