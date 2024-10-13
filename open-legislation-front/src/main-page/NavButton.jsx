import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavButton({ destination, text }) {
    const nav = useNavigate();

    const onClick = () => {
        nav(destination);
    };

    return (
        <button
        className='bg-blue-500 text-white p-2 rounded'
        onClick={onClick}>
            {text}
        </button>
    );
}

export default NavButton;