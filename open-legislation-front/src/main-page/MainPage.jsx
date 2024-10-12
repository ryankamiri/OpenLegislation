import React from 'react'

function MainPage({ query }) {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', async () => {
        await searchQuery();
    });

    let currentResults = [];

    async function searchQuery() {
        const input = document.getElementById('search-query');
        const query = input.value;

        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {query: query}
            });
            displayResults(response.data);
        } catch (error) {
            console.error(`Error searching for ${`\"${query}\"`}: ${error}`);
        }
    }

    const displayResults = (results) => {
        const resList = document.createElement('ul');
        results.forEach(result => {
            const resItem = document.createElement('li');
            resItem.textContent = result;
            resList.appendChild(resItem);
            currentResults.push(result);
        });
    }

    return (
        <div>
            <h1>Results for {`\"${query}\"`}:</h1>
            <p>{currentResults}</p> {/* Temporary, need to format */}
        </div>
    );
}

export default MainPage;