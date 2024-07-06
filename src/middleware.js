import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;


  // Redirect authenticated users away from the forgot-password page
  if (token && url.pathname.startsWith('/forgot-password')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Handle other redirects or permissions based on token and URLs
  if (
    token &&
    (url.pathname.startsWith('/login') ||
      url.pathname.startsWith('/register'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }


  return NextResponse.next();
}
