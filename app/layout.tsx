import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopypal – Plushies Store",
  description: "An adorable e-commerce for plushies.",
};

// Ensure Node.js runtime for server components that access the DB via better-sqlite3
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers();
  const session = await auth.api.getSession({ headers: hdrs });
  return (
    <html lang="en" suppressHydrationWarning={ true }>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b">
          <nav className="max-w-5xl mx-auto flex items-center justify-between p-4">
            <a href="/" className="font-semibold text-lg">🧸 Shopypal</a>
            <div className="flex items-center gap-4 text-sm">
              <a href="/" className="hover:underline">Home</a>
              {session ? (
                <>
                  <a href="/me" className="hover:underline">My account</a>
                  <form action="/api/auth/sign-out" method="post">
                    <button className="hover:underline hover:cursor-pointer" type="submit">Sign out</button>
                  </form>
                </>
              ) : (
                <>
                  <a href="/auth/signin" className="hover:underline">Sign in</a>
                  <a href="/auth/signup" className="hover:underline">Sign up</a>
                </>
              )}
            </div>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto p-4">
          {children}
        </main>
        <footer className="border-t text-center text-xs text-gray-500 py-4">© {new Date().getFullYear()} Shopypal</footer>
      </body>
    </html>
  );
}
