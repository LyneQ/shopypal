import type {Metadata} from "next";
import {Inter} from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import '@/styles/main.scss';
import '@/styles/pages/layout.scss';
import Link from "next/link";
import SearchBar from '@/components/SearchBar';
import {cookies} from "next/headers";
import AuthMenuBar from "@/components/AuthMenuBar";
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: process.env.NUXT_APPNAME?.toString() ?? "Default App Name",
    description: `On ${process.env.NUXT_APPNAME ?? "our platform"} sell your old plush or save an abandoned plush by buying it. Life is too short to not have a plush.`,
    keywords: ["plush", "sell", "buy", "toys"],
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="en">
        <body className={`${inter.className}`}>
        <ThemeProvider>
            <nav className={"navigation"}>
                <p className={'navigation_logo'}><Link href={'/'} className={'silent'}>{process.env.NUXT_APPNAME}</Link>
                </p>
                <SearchBar/>
                <AuthMenuBar />
            </nav>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}