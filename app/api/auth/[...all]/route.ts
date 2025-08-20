import { auth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Force Node.js runtime so native better-sqlite3 bindings can load
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handler = toNextJsHandler(auth);

export const GET = handler.GET;
export const POST = handler.POST;
