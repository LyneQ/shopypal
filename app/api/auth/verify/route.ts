import {cookies} from "next/headers";
import pool from "@/db";
import AuthManager from "@/utils/authManager";

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('authToken');
        const userIsAuthenticated = cookieStore.has('authToken');
        if (!token) return Response.redirect(`${process.env.NUXT_URL}/auth`);

        AuthManager.verifyJwtToken(token.value.toString())
        .catch((err) => {
            if (err.name === 'TokenExpiredError') {
                cookieStore.delete('authToken');
                return Response.redirect(`${process.env.NUXT_URL}/auth`);
            } else {
                console.log(err);
            }
        })

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
                const user = await pool.query('SELECT * FROM user_profiles WHERE id = ?', [value]);
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
    } catch (error: any) {
        console.error(error);
        // console.log(error.message)
        return Response.json({isAuthenticated: 'An error occurred'}, {status: 200});
    }

    // return Response.redirect(`${process.env.NUXT_URL}/auth`);
    return Response.json({isAuthenticated: false}, {status: 200});
}