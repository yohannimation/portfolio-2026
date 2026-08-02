import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

console.log('[middleware] Middleware is running');

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_static (Static files)
  // - all rootless assets with extensions (e.g. favicon.ico, sitemap.xml, robots.txt)
  matcher: ['/((?!api|_next|_static|.*\\..*).*)']
};
