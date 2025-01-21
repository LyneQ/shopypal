'use client';
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import "@/styles/components/AuthMenuBar.scss"
import {redirect} from "next/navigation";

export default function AuthMenuBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [toggleHiddenItem, setToggleHiddenItem] = useState(false)
    const hiddenItem = useRef<HTMLDivElement>(null);

    const updateIsAuthenticated = async () => {
        const response = await fetch('/api/auth/verify');
        const {isAuthenticated} = await response.json();
        setIsAuthenticated(isAuthenticated);
    }

    const handleLogout = async () => {
        await fetch('/api/auth/logout', {method: 'POST'});
        updateIsAuthenticated().then(r => r);
        redirect(new URL('/auth', window.location.origin).toString());
    };

    useEffect(() => {
        updateIsAuthenticated().then(r => r);
    }, []);


    const toggleHiddenItems = () => {
        setToggleHiddenItem(!toggleHiddenItem)
    }

    useEffect(() => {
        hiddenItem.current?.classList.toggle('hidden-item-active', toggleHiddenItem)
    }, [toggleHiddenItem]);

    return (
        <>
            {
                isAuthenticated
                    ? (
                        <div className={"login-box"} onClick={toggleHiddenItems}>
                            <img src={"https://fakeimg.pl/24"} alt={"user picture"}/>
                            {

                                toggleHiddenItem
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"
                                            transform="rotate(180 12 12)"></path>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                    </svg>
                            }
                            <div className={"hidden-item"} ref={hiddenItem}>
                                <Link href={'/user/me'}>Profile</Link>
                                <Link href={'/settings'}>Settings</Link>
                                <Link href={'/settings/balance'}>Balances</Link>
                                <Link href={'/settings/order'}>Orders</Link>
                                <Link href={'/settings/messages'}>Messages</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    )
                    : <Link href={'/auth'} className={'auth link-btn'}> register / login </Link>
            }
        </>
    );
}