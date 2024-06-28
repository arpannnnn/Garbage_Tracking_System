// import { NextResponse } from 'next/server'
// import { getToken } from 'next-auth/jwt';
// export { default } from 'next-auth/middleware';


// export async function middleware(request) {
//   const token = await getToken({ req: request });
//   const url = request.nextUrl;


//   if (
//     token &&
//     (url.pathname.startsWith('/login') ||
//       url.pathname.startsWith('/register')

//     )
//   ) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   if (!token && url.pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function middleware(request) {
    const cookieHeader = request.headers.get('cookie');
    const cookies = parse(cookieHeader || '');
    const token = cookies['User-Token']; // Get the token from cookies
    const url = request.nextUrl;

    if (
        token &&
        (url.pathname.startsWith('/login') || url.pathname.startsWith('/register'))
    ) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export { default } from 'next-auth/middleware';

