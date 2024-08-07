import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

export function middleware(req) {
  const accessToken =
    getCookie('accesstoken', { req }) || '';
  const headers = new Headers(req.headers);
  headers.set('x-current-path', req.nextUrl.pathname);

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

  if (req.nextUrl.pathname.startsWith('/creator/')) {
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

  if (req.nextUrl.pathname.startsWith('/lc')) {
    return NextResponse.next({ headers });
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
    // '/tg/:path*',
    // '/lc/',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
