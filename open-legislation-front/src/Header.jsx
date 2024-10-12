import React, { useState } from 'react'
import './App.css'
import SearchBar from './SearchBar';

function Header() {
    return (
        <header>
            <h1>
                <a href='./'>OpenLegislation</a>
                <SearchBar />
            </h1>
        </header>
    )
}

export default Header;