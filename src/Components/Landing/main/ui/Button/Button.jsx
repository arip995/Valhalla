const Button = ({ children, ...props }) => (
  <button
    role="button"
    {...props}
    className={`${props.className || ''} px-4 py-2.5 text-center text-sm font-medium duration-150`}
  >
    {children}
  </button>
);
export default Button;
