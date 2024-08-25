import '../../../styles/view/locked-content.css';
import LockedContent from './LockedContent';

const ViewLockedContent = async ({ data, productId }) => {
  return (
    <div
      className="vlc-container flex min-h-svh w-full overflow-auto"
      suppressHydrationWarning
    >
      <LockedContent data={data} productId={productId} />
    </div>
  );
};

export default ViewLockedContent;
