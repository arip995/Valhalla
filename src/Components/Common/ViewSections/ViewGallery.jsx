import { Carousel } from '@mantine/carousel';

const ViewGallery = ({ value }) => {
  if (!value?.length) return null;

  return (
    <div className="overflow-hidden rounded-xl">
      <Carousel
        withIndicators
        loop
        className="aspect-video shadow-sm"
      >
        {value.map((item, index) => {
          return (
            <Carousel.Slide key={index}>
              <img
                src={item.url}
                alt=""
                className="object-cover"
              />
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ViewGallery;
