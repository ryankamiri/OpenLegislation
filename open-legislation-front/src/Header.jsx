import React, { useState } from 'react'
import './App.css'
import SearchBar from './SearchBar';

function Header() {
    return (
        <header class="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <div class="md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
                <a href='./' className="text-black hover:text-gray-600 transition-colors duration-200">OpenLegislation</a>
                <div className='m-2 p-6'>
                    <SearchBar />
                </div>
            </div>
        </header>
    )
}

export default Header;
