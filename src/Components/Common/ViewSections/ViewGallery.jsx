import { Carousel } from '@mantine/carousel';
import React from 'react';

const ViewGallery = ({ values }) => {
  if (!values?.length) return null;

  return (
    <Carousel withIndicators height={200}>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
};

export default ViewGallery;
