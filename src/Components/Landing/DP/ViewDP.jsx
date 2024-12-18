import NotFound from '@/app/not-found';
// eslint-disable-next-line no-unused-vars
import ViewDPOne from './LayoutOne/ViewDPOne';

const ViewDP = ({ data }) => {
  if (!data) return <NotFound />;

  return (
    <div className="h-screen w-full">
      {/* <ViewCourseOne data={data} /> */}
      <ViewDPOne data={data} />
    </div>
  );
};

export default ViewDP;
