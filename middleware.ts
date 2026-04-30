import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuth = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isSellerRoute = req.nextUrl.pathname.startsWith("/seller");

  const role = (req.auth?.user as { role?: string })?.role;

  // Prevent logged-in users from seeing login page
  if (isAuthPage && isAuth) {
    if (role === "ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
    if (role === "SELLER") return NextResponse.redirect(new URL("/seller", req.url));
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Protect all private routes
  if (!isAuth && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin protection
  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Seller protection
  if (isSellerRoute && role !== "SELLER") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api/auth|api/register|shop|categories|deals|about|contact|product|_next/static|_next/image|favicon.ico|public).*)"
  ],
};