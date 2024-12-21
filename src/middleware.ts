import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const isAuthenticated = request.cookies.get("token");
    if (!isAuthenticated) {
        return NextResponse.redirect(
            new URL("/login?message=Login Required", request.nextUrl.origin)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/my-booking", "/profile"],
};
