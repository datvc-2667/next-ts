import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import routes from './constants/routes';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === routes.ROOT) {
    url.pathname = routes.HOME;
    return NextResponse.redirect(url);
  }
}
