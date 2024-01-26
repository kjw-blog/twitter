export { auth as middleware } from './auth';

// middleware를 적용할 route들
export const config = {
  matcher: ['./compose/tweet', '/home', '/explore', '/messages', '/search'],
};
