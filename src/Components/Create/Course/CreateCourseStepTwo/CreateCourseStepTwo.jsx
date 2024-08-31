import React from 'react';
import CreateModulesAndLessons from './CreateModulesAndLessons';

const CreateCourseStepTwo = ({
  productData,
  setProductData,
  errors,
}) => {
  return (
    <div className="flex-flex-col w-full">
      <CreateModulesAndLessons
        productData={productData}
        setProductData={setProductData}
        errors={errors}
      />
    </div>
  );
};

export default CreateCourseStepTwo;
