import React from 'react'

function MainPage() {
    const [results, setResults] = useState([]);

    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', async () => {
        await searchQuery();
    });

    const handleSearch = async (query) => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setResults(response);
    }

    // let currentResults = [];

    // async function searchQuery() {
    //     const input = document.getElementById('search-query');
    //     const query = input.value;

    //     try {
    //         const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    //             // params: {query: query}
    //         });
    //         displayResults(response.data);
    //     } catch (error) {
    //         console.error(`Error searching for ${`\"${query}\"`}: ${error}`);
    //     }
    // }

    // const displayResults = (results) => {
    //     const resList = document.createElement('ul');
    //     results.forEach(result => {
    //         const resItem = document.createElement('li');
    //         resItem.textContent = result;
    //         resList.appendChild(resItem);
    //         currentResults.push(result);
    //     });
    // }

    return (
        <div>
            <h1>Search Page</h1>
            <SearchBar onSearch={handleSearch} />
            <div>
                <h2>Search Results</h2>
                {searchResults.map((result, index) => (
                    <div key={index}>
                        <p>{result}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;