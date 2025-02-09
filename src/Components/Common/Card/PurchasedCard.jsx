import { Card } from '@mantine/core';
import React from 'react';
import EmptyProductImage2 from '../../../../public/images/common/emptystateproductimage2.jpeg';
import ShareButton from '../Buttons/ShareButton';
import { ProductTypeBadgeMapping } from '@/Constants/constants';

const PurchasedCard = ({
  item,
  onItemClick = () => {},
}) => {
  return (
    <Card
      padding="sm"
      radius="md"
      withBorder
      className="cursor-pointer hover:bg-gray-50"
      onClick={() => onItemClick()}
    >
      <Card.Section className="relative overflow-hidden">
        <img
          src={
            item.productDetails.coverImage?.url ||
            EmptyProductImage2.src
          }
          alt=""
          className="aspect-video h-full w-full cursor-pointer object-cover transition-all duration-300 hover:scale-110"
        />
        <div className="absolute right-2 top-2 flex gap-2">
          <ShareButton
            link={`${process.env.NEXT_PUBLIC_HOST}/${item.productType}/${item.productId}`}
            onlyShareButton
          />
        </div>
      </Card.Section>

      <Card.Section className="p-2">
        {ProductTypeBadgeMapping[item.productType]}
        <div className="word-break break-all text-lg font-semibold text-gray-900">
          {item.productDetails.title}
        </div>
        <div className="word-break break-all text-xs font-normal text-gray-600">
          {item.creatorDetails.firstName}{' '}
          {item.creatorDetails.lastName}
        </div>
      </Card.Section>
    </Card>
  );
};

export default PurchasedCard;
