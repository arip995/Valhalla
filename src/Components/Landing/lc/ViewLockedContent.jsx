import '../../../styles/view/locked-content.css';
import GLProductheader from '../tg/GraphyLike/GLProductheader';
import LockedContent from './LockedContent';

const ViewLockedContent = async ({ data, productId }) => {
  return (
    <div
      className="vlc-container flex h-screen w-full flex-col overflow-auto"
      suppressHydrationWarning
    >
      <GLProductheader data={data} />
      <div className="flex flex-1 flex-col justify-between overflow-y-auto">
        <LockedContent data={data} productId={productId} />
      </div>
    </div>
  );
};

export default ViewLockedContent;
