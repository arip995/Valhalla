import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

export function middleware(req) {
  const isCreator = true;
  const accessToken = getCookie('accesstoken', { req });

  const redirectPaths = [
    { path: '/', redirect: '/home' },
    { path: '/app', redirect: '/app/lc' },
  ];

  const authRequiredPaths = [
    { path: '/home', redirect: '/signin' },
    { path: '/transaction', redirect: '/signin' },
    { path: '/billing', redirect: '/signin' },
    { path: '/audience', redirect: '/signin' },
    { path: '/dashboard', redirect: '/signin' },
    { path: '/purchase', redirect: '/signin' },
    { path: '/account', redirect: '/signin' },
  ];

  const nonCreatorAllowedPaths = [
    { path: '/purchase', next: true },
    { path: '/account', next: true },
  ];

  if (accessToken) {
    for (const { path, redirect } of redirectPaths) {
      if (req.nextUrl.pathname === path) {
        return NextResponse.redirect(
          new URL(redirect, req.url)
        );
      }
    }

    if (
      req.nextUrl.pathname.startsWith('/signin') ||
      req.nextUrl.pathname.startsWith('/signup')
    ) {
      return NextResponse.redirect(
        new URL('/home', req.url)
      );
    }

    if (!isCreator) {
      if (
        !nonCreatorAllowedPaths.some(({ path }) =>
          req.nextUrl.pathname.startsWith(path)
        )
      ) {
        return NextResponse.redirect(
          new URL('/purchase', req.url)
        );
      }
    }
  } else {
    for (const { path, redirect } of authRequiredPaths) {
      if (req.nextUrl.pathname.startsWith(path)) {
        return NextResponse.redirect(
          new URL(redirect, req.url)
        );
      }
    }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
