import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const userIsAuthenticated = cookieStore.has('authToken');

        if (userIsAuthenticated) {
            cookieStore.delete('authToken');
            console.log(cookieStore.get('authToken'));
        }

        return NextResponse.redirect(new URL('/login', request.url).toString());

    } catch (error) {
        console.error(error);
        return new Response('An error occurred', {status: 500});
    }
}