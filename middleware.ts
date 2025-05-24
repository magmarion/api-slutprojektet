// middleware.ts
import { auth } from './lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    // Skydda admin-routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!session || !(session.user as { isAdmin?: boolean })?.isAdmin) {
            return NextResponse.redirect(new URL('/signin/admin', request.url));
        }
    }

    // Skydda vanliga skyddade routes
    if (['/profile', '/my-orders'].includes(request.nextUrl.pathname)) {
        if (!session) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/profile',
        '/my-orders',
    ],
};