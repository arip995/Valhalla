import classNames from 'classnames';
import { useRef } from 'react';

const createHeaders = headers => {
  return headers.map(() => useRef());
};

const TableHeader = ({
  headerItems,
  fixedElement,
  //   maxCellWidth = 700,
  renderItem = () => {},
  className = '',
  ...props
}) => {
  const columns = createHeaders(headerItems);

  if (!headerItems?.length === 0) {
    return null;
  }

  return (
    <thead
      className={classNames(
        `right-0 top-0 table-header-group bg-gray-50 [&>fixed-cell]:sticky [&>fixed-cell]:shadow-sm`,
        className
      )}
      {...props}
    >
      <tr>
        {headerItems.map((headerItem, i) => (
          <th
            key={i}
            ref={columns[i]}
            className="relative h-full max-h-14 overflow-hidden break-words px-4"
          >
            {renderItem(headerItem)}
          </th>
        ))}
        {fixedElement}
      </tr>
    </thead>
  );
};

export default TableHeader;
