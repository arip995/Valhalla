import Link from 'next/link';

const NavLink = ({ children, href, ...props }) => (
  <Link
    href={href}
    {...props}
    className={`rounded-full px-4 py-2.5 text-center duration-150 ${props?.className || ''}`}
  >
    {children}
  </Link>
);

export default NavLink;
