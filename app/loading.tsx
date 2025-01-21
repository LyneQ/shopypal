import React from "react";

export default function loading (
    { children }: { children: React.ReactNode }
    ) {
    return (
        <div>
        <h1>Loading...</h1>
        {children}
        </div>
    )
}