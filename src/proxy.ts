import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  if (request.nextUrl.pathname === "/" && accept.includes("text/markdown")) {
    const response = NextResponse.rewrite(new URL("/llms.txt", request.url));
    response.headers.set("Vary", "Accept");
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
