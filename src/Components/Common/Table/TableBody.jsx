import classNames from 'classnames';
import React from 'react';

const TableBody = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <tbody
      className={classNames(
        `divide-y divide-gray-200 bg-white [&>tr]:relative`,
        className
      )}
      {...props}
    >
      {children}
    </tbody>
  );
};

export default TableBody;
