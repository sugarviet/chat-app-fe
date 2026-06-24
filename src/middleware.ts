import { NextResponse, NextRequest } from 'next/server'

const protectedRoutes = ['/chat']
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Middleware chạy trên Edge Runtime — chỉ đọc được cookie, không đọc được in-memory token
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isAuthenticated = !!refreshToken;

  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }
}

// export const config = {
//   matcher: ['/chat/:path*', '/login', '/register'],
// }

export const config = {
  matcher: ['/login', '/register'],
}