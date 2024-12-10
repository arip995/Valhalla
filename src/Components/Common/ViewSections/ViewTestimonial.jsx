import { Rating, Spoiler } from '@mantine/core';
import React from 'react';

const ViewTestimonial = ({ value }) => {
  if (!value?.length) return null;

  return (
    <div className="flex w-full flex-wrap gap-4">
      {value.map((item, index) => (
        <div
          className="w-full rounded-lg bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
          key={index}
        >
          <div className="flex items-center gap-4">
            <img
              className="h-16 w-16 rounded-full border-2 border-gray-300 shadow-md"
              src={item.image}
              alt={item.name || 'User'}
            />
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold text-gray-800">
                {item.name}
              </p>
              <Rating
                value={item.rating}
                className="text-sm"
              />
            </div>
          </div>
          <div className="my-4 text-gray-600">
            <Spoiler
              maxHeight={150}
              showLabel="Show more"
              hideLabel="Hide"
              sx={theme => ({
                color: theme.colors.gray[600],
                fontSize: theme.fontSizes.md,
              })}
            >
              {item.description}
            </Spoiler>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewTestimonial;
