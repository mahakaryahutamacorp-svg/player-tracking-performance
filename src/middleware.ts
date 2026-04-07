import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // 🍪 Read custom session cookie
  const sessionCookie = request.cookies.get('pt_session')?.value;
  let session = null;

  try {
    if (sessionCookie) {
      session = JSON.parse(sessionCookie);
    }
  } catch (e) {
    console.error("Failed to parse session cookie", e);
  }

  // 1. If NOT logged in and trying to access protected routes
  if (!session && (url.pathname.startsWith('/player') || url.pathname.startsWith('/admin'))) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 2. If logged in, enforce role-based access
  if (session) {
    const role = session.role || 'player';

    // Prevent players from accessing admin routes
    if (url.pathname.startsWith('/admin') && role !== 'admin') {
      url.pathname = '/player';
      return NextResponse.redirect(url);
    }

    // If logged in and on login page, redirect to appropriate dashboard
    if (url.pathname === '/login') {
      url.pathname = role === 'admin' ? '/admin' : '/player';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/player/:path*', '/admin/:path*', '/login'],
};
