import { NextResponse, type NextRequest } from "next/server";
import { UserRoles } from "./interfaces";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const user = request.cookies.get("user")?.value;
  let role: string | undefined;

  const adminPages = [
    "/admin/bookings",
    "/admin/admins", // Restricted for sub-admin
    "/admin/reviews",
    "/admin/feeds",
    "/admin/rooms",
    "/admin",
  ];
  const userPages = ["/mybooking", "/profile"];

  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      role = parsedUser.role;
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }

  const pathname = request.nextUrl.pathname;

  // **Disable caching to prevent stale UI**
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  // **1. If no token or no valid role, redirect to login**
  if (!token || !role) {
    if (process.env.NODE_ENV === "production") {
      console.log("Missing token or role in production!");
    }
    return NextResponse.redirect(new URL(`/login?messagee=Login required`, request.url));
  }

  // **2. Prevent users from accessing admin pages**
  if (role === UserRoles.USER && adminPages.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // **3. Prevent admin/sub-admin from accessing user pages**
  if (
    (role === UserRoles.ADMIN || role === UserRoles.SUB_ADMIN) &&
    userPages.some((page) => pathname.startsWith(page))
  ) {
    return NextResponse.redirect(new URL("/admin/bookings", request.url));
  }

  // **4. Prevent sub-admin from accessing "/admin/admins"**
  if (role === UserRoles.SUB_ADMIN && pathname.startsWith("/admin/admins")) {
    return NextResponse.redirect(new URL("/admin/bookings", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/mybooking", "/profile"],
};
