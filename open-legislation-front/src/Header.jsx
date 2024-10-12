import React, { useState } from 'react'
import './App.css'
import SearchBar from './SearchBar';
import { FaBookOpen } from "react-icons/fa";

function Header() {
    return (
        <header>
            <h1>
                <a href='./'><FaBookOpen /> OpenLegislation</a>
                <SearchBar />
            </h1>
        </header>
    )
}

export default Header;