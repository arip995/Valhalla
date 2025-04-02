import {
  StatusColorMapping,
  StatusMapping,
} from '@/Constants/ProductListingContants';
import { Badge, Card } from '@mantine/core';
import EmptyProductImage2 from '../../../../public/images/common/emptystateproductimage2.jpeg';
import ShareButton from '../Buttons/ShareButton';
import ProductMenu from '../Menu/ProductMenu';

const ProductCard = ({
  item,
  app,
  onUpdate = () => {},
  onItemClick = () => {},
}) => {
  if (!item) return null;

  return (
    <>
      <Card
        padding="sm"
        radius="md"
        withBorder
        className="cursor-pointer hover:bg-gray-50"
        onClick={() => onItemClick(item)}
      >
        <Card.Section className="relative overflow-hidden">
          <img
            src={
              item.coverImage?.url || EmptyProductImage2.src
            }
            alt=""
            className="aspect-video h-full w-full cursor-pointer object-cover transition-all duration-300 hover:scale-110"
          />
          <div className="absolute right-2 top-2 flex gap-2">
            <ShareButton
              link={`${process.env.NEXT_PUBLIC_HOST}/${app}/${item._id}`}
              onlyShareButton
            />
            <ProductMenu
              app={app}
              onUpdate={onUpdate}
              item={item}
            />
            {/* <span className="flex cursor-pointer items-center rounded-full border border-gray-300 bg-white p-1.5">
              <IconDotsVertical color="black" size={12} />
            </span> */}
          </div>
        </Card.Section>

        <Card.Section className="border-b border-gray-200 p-2">
          <div className="word-break break-all font-semibold text-gray-900">
            {item.title}
          </div>
        </Card.Section>

        <div className="mt-2 flex w-full flex-col gap-3">
          <div className="flex justify-between text-sm font-semibold text-gray-600">
            <span>Price</span>
            <span className="font-normal text-gray-500">
              ₹{item.price?.toFixed(2) || 0}
            </span>
          </div>
          {/* <div className="flex justify-between text-sm font-semibold text-gray-600">
            <span>Revenue</span>
            <span className="font-normal text-gray-500">
              ₹{item.totalRevenue?.toFixed(2) || 0}
            </span>
          </div> */}
          <div className="flex justify-between text-sm font-semibold text-gray-600">
            <span>Sales</span>
            <span className="font-normal text-gray-500">
              {item.totalSalesCount}
            </span>
          </div>
          <div className="flex justify-between text-sm font-semibold text-gray-600">
            <span>Status</span>
            <Badge
              variant="dot"
              color={StatusColorMapping[item.status]}
              size="md"
            >
              {StatusMapping[item.status]}
            </Badge>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
