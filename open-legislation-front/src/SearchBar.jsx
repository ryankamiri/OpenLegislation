import React, { useState } from "react";
import { Button } from "flowbite-react";

let q = ''

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleQueryChange = (e) => {
        setQuery(e.target.value)
        onSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    id='search-query'
                    type="text" 
                    placeholder="Search..." 
                    value={query}
                    onChange={handleQueryChange}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar;