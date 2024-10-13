import React, { useState } from "react";
// import { Button } from "flowbite-react";

// let q = ''
import { useNavigate } from "react-router-dom";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/results");
    onSearch(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="search-query"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
