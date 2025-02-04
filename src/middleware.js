import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

const redirectTo = (url, req) => {
  return NextResponse.redirect(new URL(url, req.url));
};

export function middleware(req) {
  let username = getCookie('username', { req });
  let isCreator =
    getCookie('isCreator', { req }) === 'true';
  const accessToken = getCookie('accesstoken', { req });

  const authRequiredPaths = [
    '/home',
    '/payment',
    '/purchase',
    '/audience',
    '/app',
    '/account',
    '/dashboard',
    '/onboarding',
  ];

  const creatorPathValidationRoutes = [
    '/signin',
    '/signup',
    '/home',
    '/payment',
    '/dashboard',
    '/purchase',
    '/audience',
    '/app',
    '/account',
  ];

  const customerPathValidationRoutes = [
    '/signin',
    '/signup',
    '/home',
    '/payment',
    '/dashboard',
    '/audience',
    '/app',
    '/onboarding',
  ];

  const currentPath = req.nextUrl.pathname;
  console.log('first', accessToken, username, isCreator);
  if (currentPath === '/') {
    return;
  }

  if (accessToken) {
    if (isCreator) {
      if (username) {
        if (
          currentPath.startsWith('/onboarding') ||
          currentPath.startsWith('/signin') ||
          currentPath.startsWith('/signup')
        ) {
          return redirectTo('/home', req);
        }
        return;
      } else {
        // there might be case where user didnot complete onboarding and went to purchase and,in that case handle it in the future coz the creator wont have name
        if (
          creatorPathValidationRoutes.some(item =>
            currentPath.startsWith(item)
          )
        ) {
          return redirectTo('/onboarding', req);
        }
      }
    } else {
      if (
        customerPathValidationRoutes.some(item =>
          currentPath.startsWith(item)
        )
      ) {
        return redirectTo('/purchase', req);
      }
    }
  } else {
    if (
      authRequiredPaths.some(item =>
        currentPath.startsWith(item)
      )
    ) {
      return redirectTo('/signin', req);
    }
  }
}

// if (accessToken) {
//   if (
//     req.nextUrl.pathname.startsWith('/home') &&
//     !isCreator
//   ) {
//     return NextResponse.redirect(
//       new URL('/purchase', req.url)
//     );
//   }

//   if (
//     req.nextUrl.pathname.startsWith('/signin') ||
//     req.nextUrl.pathname.startsWith('/signup')
//   ) {
//     if (isCreator) {
//       if (!username) {
//         return;
//       } else {
//         return NextResponse.redirect(
//           new URL('/home', req.url)
//         );
//       }
//     } else {
//       return NextResponse.redirect(
//         new URL('/purchase', req.url)
//       );
//     }
//   }

//   if (req.nextUrl.pathname.startsWith('/')) {
//     return;
//   }

//   if (!username) {
//     if (
//       !nonCreatorAllowedPaths.some(({ path }) =>
//         req.nextUrl.pathname.startsWith(path)
//       )
//     ) {
//       if (isCreator) new URL('/signup', req.url);
//       return NextResponse.redirect(
//         new URL('/purchase', req.url)
//       );
//     }
//   }

//   for (const { path, redirect } of redirectPaths) {
//     if (req.nextUrl.pathname === path) {
//       if (username) {
//         return NextResponse.redirect(
//           new URL(redirect, req.url)
//         );
//       }
//     }
//   }
// }

// for (const { path, redirect } of authRequiredPaths) {
//   if (req.nextUrl.pathname.startsWith(path)) {
//     if (!accessToken) {
//       return NextResponse.redirect(
//         new URL(redirect, req.url)
//       );
//     } else {
//       if (isCreator && !username) {
//         return NextResponse.redirect(
//           new URL(redirect, req.url)
//         );
//       }
//     }
//   }
// }

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|manifest.webmanifest).*)',
  ],
};
