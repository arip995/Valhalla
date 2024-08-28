/* eslint-disable no-unused-vars */
import Link from 'next/link';
import Brand from '../Brand';
import NavLink from '../NavLink';

const NavHeader = ({ onClick, state, menuBtnEl }) => (
  <div className="flex w-full items-center justify-between py-1 md:block md:w-fit md:py-3">
    <Link href="/">
      <Brand />
    </Link>
    <NavLink
      href="/signup"
      className="custom-btn-bg flex items-center justify-center gap-x-1 border border-gray-500 text-sm font-semibold text-white active:bg-gray-900 md:inline-flex"
    >
      {`Sign up`}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
          clipRule="evenodd"
        />
      </svg>
    </NavLink>
    {/* <div className="md:hidden">
      <button
        role="button"
        aria-label="Open the menu"
        ref={menuBtnEl || null}
        className="text-gray-400 hover:text-gray-50"
        onClick={onClick}
      >
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>
    </div> */}
  </div>
);

export default NavHeader;
