import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

export function middleware(req) {
  const accessToken =
    getCookie('accesstoken', { req }) || '';
  if (
    req.nextUrl.pathname.startsWith('/signin') ||
    req.nextUrl.pathname.startsWith('/signip')
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
  console.log('object', req.nextUrl.pathname, accessToken);

  if (
    !accessToken &&
    !req.nextUrl.pathname.startsWith('/signin') &&
    !req.nextUrl.pathname.startsWith('/signip')
  ) {
    return NextResponse.redirect(new URL('/signin'));
  }
}

export const config = {
  matcher: [
    '/creator',
    '/creator/home',
    '/creator/account',
    '/creator/transaction',
    '/creator/billing',
    '/creator/account',
    '/app/lockedcontent',
    '/app/telegram',
    '/create/telegram',
    '/create/lockedcontent',
    '/signin',
    '/signup',
  ],
};
