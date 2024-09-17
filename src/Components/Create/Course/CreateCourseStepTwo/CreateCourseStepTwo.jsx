/* eslint-disable no-unused-vars */
import React from 'react';
import CreateModulesAndLessons from './CreateModulesAndLessons';

const CreateCourseStepTwo = ({ courseForm }) => {
  return (
    <div className="flex-flex-col w-full p-4">
      <CreateModulesAndLessons
        content={courseForm.values.content}
        error={courseForm.errors?.content}
        onUpdateContent={data => {
          courseForm.setFieldValue('content', data);
        }}
      />
    </div>
  );
};

export default React.memo(CreateCourseStepTwo);
