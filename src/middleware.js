import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');

  // Protect admin routes
  const adminPaths = ['/dashboard', '/products', '/orders', '/seats'];
  const isPathAdmin = adminPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isPathAdmin && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Prevent logged-in users from accessing /login
  if (request.nextUrl.pathname.startsWith('/login') && token) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/products/:path*', '/orders/:path*', '/seats/:path*', '/login'],
};
