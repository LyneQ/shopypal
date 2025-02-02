import AuthManager from "@/utils/authManager";

export const GET = async (req: Request) => {

    const token = req.headers.get('authToken');

    if (!token) {
        return new Response(JSON.stringify({message: "Missing token"}), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    const userID = AuthManager.getUserIDFromToken(token);

    if (!userID) {
       return new Response(JSON.stringify({message: "User not found"}), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    const userProfile = await AuthManager.getUserProfile(userID);
    return new Response(JSON.stringify({message: "success", user: userProfile}), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const POST = async (req: Request) => {

    const body = await req.json();
    const {token} = body

    const userID = AuthManager.getUserIDFromToken(token);

    const userProfile = await AuthManager.getUserProfile(userID);

    return new Response(JSON.stringify({user: userProfile}), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const PUT = async (req: Request) => {
    return new Response(JSON.stringify({message: "PUT /user/details"}), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
