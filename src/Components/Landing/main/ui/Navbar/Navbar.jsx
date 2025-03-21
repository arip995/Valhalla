'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import NavHeader from '../NavHeader';
import NavLink from '../NavLink';
import useUser from '@/Utils/Hooks/useUser';

const Navbar = () => {
  const { user } = useUser();
  const menuBtnEl = useRef();
  const redirect = user?._id ? 'home' : 'signup';
  const redirectTitle = user?._id ? 'Dashboard' : 'Signup';
  const [state, setState] = useState(false);

  const navigation = [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'FAQs', href: '/#faqs' },
  ];

  // useEffect(() => {
  //   document.onclick = e => {
  //     const target = e.target;
  //     if (!menuBtnEl.current.contains(target))
  //       setState(false);
  //   };
  // }, []);

  return (
    <header className="relative">
      <div className="custom-screen sticky top-0 flex h-16 w-full items-center md:hidden">
        <NavHeader
          menuBtnEl={menuBtnEl}
          state={state}
          onClick={() => setState(!state)}
          redirect={redirect}
          redirectTitle={redirectTitle}
        />
      </div>
      <nav
        className={`md:static md:block md:text-sm ${
          state
            ? 'absolute inset-x-0 top-0 z-20 rounded-b-2xl bg-gray-900 shadow-xl md:bg-gray-900'
            : 'hidden'
        }`}
      >
        <div className="custom-screen mt-2 items-center md:mt-0 md:flex">
          <NavHeader
            state={state}
            onClick={() => setState(!state)}
            redirect={redirect}
            redirectTitle={redirectTitle}
          />
          <div
            className={`mt-4 flex-1 items-center text-gray-300 md:mt-0 md:flex md:font-medium ${
              state ? 'block' : 'hidden'
            } `}
          >
            <div className="flex-1 items-center justify-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="hover:text-gray-50"
                  >
                    <Link
                      onClick={() => setState(false)}
                      href={item.href}
                      className="block"
                    >
                      {item.name}
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 items-center justify-end gap-x-6 space-y-6 md:mt-0 md:flex md:space-y-0">
              <NavLink
                href={`/${redirect}`}
                className="custom-btn-bg flex items-center justify-center gap-x-1 border border-gray-500 text-sm font-semibold text-white active:bg-gray-900 md:inline-flex"
              >
                {`${redirectTitle}`}
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
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
