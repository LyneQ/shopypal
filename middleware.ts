import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(request: NextRequest) {
    const availablePathNames = [
        '/',
        '/auth',
        '/item',
        '/settings',
        '/user',
        '/help'
    ];
    const protectedRoutes = [
        '/settings',
        '/user',
    ];

    if (protectedRoutes.includes(new URL(request.url).pathname)) {
        const token = request.cookies.get('authToken');
        if (!token) return NextResponse.redirect(new URL('/auth', request.url));

        try {
            console.log("TOKEN", token);
            // TODO: use JOSE library to manage JWT

            return NextResponse.next();
        } catch (error) {
            console.log("ERROR", error);
            return NextResponse.redirect(new URL('/auth', request.url));
        }
    }


    // if ( availablePathNames.includes(request.url) ) return NextResponse.rewrite(new URL(`/404`, request.url));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}