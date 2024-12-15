import React from 'react';
import { IconCheck } from '@tabler/icons-react';

const ViewBenefit = ({ value }) => {
  if (!value?.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {value.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
            <IconCheck
              className="h-4 w-4 text-green-600"
              strokeWidth={3}
            />
          </div>

          <div className="text-gray-700">
            <p className="leading-relaxed">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewBenefit;
