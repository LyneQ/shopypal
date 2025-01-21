import AuthManager from "@/utils/authManager";

export const GET = async (req: Request) => {
    return new Response(JSON.stringify({ message: "GET /user/details" }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const POST = async (req: Request) => {

    const body = await req.json();
    const { token } = body

    const userID = AuthManager.getUserIDFromToken(token);

    const userProfil = await AuthManager.getUserProfile(userID);

    return new Response(JSON.stringify({user: userProfil}), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const PUT = async (req: Request) => {
    return new Response(JSON.stringify({ message: "PUT /user/details" }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
