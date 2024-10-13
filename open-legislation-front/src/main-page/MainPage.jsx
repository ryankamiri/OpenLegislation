import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Card from "./Card";

function MainPage({setId}) {
  const [query, setQuery] = useState("");
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [party, setParty] = useState("");
  const [stage, setStage] = useState("");

  const [currentResults, setCurrentResults] = useState([]);
  const parseDate = async (date) => {
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2)
    );
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "https://legapi.asahoo.dev/api/legislation/search",
        {
          params: {
            q: query,
            party: party.value,
            date_after: minDate ? await parseDate(minDate) : null,
            date_before: maxDate ? await parseDate(maxDate) : null,
            stage: stage.value,
          },
        },
      );
      setCurrentResults(response.data);
    } catch (error) {
      console.error(`Error searching for ${`\"${query}\"`}: ${error}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        minDate={minDate}
        setMinDate={setMinDate}
        maxDate={maxDate}
        setMaxDate={setMaxDate}
        party={party}
        setParty={setParty}
        stage={stage}
        setStage={setStage}
      />
      <form
        className="flex-1 p-10 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <h1 className="text-xl font-bold italic">
          What kind of bill are you looking for?
        </h1>
        <div className="flex flex-row pr-8">
        <input
            className="border p-2 mr-2 rounded-lg w-3/4"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Search
        </button>
        </div>

        <h1 className="italic">{currentResults.length} results</h1>

        {currentResults.map((bill) => (
          <Card bill={bill} key={bill.billId} idSet={setId} />
        ))}
      </form>
    </div>
  );
}

export default MainPage;
