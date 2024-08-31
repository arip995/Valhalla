'use client';
import { useState } from 'react';
import CreateCourseStepTwo from './CreateCourseStepTwo/CreateCourseStepTwo';

const CreateCourse = () => {
  const [productData, setProductData] = useState({});
  const [errors, setErrors] = useState({});

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mx-2 w-full max-w-xl">
        <CreateCourseStepTwo
          productData={productData}
          setProductData={setProductData}
          setErrors={setErrors}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default CreateCourse;
