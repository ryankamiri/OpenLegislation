import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

function MainPage() {
    const [query, setQuery] = useState('');
    const [currentResults, setCurrentResults] = useState([]);
    const location = useLocation();
    const [finalQuery, setFinalQuery] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const urlQuery = searchParams.get('query');
        if (urlQuery) {
            setQuery(urlQuery);
            searchQuery(urlQuery);
        }
    }, [location]);

    const searchQuery = async (term) => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    title_like: term
                }
            });
            setCurrentResults(response.data);
        } catch (error) {
            console.error(`Error searching for ${`\"${term}\"`}: ${error}`);
        }
    }

    const handleSearch = () => {
        searchQuery(query);
        setFinalQuery(query);
    }

    return (
        <div className='flex min-h-screen bg-gray-100'>
            <Sidebar />
            <div className='flex-1 p-10'>
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Enter search query"
                    className="border p-2 mr-2"
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">Search</button>

                    <h1>{currentResults.length} results for "{finalQuery}":</h1>
                    <ul>
                        {currentResults.map((res) => (
                            <li key={res.id}>{res.title}</li>
                        ))}
                    </ul>
            </div>
        </div>
    );
}

export default MainPage;