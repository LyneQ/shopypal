'use client';
import Link from "next/link";
import '@/styles/pages/auth.scss';
import {useEffect, useState} from "react";

export default function AuthPage() {

    const [status, setStatus] = useState('');


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const passwordConfirm = e.target['password-confirm'].value;
        const firstname = e.target.firstname.value;
        const lastname = e.target.lastname.value;

        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
            console.log(regex.test(password));

        if (!firstname || !lastname || !email) return setStatus('All fields are required');
        if (!password) return setStatus('Password is required');
        if (password.length < 8 || password.length > 50) return setStatus('Password must be 8-50 characters long');
        if (password !== passwordConfirm) return setStatus('Passwords do not match');
        if (!regex.test(password)) return setStatus('Password must contain at least one uppercase letter, one number and one special character');



        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password, firstname, lastname})
            });

            const data = await response.json();
            switch (response.status) {
                case 200:
                    console.log(data);
                    window.location.href = `/user/${data.receivedBody.id}`;
                    break;
                case 400:
                    setStatus('username already exists');
                    break;
                case 404:
                    setStatus('Email already registered');
                    break;
                case 403:
                    setStatus('Invalid password');
                    break;
            }
        } catch (error) {
            console.log(error);
            console.error('Server error');
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setStatus('');
        }, 2500);
    }, [status]);


    return (
        <div  className={"auth-form"}>
            <form onSubmit={handleSubmit} className={'form'} autoComplete={"on"}>
                <h1>Register</h1>
                <h6>Already have an account ? <br/><Link href={'/auth'}>Login</Link></h6>
                <div className={'form_field'}>
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" name="firstname" id="firstname"/>
                </div>
                <div className={'form_field'}>
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" name="lastname" id="lastname"/>
                </div>
                <div className={'form_field'}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"/>
                </div>
                <div className={'form_field'}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" autoComplete="current-password"/>
                </div>
                <div className={'form_field'}>
                    <label htmlFor="password-confirm">Repeat Password</label>
                    <input type="password" name="password-confirm" id="password-confirm"/>
                </div>
                <div className={'form_status'}>
                    <span>{status}</span>
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    )
}