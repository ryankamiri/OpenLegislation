import React, { useState } from 'react'
import Dropdown from './Dropdown';
import NavButton from './NavButton';

function Sidebar() {
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [party, setParty] = useState('');
    const [status, setStatus] = useState('');

    const handleDropdownChange = (setter) => (event) => {
        const value = event.value || (event.target && event.target.value);
        setter(value);
    };

    const parties = [
        { value: 'democratic', label: 'Democratic' },
        { value: 'republican', label: 'Republican' },
        { value: 'independent', label: 'Independent' }
    ];

    const statuses = [
        {value: 'introduced', label: 'Introduced'},
        {value: 'committee consideration', label: 'Committee Consideration'},
        {value: 'floor consideration', label: 'Floor Consideration'},
        {value: 'failed one chamber', label: 'Failed One Chamber'},
        {value: 'passed one chamber', label: 'Passed One Chamber'},
        {value: 'passed both chambers', label: 'Passed Both Chambers'},
        {value: 'resolving differences', label: 'Resolving Differences'},
        {value: 'to president', label: 'To President'},
        {value: 'veto actions', label: 'Veto actions'},
    ]

    return (
        <div className='flex flex-col bg-gray-700 p-4 space-y-2 text-center'>
            <h2 className="text-white">Date</h2>
            <div className='space-y-2'>
                <h3 className="text-white">Start</h3>
                <input
                    className='rounded p-2 text-center'
                    type="text"
                    onChange={(e) => setMinDate(e.target.value)} 
                    placeholder="Enter start date"
                />
            </div>
            <div className='space-y-2'>
                <h3 className="text-white">End</h3>
                <input
                    className='rounded p-2 text-center'
                    type="text"
                    onChange={(e) => setMaxDate(e.target.value)} 
                    placeholder="Enter end date"
                />
            </div>

            <h2 className="text-white">Party</h2>
            <Dropdown items={parties} onChange={handleDropdownChange(setParty)} />

            <h2 className="text-white">Status</h2>
            <Dropdown items={statuses} onChange={handleDropdownChange(setStatus)} />

            <NavButton destination='/results' text='Apply'></NavButton>
        </div>
    )
}

export default Sidebar;