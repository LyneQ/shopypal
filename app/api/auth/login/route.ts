import authManager from '@/utils/authManager';
import {cookies} from 'next/headers'
import dotenv from "dotenv";
import type {AuthResponse} from '@/types/auth';
import AuthManager from "@/utils/authManager";


export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const cookieStore = await cookies()

        if (!email || !password) return new Response(JSON.stringify({message: 'Missing email or password'}),
            {status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const authResponse: AuthResponse = await authManager.login(email.toString(), password.toString());

        console.log(authResponse)

        switch (authResponse.message) {
            case "User not found":
                return new Response(JSON.stringify({message: 'User not found'}),
                    {status: 404,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
            case "Invalid password":
                return new Response(JSON.stringify({message: 'Invalid password'}),
                    {status: 403,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
        }

        try {
            if (authResponse.message === "User connected") {
                if (!process.env.JWT_SECRET) return Response.json({message: 'Server error - JWT_SECRET not defined'}, {status: 500});

                const token = await AuthManager.generateJwtToken(email.toString());

                cookieStore.set('authToken', token.toString(), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                });
                try {
                    return new Response(JSON.stringify({message: authResponse.receivedBody.id}),
                        {status: 200,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        });
                } catch (error) {
                    console.log(error)
                    return new Response(JSON.stringify({message: 'Server error'}),
                        {status: 500,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                }
            }
        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify({message: 'Server error'}),
                {status: 500,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        }


    } catch (error) {
        console.log(error)
        return Response.json({message: 'Server error'}, {status: 500});
    }
}
