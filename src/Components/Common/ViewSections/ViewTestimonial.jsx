import { Rating, Spoiler } from '@mantine/core';

const ViewTestimonial = ({ value }) => {
  if (!value?.length) return null;

  return (
    <div className="flex w-full flex-wrap gap-4">
      {value.map((item, index) => (
        <div
          className="w-full rounded-md border border-gray-300 p-4"
          key={index}
        >
          <div className="flex items-center gap-2 font-semibold">
            <img
              className="h-20 w-20 rounded-full"
              src={item.image}
              alt={
                'https://nexify-try.s3.ap-south-1.amazonaws.com/219cb777-86b3-4e63-8051-bfb85242cc12.svg'
              }
            />
            <div className="flex flex-col gap-2">
              {item.name}
              <Rating value={item.rating} />
            </div>
          </div>
          <div className="my-4 font-normal text-gray-500">
            <Spoiler
              maxHeight={200}
              showLabel="Show more"
              hideLabel="Hide"
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
