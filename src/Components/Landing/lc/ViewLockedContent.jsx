import '../../../styles/view/locked-content.css';
import ProductHeader from '../../Common/Header/Productheader';
import LockedContent from './LockedContent';

const ViewLockedContent = async ({ data, productId }) => {
  return (
    <div
      className="vlc-container flex h-screen w-full flex-col overflow-auto"
      suppressHydrationWarning
    >
      <ProductHeader data={data} />
      <div className="flex flex-1 flex-col justify-between overflow-y-auto">
        <LockedContent data={data} productId={productId} />
      </div>
    </div>
  );
};

export default ViewLockedContent;
