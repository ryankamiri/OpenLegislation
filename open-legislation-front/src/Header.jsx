// import React, { useState } from 'react'
import './App.css'
import SearchBar from './SearchBar';

function Header() {
    return (
        <div
    className={`w-full text-center flex justify-between px-4 h-24 md:h-16 items-center`}>
        <div className="flex justify-between w-full items-center">
            <div className="items-center"></div>
                <a href='./' className="hover:text-gray-300">OpenLegislation</a>
                <div className='m-2 p-6'>
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}

export default Header;
