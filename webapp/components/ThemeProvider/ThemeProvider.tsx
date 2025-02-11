'use client'
import React, {useEffect, useState} from "react";
import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";
import '@/styles/components/ThemeProvider.scss';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [themeMode, setThemeMode] = useState('light');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = sessionStorage.getItem('theme');
            if (storedTheme) {
                setThemeMode(storedTheme);
            }
        }
    }, []);

    const handleThemeChange = () => {
        const newTheme = themeMode === 'dark' ? 'light' : 'dark';
        setThemeMode(newTheme);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('theme', newTheme);
        }
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeMode);
    }, [themeMode]);

    return (
        <>
            <div className={'theme-provider'}>
                <button className={'theme-btn'} onClick={handleThemeChange}>
                    {themeMode === 'light' ? <SunIcon/> : <MoonIcon/>}
                </button>
            </div>
            {children}
        </>

    );
};

export default ThemeProvider;