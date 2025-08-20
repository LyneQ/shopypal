import { auth } from "@/app/lib/auth";
import type { NextRequest } from "next/server";

// Ensure Node.js runtime because this endpoint queries the SQLite DB
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  return Response.json({
    authenticated: !!session,
    user: session?.user ?? null,
    session,
  });
}