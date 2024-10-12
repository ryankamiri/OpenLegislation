import React, { useState } from "react";

let q = ''

function SearchBar() {
    const [query, setQuery] = useState('');

    const handleQueryChange = (e) => {
        setQuery(e.target.value)
    }

    return (
        <div>
            <input 
                id='search-query'
                type="text" 
                placeholder="Search..." 
                value={query}
                onChange={handleQueryChange}
            />
            <button
                id='search-button'
                onClick={() => q = query}
            >Search</button>
        </div>
    )
}

export default SearchBar;