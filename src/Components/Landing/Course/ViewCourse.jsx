import NotFound from '@/app/not-found';
import React from 'react';
import ViewCourseOne from './LayoutOne/ViewCourseOne';

const ViewCourse = ({ data }) => {
  if (!data) return <NotFound />;

  return (
    <div className="h-screen w-full">
      <ViewCourseOne data={data} />
    </div>
  );
};

export default ViewCourse;
