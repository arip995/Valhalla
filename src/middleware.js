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
      new URL('/app/lc', req.url)
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
    req.nextUrl.pathname.startsWith('/creator') ||
    req.nextUrl.pathname.startsWith('/dashboard')
  ) {
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

  if (
    req.nextUrl.pathname.startsWith('/lc') ||
    req.nextUrl.pathname.startsWith('/tg')
  ) {
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
    // '/app/lc',
    // '/app/tg',
    // '/create/telegram',
    // '/create/lc',
    // '/signin',
    // '/signup',
    // '/tg/:path*',
    // '/lc/',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
