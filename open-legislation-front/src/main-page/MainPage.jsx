import React from 'react'

function MainPage({ query }) {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', searchQuery);

    let currentResults = null;

    async function searchQuery() {
        const input = document.getElementById('search-query');
        const query = input.value;

        try {
            const response = await axios.get(
                '/api/search', {params: {query: query}}
            )
            currentResults = response.data;
        } catch (error) {
            console.error(`Error searching for ${`\"${query}\"`}: ${error}`);
        }
    }

    return (
        <div>
            <h1>Results for {`\"${query}\"`}:</h1>
            <p>{currentResults}</p> {/* Temporary, need to format */}
        </div>
    )
}

export default MainPage;