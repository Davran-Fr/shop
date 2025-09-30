import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const cart = request.cookies.get("cart")?.value;
  const pathname = request.nextUrl.pathname;

  const protectedRoutes =
    pathname === "/" ||
    pathname.startsWith("/products") ||
    pathname.startsWith("/cards") ||
    pathname.startsWith("/order");

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
  if (pathname.startsWith("/order")) {
    if (!cart) {
      return NextResponse.redirect(new URL("/products", request.url));
    }

    try {
      const parsedCart = JSON.parse(cart);
      if (!parsedCart.items || parsedCart.items.length === 0) {
        return NextResponse.redirect(new URL("/products", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/products/:path*",
    "/auth/:path*",
    "/order/:path*",
    "/cards/:path*",
    "/my-orders/:path*",
  ],
};
