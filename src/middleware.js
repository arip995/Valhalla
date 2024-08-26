import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

export function middleware(req) {
  let username = getCookie('username', { req });
  username = username !== 'undefined';
  let isCreator = getCookie('isCreator', { req });
  isCreator = isCreator !== 'undefined';
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
    { path: '/app', redirect: '/signin' },
  ];

  const nonCreatorAllowedPaths = [
    { path: '/purchase', next: true },
    { path: '/account', next: true },
    { path: '/lc', next: true },
    { path: '/tg', next: true },
  ];

  if (accessToken) {
    if (!username) {
      if (
        !nonCreatorAllowedPaths.some(({ path }) =>
          req.nextUrl.pathname.startsWith(path)
        )
      ) {
        if (isCreator) return;
        return NextResponse.redirect(
          new URL('/purchase', req.url)
        );
      }
    }

    if (
      req.nextUrl.pathname.startsWith('/signin') ||
      req.nextUrl.pathname.startsWith('/signup')
    ) {
      if (isCreator) {
        if (!username) {
          return;
        } else {
          return NextResponse.redirect(
            new URL('/home', req.url)
          );
        }
      } else {
        return NextResponse.redirect(
          new URL('/purchase', req.url)
        );
      }
    }

    for (const { path, redirect } of redirectPaths) {
      if (req.nextUrl.pathname === path) {
        if (username) {
          return NextResponse.redirect(
            new URL(redirect, req.url)
          );
        }
      }
    }
  }
  for (const { path, redirect } of authRequiredPaths) {
    if (req.nextUrl.pathname.startsWith(path)) {
      if (!accessToken) {
        return NextResponse.redirect(
          new URL(redirect, req.url)
        );
      } else {
        if (isCreator && !username) {
          return NextResponse.redirect(
            new URL(redirect, req.url)
          );
        }
      }
    }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|manifest.webmanifest).*)',
  ],
};
