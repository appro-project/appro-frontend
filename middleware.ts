import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Sets x-current-lang so server components (e.g. layout) can know the current language
 * without parsing the path again. UA = default (no segment), RU = /ru/*
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const lang = pathname.startsWith('/ru') ? 'ru' : 'ua'
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-current-lang', lang)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\.).*)'],
}
