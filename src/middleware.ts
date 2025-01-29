import { NextResponse, type NextRequest } from "next/server";
import { UserRoles } from "./interfaces";

export function middleware(request: NextRequest) {
  // Extract token and user cookies
  const token = request.cookies.get("token");
  const user = request.cookies.get("user")?.value;
  let role;

  // Check if user cookie exists and parse it safely
  if (user) {
    try {
      const storedUser = JSON.parse(user);
      role = storedUser.role;
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      role = undefined; // If parsing fails, treat as no role
    }
  }

  // Redirect if not authenticated
  if (!token) {
    const redirectPath = request.nextUrl.pathname.trim(); // Get the path
    const redirectUrl = new URL("/login", request.nextUrl.origin);
    redirectUrl.searchParams.set("message", "Login Required");
    redirectUrl.searchParams.set("redirect", redirectPath.replace(/%2F/g, "/"));
    return NextResponse.redirect(redirectUrl);
  }

  // Role-based access control
  const adminPages = [
    "/admin/bookings",
    "/admin/admins",
    "/admin/reviews",
    "/admin/feeds",
  ];
  const userPages = ["/my-booking", "/profile"];

  if (adminPages.some((page) => request.nextUrl.pathname.startsWith(page))) {
    // if sub-admin trying to access admin management page
    if (
      request.nextUrl.pathname === "/admin/admins" &&
      role !== UserRoles.ADMIN
    ) {
      const redirectUrl = new URL("/", request.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
    if (role !== UserRoles.ADMIN && role !== UserRoles.SUB_ADMIN) {
      // Non-admin trying to access admin pages
      const redirectUrl = new URL("/", request.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (userPages.some((page) => request.nextUrl.pathname.startsWith(page))) {
    if (role !== UserRoles.USER) {
      // Admin trying to access user-specific pages
      const redirectUrl = new URL("/admin/bookings", request.nextUrl.origin);
      redirectUrl.searchParams.set("message", "User Access Required");
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Allow access if no restrictions apply
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", // All admin pages
    "/my-booking",
    "/profile",
  ],
};
