import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getUser(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        cookie: cookieHeader || '',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Public routes - no protection needed
  const publicRoutes = ['/', '/login', '/register', '/jobs'];
  if (publicRoutes.some(route => path === route || path.startsWith('/jobs/'))) {
    return NextResponse.next();
  }

  const user = await getUser(request);

  // If not authenticated, redirect to login
  if (!user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based route protection
  const { role } = user;

  // Applicant routes
  if (path.startsWith('/my-applications')) {
    if (role !== 'applicant') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Company routes
  if (path.startsWith('/my-jobs') || path.startsWith('/jobs/new') || path.match(/^\/jobs\/[^/]+\/(edit|applications)/)) {
    if (role !== 'company') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Check if company is approved
    if (!user.isApproved) {
      return NextResponse.redirect(new URL('/login?error=not_approved', request.url));
    }
  }

  // Admin routes
  if (path.startsWith('/admin')) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/my-applications/:path*',
    '/my-jobs/:path*',
    '/jobs/new/:path*',
    '/jobs/:id/edit/:path*',
    '/jobs/:id/applications/:path*',
    '/admin/:path*',
  ],
};
