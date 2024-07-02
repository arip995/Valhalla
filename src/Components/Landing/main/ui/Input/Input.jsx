const Input = ({ ...props }) => (
  <input
    {...props}
    className={`${
      props.className || ''
    } w-full rounded-lg border border-gray-800 px-3 py-2 text-gray-500 shadow-sm outline-none duration-150`}
  />
);

export default Input;
