import { NextResponse, type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function middleware(request: NextRequest) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = request.nextUrl.clone();

  // If not logged in and trying to access player or admin routes
  if (!session && (url.pathname.startsWith('/player') || url.pathname.startsWith('/admin'))) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If logged in, check role for restricted routes
  if (session) {
    // Demo: We use user metadata or a custom claim for roles
    // In a real app, you'd fetch the user's role from the 'users' table
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('auth_id', session.user.id)
      .single();

    const role = profile?.role || 'player';

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
