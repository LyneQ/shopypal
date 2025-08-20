import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/app/db/client";
import { schema } from "@/app/db/schema";

// Configure Better Auth with environment-based settings
const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";
const secret = process.env.BETTER_AUTH_SECRET;

export const auth = betterAuth({
    baseURL,
    // Secret is recommended for production; Better Auth can auto-generate for dev
    secret,
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema,
        camelCase: true,
    }),
    // Allow email/password authentication
    emailAndPassword: {
        enabled: true,
    },
    // Restrict CORS/trusted origins for API routes
    trustedOrigins: [
        baseURL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
});