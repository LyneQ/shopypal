import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import pool from "@/db";
import {NextResponse} from "next/server";
import AuthManager from "@/utils/authManager";

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('authToken');
        const userIsAuthenticated = cookieStore.has('authToken');
        if (!token) return Response.redirect(`${process.env.NUXT_URL}/auth`);
        const decodedToken = userIsAuthenticated ? await AuthManager.verifyJwtToken(token.value.toString()) : false;

        if (!decodedToken) {
            try {
                cookieStore.delete('authToken');
            } finally {
                Response.json({isAuthenticated: false}, {status: 200});
            }
        }

        if (typeof decodedToken === 'object') {
            for (const key in decodedToken) {
                if (!decodedToken.hasOwnProperty(key)) break;

                const value = decodedToken[key];
                const user = await pool.query('SELECT * FROM user_profile WHERE id = ?', [value]);
                if (!user) {
                    try {
                        cookieStore.delete('authToken');
                    } finally {
                        Response.json({isAuthenticated: false}, {status: 200});
                    }
                }
                return Response.json({isAuthenticated: true}, {status: 200});
            }
        }
    } catch (error) {
        console.error(error);
        return Response.json({isAuthenticated: 'An error occurred'}, {status: 200});
    }

    // return Response.redirect(`${process.env.NUXT_URL}/auth`);
    return Response.json({isAuthenticated: false}, {status: 200});
}