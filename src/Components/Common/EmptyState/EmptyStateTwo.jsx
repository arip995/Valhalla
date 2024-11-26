import { IconShoppingCartOff } from '@tabler/icons-react';

const EmptyStateTwo = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      {children ? (
        children
      ) : (
        <div className="w-fit max-w-md rounded-lg p-6 text-center">
          <div className="mb-4 flex w-full justify-center text-center">
            <IconShoppingCartOff
              size={40}
              className="text-gray-700"
            />
          </div>
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            {title || 'No Purchases Yet'}
          </h2>
          <p className="mb-6 text-gray-500">
            {description ||
              'You havenot purchased any products yet. Explore our store and start shopping now!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmptyStateTwo;
