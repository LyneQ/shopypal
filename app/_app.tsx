import '../styles/main.scss';
import React from "react";     // Fichier principal

function MyApp({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
    return <Component {...pageProps} />;
}

export default MyApp;