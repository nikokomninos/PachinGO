import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  if(sessionCookie) console.log("cookie is here");
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/editor"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

//export const config = {
//  matcher: ["/editor", "/auth/login", "/auth/register"],
//};
