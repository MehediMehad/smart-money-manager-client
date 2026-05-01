import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/Auth";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = [
  "/login",
  "/register",
  "/verify-otp",
  "/forgot-password",
  "/reset-password",
];

const roleBasedPrivateRoutes = {
  user: [/^\/dashboard/],
};

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  const normalizedRole = userInfo?.role?.toLowerCase() as Role | undefined;

  // Not logged in
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url)
    );
  }

  // Logged in user should not go to auth pages
  if (authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Role based private route access
  if (normalizedRole && roleBasedPrivateRoutes[normalizedRole]) {
    const allowedRoutes = roleBasedPrivateRoutes[normalizedRole];

    if (allowedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/verify-otp",
    "/forgot-password",
    "/reset-password",
    "/dashboard",
    "/dashboard/:path*",
  ],
};