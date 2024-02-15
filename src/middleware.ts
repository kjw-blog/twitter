import { NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware() {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect('http://localhost:80/i/flow/login');
  }
}

// middleware를 적용할 route들
export const config = {
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'],
};
