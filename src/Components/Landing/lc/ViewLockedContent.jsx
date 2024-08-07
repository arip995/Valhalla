import '../../../styles/view/locked-content.css';
import LockedContent from './LockedContent';

const ViewLockedContent = async ({ data, id }) => {
  return (
    <div className="vlc-container" suppressHydrationWarning>
      <LockedContent data={data} productId={id} />
    </div>
  );
};

export default ViewLockedContent;
