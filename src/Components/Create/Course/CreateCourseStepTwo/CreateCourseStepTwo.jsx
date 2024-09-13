import React from 'react';
import CreateModulesAndLessons from './CreateModulesAndLessons';

const CreateCourseStepTwo = ({ courseForm }) => {
  return (
    <div className="flex-flex-col w-full p-4">
      <CreateModulesAndLessons courseForm={courseForm} />
    </div>
  );
};

export default React.memo(CreateCourseStepTwo);
