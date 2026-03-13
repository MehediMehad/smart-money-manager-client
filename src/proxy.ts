import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/Auth";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register", "/verify-otp", '/forgot-password'];

const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/],
  admin: [/^\/admin/],
};

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  const normalizedRole = userInfo?.role.toLowerCase() as Role;

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (normalizedRole && roleBasedPrivateRoutes[normalizedRole]) {
    const routes = roleBasedPrivateRoutes[normalizedRole];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/create-shop",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/create-event",
    "/user/:page",
  ],
};
