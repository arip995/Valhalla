import NotFound from '@/app/not-found';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import ViewCourseOne from './LayoutOne/ViewCourseOne';
import ViewCourseTwo from './LayoutTwo/ViewCourseTwo';

const ViewCourse = ({ data }) => {
  if (!data) return <NotFound />;

  return (
    <div className="h-screen w-full">
      {/* <ViewCourseOne data={data} /> */}
      <ViewCourseTwo data={data} />
    </div>
  );
};

export default ViewCourse;
