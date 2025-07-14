import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = pathname === "/" || pathname.startsWith("/products");
  const authRoutes =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/signup");

  if (protectedRoutes && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (authRoutes && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/products/:path*", "/auth/:path*"],
};
