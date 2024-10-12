import React, { useState } from 'react'
import './App.css'
import SearchBar from './SearchBar';

function Header() {
    return (
        <header className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <a href='./' className="text-black hover:text-gray-600 transition-colors duration-200">OpenLegislation</a>
        </header>
    )
}

export default Header;
