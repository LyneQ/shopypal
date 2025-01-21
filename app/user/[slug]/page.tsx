import {cookies} from 'next/headers';

export default async function userDetails({params}: {
    params: Promise<{ slug: string }>
}) {
    const cookieStore = await cookies()
    let userProfil: any;


    try {
        const response = await fetch(`${process.env.API_BASE_URL}/user/details`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: cookieStore.get('authToken')})
        });

        if (response.ok) {
            userProfil = await response.json();
            userProfil = userProfil.user;
        } else {
            console.error('Failed to fetch user details');
        }

    } catch (error) {
        console.error('Error fetching user details:', error);
    }


    return (
        <div>
            <h1>User Details</h1>
            <p>User ID: {userProfil?.id}</p>
            <p>Name: {userProfil?.firstname} {userProfil.lastname}</p>
            <p>Email: {userProfil?.email}</p>
        </div>
    )
}