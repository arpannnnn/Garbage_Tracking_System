import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';



export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  const role = token?.role;


  if (
    token && 
    (url.pathname.startsWith('/login') ||
      url.pathname.startsWith('/register')

    )

  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  

  return NextResponse.next();
}