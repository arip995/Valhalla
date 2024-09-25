import FooterTwo from '@/Components/Common/Footer/FooterTwo';
import Disclaimer from '@/Components/Common/Footer/Disclaimer';
import ViewProfile from '@/Components/Common/General/ViewProfile';
import ViewLockedContentDetails from './ViewLockedContentDetails';

const ViewLockedContentContainer = ({ data }) => {
  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="vlc-view-wrapper">
        <div className="vlc-view-container">
          <ViewProfile
            profilePic={
              data.coverImage?.url ||
              data.creatorDetails.profilePic
            }
            name={`${data.creatorDetails.firstName} ${data.creatorDetails.lastName}`}
            username={data.creatorDetails.username}
            title={data.title}
          />
          <ViewLockedContentDetails data={data} />

          <Disclaimer />
        </div>
      </div>
      <FooterTwo
        description={`Want to create your own content? Experience
            hassle-free payouts and premium support.`}
      />
    </div>
  );
};

export default ViewLockedContentContainer;
