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
        'relative mx-auto w-full',
        className
      )}
      {...props}
    >
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
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
