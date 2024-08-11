import classNames from 'classnames';
import React from 'react';

const Table = ({ children, className = '', ...props }) => {
  return (
    <table
      className={classNames(
        'min-w-full divide-y divide-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </table>
  );
};

export default Table;
