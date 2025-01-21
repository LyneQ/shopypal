import authManager from "@/utils/authManager";
import type {AuthResponse} from "@/types/auth";
import {cookies} from "next/headers";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import AuthManager from "@/utils/authManager";

dotenv.config();

export async function POST(request: Request) {
    try {
        const {email, password, firstname, lastname} = await request.json();

        if (!email || !password || !firstname || !lastname) return Response.json({message: 'Missing parameters'}, {status: 400});
        const authResponse: AuthResponse = await authManager.register(email.toString(), password.toString(), firstname.toString(), lastname.toString());


        if (authResponse.message === 'User created') {
            const token = await AuthManager.generateJwtToken(email.toString());


            const cookieStore = await cookies();
            cookieStore.set('authToken', token.toString(), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

        }
        return Response.json({
            ...authResponse,
            headers: {
                'Content-Type': 'application/json'
            }
        }, {status: authResponse.receivedBody ? 200 : 404});
    } catch (error) {
        console.error(error);
        return Response.json({
            message: 'Server error', headers: {
                'Content-Type': 'application/json'
            }
        }, {status: 500});
    }
}
