import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

export function middleware(req) {
  const accessToken =
    getCookie('accessToken', { req }) || '';
  if (!accessToken) {
    return NextResponse.redirect(
      new URL('/signin', req.url)
    );
  }
}

export const config = {
  matcher: ['/creator'],
};
