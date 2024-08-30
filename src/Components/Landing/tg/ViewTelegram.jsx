import FooterTwo from '@/Components/Common/Footer/FooterTwo';
import GLProductheader from './GraphyLike/GLProductheader';
import GLDetailsContainer from './GraphyLike/GLDetailsContainer';

const ViewTelegram = ({ prefetchedData }) => {
  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <GLProductheader data={prefetchedData} />
      <div className="flex flex-1 flex-col justify-between overflow-y-auto">
        <GLDetailsContainer data={prefetchedData} />
        <div className="hidden md:block">
          <FooterTwo />
        </div>
      </div>
    </div>
  );
};

export default ViewTelegram;
