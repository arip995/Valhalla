import FooterTwo from '@/Components/Common/Footer/FooterTwo';
import ProductHeader from '../../Common/Header/Productheader';
import GLDetailsContainer from './GraphyLike/GLDetailsContainer';

const ViewTelegram = ({ prefetchedData }) => {
  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <ProductHeader data={prefetchedData} />
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
