'use client';
import React from "react";
import { redirect } from 'next/navigation'

export default function search() {

    const searchOptionsList = ['article', 'member', 'help'];
    const [ searchOption, setSearchOption ] = React.useState<string>(searchOptionsList[0]);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {

        const fieldValue = e.currentTarget.value.trim();
        // validate if the user pressed enter
        if (e.key === 'Enter')  {
            // redirect to the search page
            console.log(`searching for ${fieldValue} with option ${searchOption}`);
            switch (searchOption) {
                case 'article':
                    return redirect(`/item/${searchOption}?search=${fieldValue}`);
                case 'member':
                    return redirect(`/user/${fieldValue}`);
                case 'help':
                    return redirect(`/help?topic=${fieldValue}`);
                default:
                    return console.error('Invalid search option');
            }
        }

        // make suggestions based on the input value
        console.log(fieldValue);
    }

    return (
        <div className={'navigation_search'}>
            <select onChange={(e) => {setSearchOption(e.target.value) }}
                    value={searchOption}>
                {searchOptionsList.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            <input type={'search'} placeholder={'Search'} onKeyUp={handleSearch}/>
        </div>
    )
}