import { auth } from "@/app/lib/auth";
import type { NextRequest } from "next/server";

// Ensure Node.js runtime because this endpoint touches the DB-backed auth
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // Invalidate the current session using Better Auth's server API
  try {
    await auth.api.signOut({ headers: req.headers });
  } catch (e) {
    // Even if signOut throws (e.g., no active session), we still redirect to home
    // to provide a consistent UX after clicking "Sign out".
  }
  // Redirect to the homepage after sign-out
  const url = new URL("/", req.url);
  return Response.redirect(url, 303);
}
