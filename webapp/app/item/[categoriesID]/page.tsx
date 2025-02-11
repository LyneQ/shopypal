/**
 * exemple de lien:
 * http://localhost:3000/item/1?sort=asc&limit=10&price=100&rating=5&radius=10&color=red
 */
 'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from "react";

export default function CategoryPage({ params }: { params: Promise<{ categoriesID: string }> }) {
    const searchParams = useSearchParams();
    const [categoriesID, setCategoriesID] = useState<string | null>(null);


    useEffect(() => {
        params.then(resolvedParams => {
            setCategoriesID(resolvedParams.categoriesID);
        });
    }, [params]);



    // Create an object to store all query parameters
    const queryParams: Record<string, string> = {};

    // Iterate over all query parameters and add them to the object
    searchParams?.forEach((value, key) => {
        queryParams[key] = value;
    });

    // Display all parameters
    return (
        <div>
            <h1>Catégorie ID: {categoriesID}</h1>
            <ul>
                {Object.entries(queryParams).map(([key, value], index) => (
                    <li key={index}>
                        {key}: {value}
                    </li>
                ))}
            </ul>
        </div>
    );
}