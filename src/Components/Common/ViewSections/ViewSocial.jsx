import { socialIconsMapping } from '@/Components/Create/Course/CreateCourseStepOne/SectionDetails/Sections';
import React from 'react';

const ViewSocial = ({ value }) => {
  if (!value?.length) return null;
  return (
    <div className="flex w-full flex-col gap-4">
      <h3>Follow me on</h3>
      <div className="flex flex-wrap gap-2">
        {value.map((item, index) => {
          return (
            <a
              target="_blank"
              rel="noreferrer"
              key={index}
              href={`https://${item.type}.com/${item.type === 'youtube' ? '@' : ''}${item.value}`}
            >
              <img
                src={socialIconsMapping[item.type]}
                alt={item.type}
                className="h-10 w-10 rounded-full"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ViewSocial;
