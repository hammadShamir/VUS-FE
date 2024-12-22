import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const isAuthenticated = request.cookies.get("token");
    if (!isAuthenticated) {
        const redirectUrl = new URL("/login", request.nextUrl.origin);
        redirectUrl.searchParams.set("message", "Login Required");
        redirectUrl.searchParams.set("redirect", request.nextUrl.pathname); 
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/my-booking", "/profile"],
};
