import type { NextRequest } from 'next/server';
import { auth0 } from './lib/auth0';

const publicPaths = ['/', '/api/user'];

export const middleware = async (request: NextRequest) => {

    const { pathname } = request.nextUrl;
    if (publicPaths.some((path) => pathname === path) || pathname.startsWith('/auth/'))
        return auth0.middleware(request);

    const session = await auth0.getSession(request);

    if (!session?.user)
        return new Response('Unauthorized', { status: 401 });

    await fetch(`${process.env.BASE_URL}/api/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            auth0Id: session?.user?.sub,
            firstName: session?.user?.given_name,
            lastName: session?.user?.family_name,
        }),
    });

    return await auth0.middleware(request);
};

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};