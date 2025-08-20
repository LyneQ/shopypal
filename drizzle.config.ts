import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    dbCredentials: {
        // Use a local SQLite file for development
        url: "file:./db.sqlite",
    },
    schema: "./app/db/schema.ts",
    out: "./drizzle",
});
