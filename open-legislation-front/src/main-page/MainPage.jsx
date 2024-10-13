import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Card from './Card';

const bills = [
    {
        "_id": "670aba400f6a8a1043825876",
        "billId": 5248,
        "title": "A bill to require hospitals participating in Medicaid or the Children's Health Insurance Program to inquire whether a patient is a citizen or national of the United States, or in a satisfactory immigration status, as part of the patient admission and registration process, and for other purposes.",
        "congressId": 118,
        "latestAction": {
            "actionDate": "2024-09-25T00:00:00.000Z",
            "text": "Read twice and referred to the Committee on Finance."
        },
        "originChamber": "Senate",
        "updateDate": "2024-09-26T00:00:00.000Z",
        "latestStage": "Read twice and referred to the Committee on Finance.",
        "sponsor": {
            "bioguideId": "L000577",
            "firstName": "Mike",
            "fullName": "Sen. Lee, Mike [R-UT]",
            "isByRequest": "N",
            "lastName": "Lee",
            "party": "R",
            "state": "UT",
            "url": "https://api.congress.gov/v3/member/L000577?format=json"
        },
        "cosponsors": [
            {
                "bioguideId": "S001227",
                "firstName": "Eric",
                "fullName": "Sen. Schmitt, Eric [R-MO]",
                "isOriginalCosponsor": true,
                "lastName": "Schmitt",
                "middleName": "S.",
                "party": "R",
                "sponsorshipDate": "2024-09-25",
                "state": "MO",
                "url": "https://api.congress.gov/v3/member/S001227?format=json"
            },
            {
                "bioguideId": "B001310",
                "firstName": "Mike",
                "fullName": "Sen. Braun, Mike [R-IN]",
                "isOriginalCosponsor": true,
                "lastName": "Braun",
                "party": "R",
                "sponsorshipDate": "2024-09-25",
                "state": "IN",
                "url": "https://api.congress.gov/v3/member/B001310?format=json"
            }
        ],
        "billUrl": "https://api.congress.gov/v3/bill/118/s/5248?format=json",
        "textUrl": "No URL available",
        "createdAt": "2024-10-12T18:04:48.925Z",
        "updatedAt": "2024-10-12T18:04:48.925Z",
        "__v": 0
    },
    {
        "_id": "670aba540f6a8a10438258b2",
        "billId": 5222,
        "title": "A bill to require the Secretary of Health and Human Services to implement a pandemic preparedness and response program using artificial intelligence.",
        "congressId": 118,
        "latestAction": {
            "actionDate": "2024-09-25T00:00:00.000Z",
            "text": "Read twice and referred to the Committee on Health, Education, Labor, and Pensions."
        },
        "originChamber": "Senate",
        "updateDate": "2024-09-26T00:00:00.000Z",
        "latestStage": "Read twice and referred to the Committee on Health, Education, Labor, and Pensions.",
        "sponsor": {
            "bioguideId": "R000605",
            "firstName": "Mike",
            "fullName": "Sen. Rounds, Mike [R-SD]",
            "isByRequest": "N",
            "lastName": "Rounds",
            "party": "R",
            "state": "SD",
            "url": "https://api.congress.gov/v3/member/R000605?format=json"
        },
        "cosponsors": [
            {
                "bioguideId": "H001046",
                "firstName": "Martin",
                "fullName": "Sen. Heinrich, Martin [D-NM]",
                "isOriginalCosponsor": true,
                "lastName": "Heinrich",
                "middleName": "T.",
                "party": "D",
                "sponsorshipDate": "2024-09-25",
                "state": "NM",
                "url": "https://api.congress.gov/v3/member/H001046?format=json"
            }
        ],
        "billUrl": "https://api.congress.gov/v3/bill/118/s/5222?format=json",
        "textUrl": "No URL available",
        "createdAt": "2024-10-12T18:05:08.369Z",
        "updatedAt": "2024-10-12T18:05:08.369Z",
        "__v": 0
    },
    {
        "_id": "670aba260f6a8a1043825832",
        "billId": 5269,
        "title": "A bill to amend title 38, United States Code, to establish a commission to review operations at the Veterans Health Administration and submit to Congress reports with respect to that review, and for other purposes.",
        "congressId": 118,
        "latestAction": {
            "actionDate": "2024-09-25T00:00:00.000Z",
            "text": "Read twice and referred to the Committee on Veterans' Affairs."
        },
        "originChamber": "Senate",
        "updateDate": "2024-09-26T00:00:00.000Z",
        "latestStage": "Read twice and referred to the Committee on Veterans' Affairs.",
        "sponsor": {
            "bioguideId": "C001075",
            "firstName": "Bill",
            "fullName": "Sen. Cassidy, Bill [R-LA]",
            "isByRequest": "N",
            "lastName": "Cassidy",
            "party": "R",
            "state": "LA",
            "url": "https://api.congress.gov/v3/member/C001075?format=json"
        },
        "cosponsors": [
            {
                "bioguideId": "H001042",
                "firstName": "Mazie",
                "fullName": "Sen. Hirono, Mazie K. [D-HI]",
                "isOriginalCosponsor": true,
                "lastName": "Hirono",
                "middleName": "K.",
                "party": "D",
                "sponsorshipDate": "2024-09-25",
                "state": "HI",
                "url": "https://api.congress.gov/v3/member/H001042?format=json"
            }
        ],
        "billUrl": "https://api.congress.gov/v3/bill/118/s/5269?format=json",
        "textUrl": "No URL available",
        "createdAt": "2024-10-12T18:04:22.477Z",
        "updatedAt": "2024-10-12T18:04:22.477Z",
        "__v": 0
    }
];

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
        <div className='flex min-h-screen bg-gray-100 grid-flow-row'>
            <Sidebar />
            <div className='grid-flow-col'>
                <div className='flex-1 p-10 space-y-4'>
                    <h1 className='text-xl font-bold italic'>What kind of bill are you looking for?</h1>
                    <input
                        type="text" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder="Enter search query"
                        className="border p-2 mr-2 rounded w-96"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">Search</button>

                        <h1 className='italic'>{currentResults.length} results</h1>
                        <ul>
                            {/* TODO: make this return the actual cards when it fetches from the backend */}
                            {currentResults.map((res) => (
                                <li key={res.id}>{res.title}</li>
                            ))}
                        </ul>
                </div>
                <div>
                    {bills.map((bill) => (
                        <Card key={bill._id} bill={bill} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainPage;