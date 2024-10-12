import React, { useState } from "react";

let q = ''

function SearchBar() {
    const [query, setQuery] = useState('');

    const handleQueryChange = (e) => {
        setQuery(e.target.value)
    }

    return (
        <div>
            <div>
            <input 
                id='search-query'
                type="text" 
                placeholder="Search..." 
                value={query}
                onChange={handleQueryChange}
            />
            <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                id='search-button'
                onClick={() => q = query}
            >Search</button>
            </div>
        </div>
    )
}

export default SearchBar;