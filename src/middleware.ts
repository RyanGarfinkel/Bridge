import type { NextRequest } from 'next/server';
import { auth0 } from './lib/auth0';

export const middleware = async (request: NextRequest) => {

    const { pathname } = request.nextUrl;
    const response = auth0.middleware(request);

    if (!pathname.startsWith('/api/'))
        return response;

    const session = await auth0.getSession(request);
    if(!session?.user)
        return new Response('Unauthorized', { status: 401 });

    return response;
};

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
