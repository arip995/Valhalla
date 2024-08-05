import Disclaimer from '../../Common/Footer/Disclaimer';
import Footer from '../../Common/Footer/Footer';
import ViewProductHeader from '../../Common/Header/ViewProductHeader';
import LockedContentDetails from './LockedContentDetails';

const LockedContent = ({ data }) => {
  return (
    <div className="flex min-h-svh flex-col justify-between">
      <div className="vlc-view-wrapper">
        <div className="vlc-view-container">
          <ViewProductHeader
            profilePic={
              data.coverImage?.url ||
              data.creatorDetails.profilePic
            }
            firstName={data.creatorDetails.firstName}
            lastName={data.creatorDetails.lastName}
            username={data.creatorDetails.username}
            title={data.title}
          />
          <LockedContentDetails data={data} />

          <Disclaimer />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LockedContent;
