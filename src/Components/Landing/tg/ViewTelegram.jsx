import FooterTwo from '@/Components/Common/Footer/FooterTwo';
import ProductHeader from '../../Common/Header/Productheader';
import GLDetailsContainer from './GraphyLike/GLDetailsContainer';
import LTDetailsContainer from './LayoutTwo/LTDetailsContainers';

const ViewTelegram = ({ data }) => {
  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <ProductHeader data={data} />
      <div className="flex flex-1 flex-col justify-between">
        {data.layout ? (
          <GLDetailsContainer data={data} />
        ) : (
          <LTDetailsContainer data={data} />
        )}
        <div className="hidden md:block">
          <FooterTwo />
        </div>
      </div>
    </div>
  );
};

export default ViewTelegram;
