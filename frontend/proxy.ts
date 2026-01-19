import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");
  const { pathname } = request.nextUrl;

  //if (sessionToken && (pathname === "/login" || pathname === "/register")) {
  //  return NextResponse.redirect(new URL("/", request.url));
  //}

  const protectedRoutes = ["/editor"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!sessionToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/editor", "/auth/login", "/auth/register"],
};
