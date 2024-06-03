import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

export function middleware(req) {
  const accessToken =
    getCookie('accesstoken', { req }) || '';
  if (!accessToken) {
    return NextResponse.redirect(
      new URL('/signin', req.url)
    );
  }
}

export const config = {
  matcher: [
    '/creator',
    // '/creator/account',
    // '/creator/transaction',
    // '/creator/billing',
    // '/creator/account',
    // '/app/lockedcontent',
    // '/app/telegram',
    // '/create/telegram',
    // '/create/lockedcontent',
  ],
};
