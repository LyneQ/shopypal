'use client';
import Link from "next/link";
import '@/styles/pages/auth.scss';
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";

export default function AuthPage() {

    const [status, setStatus] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            const data = await response.json();
           switch (response.status) {
                case 200:
                    window.location.href = `/user/${data.message}`;
                    break;
                case 404:
                    setStatus('User not found');
                    break;
                case 403:
                    setStatus('Invalid password');
                    break;
           }
        } catch (error) {
            console.error('Server error');
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setStatus('');
        }, 2500);
    }, [status]);

    return (
        <div className={"auth-form"}>
            <form className={'form'} onSubmit={handleSubmit} autoComplete={'on'} itemRef="http://schema.org/LoginAction">
                <h1>Login</h1>
                <h6>Don't have an account ? <br/><Link href={'/auth/register'}>Register</Link></h6>
                <div className={'form_field'}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" autoComplete={"email webauthn"} required/>
                </div>
                <div className={'form_field'}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" autoComplete={"current-password"} required/>
                </div>
                <div className={'form_status'}>
                    <span>{status}</span>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}