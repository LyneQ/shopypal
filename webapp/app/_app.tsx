import '../styles/main.scss';
import React from "react";
import {CookiesProvider} from "next-client-cookies";     // Fichier principal

function MyApp({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
    return <Component {...pageProps} />;
}

export default MyApp;