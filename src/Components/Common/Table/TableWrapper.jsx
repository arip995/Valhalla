import classNames from 'classnames';
import React from 'react';

export const TableWrapper = ({
  children,
  className,
  ...props
}) => {
  return (
    <section
      className={classNames(
        'container relative mx-auto px-4',
        className
      )}
      {...props}
    >
      <div className="flex flex-col">
        <div className="mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg border border-gray-200">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableWrapper;
