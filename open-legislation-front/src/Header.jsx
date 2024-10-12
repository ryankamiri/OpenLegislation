import React, { useState } from 'react'
import './App.css'
import SearchBar from './SearchBar';

function Header() {
    return (
        <header className="flex font-bold text-lg text-center bg-blue-500 flex-auto p-4">
            <a href='./' className="text-black hover:text-gray-600 transition-colors duration-200">OpenLegislation</a>
        </header>
    )
}

export default Header;
