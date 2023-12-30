import { NextRequest, NextResponse } from "next/server";
import db from "./db";

export async function middleware(req: NextRequest) {
  const isLoggedIn = await db.isAuthenticated(req.cookies as any);

  if (req.nextUrl.pathname && req.nextUrl.pathname.startsWith("/login")) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return;
  }

  if (req.nextUrl.pathname && req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard"],
};
