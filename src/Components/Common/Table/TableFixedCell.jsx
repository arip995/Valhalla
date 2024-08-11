import classNames from 'classnames';
import React from 'react';

export const TableFixedCell = ({
  children,
  type = 'tablehead',
  className = '',
  ...props
}) => {
  return type === 'tablehead' ? (
    <th
      className={classNames('fixed-cell', className)}
      {...props}
    >
      {children}
    </th>
  ) : (
    <td
      className={classNames('fixed-cell', className)}
      {...props}
    >
      {children}
    </td>
  );
};

export default TableFixedCell;
