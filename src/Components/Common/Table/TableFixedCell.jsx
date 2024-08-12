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
      className={classNames(
        'sticky right-0 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </th>
  ) : (
    <td
      className={classNames(
        'sticky right-0 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
};

export default TableFixedCell;
