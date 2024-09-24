import { Card, Text } from '@mantine/core';
import EmptyProductImage2 from '../../../../public/images/common/emptystateproductimage2.jpeg';
import ShareButton from '../Buttons/ShareButton';
import ProductMenu from '../Menu/ProductMenu';

const ProductCard = ({
  item,
  app,
  onUpdate = () => {},
}) => {
  if (!item) return null;

  return (
    <>
      <Card padding="sm" radius="md" withBorder>
        <Card.Section className="relative overflow-hidden">
          <img
            src={item.coverImage || EmptyProductImage2.src}
            alt=""
            className="aspect-video h-full w-full cursor-pointer object-cover transition-all duration-300 hover:scale-110"
          />
          <div className="absolute right-2 top-2 flex gap-2">
            <ShareButton
              link={`${process.env.NEXT_PUBLIC_HOST}${app}/${item._id}`}
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

        <Text fw={500} className="word-break break-all">
          {item.title}
        </Text>

        <div className="flex justify-between text-sm font-semibold text-gray-700">
          <span>Price</span>
          <span className="font-normal text-gray-500">
            ₹{item.price}
          </span>
        </div>
        <div className="flex justify-between text-sm font-semibold text-gray-700">
          <span>Revenue</span>
          <span className="font-normal text-gray-500">
            ₹{item.totalRevenue}
          </span>
        </div>
        <div className="flex justify-between text-sm font-semibold text-gray-700">
          <span>Sales</span>
          <span className="font-normal text-gray-500">
            {item.totalSalesCount}
          </span>
        </div>
      </Card>
    </>
  );
};

export default ProductCard;
