import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

export function middleware(req) {
  const accessToken =
    getCookie('accesstoken', { req }) || '';

  if (req.nextUrl.pathname === '/creator' && accessToken) {
    return NextResponse.redirect(
      new URL('/creator/home', req.url)
    );
  }
  if (req.nextUrl.pathname === '/app' && accessToken) {
    return NextResponse.redirect(
      new URL('/app/lockedcontent', req.url)
    );
  }

  if (
    req.nextUrl.pathname.startsWith('/signin') ||
    req.nextUrl.pathname.startsWith('/signup')
  ) {
    if (accessToken) {
      return NextResponse.redirect(
        //Second param resolves the url object relative to second param
        //With second patam pathname: /creator/home
        //Without second patam pathname: /signin/creator/home
        new URL('/creator/home', req.url)
      );
    }
  }

  if (
    !accessToken &&
    !req.nextUrl.pathname.startsWith('/signin') &&
    !req.nextUrl.pathname.startsWith('/signup')
  ) {
    return NextResponse.redirect(
      new URL('/signin', req.url)
    );
  }
}

export const config = {
  matcher: [
    // '/creator',
    // '/app',
    // '/creator/home',
    // '/creator/account',
    // '/creator/transaction',
    // '/creator/billing',
    // '/creator/account',
    // '/app/lockedcontent',
    // '/app/telegram',
    // '/create/telegram',
    // '/create/lockedcontent',
    // '/signin',
    // '/signup',
  ],
};
