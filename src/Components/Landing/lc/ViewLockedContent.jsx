import '../../../styles/view/locked-content.css';
import LockedContent from './LockedContent';

const ViewLockedContent = async ({ data, productId }) => {
  return (
    <div className="vlc-container" suppressHydrationWarning>
      <LockedContent data={data} productId={productId} />
    </div>
  );
};

export default ViewLockedContent;
